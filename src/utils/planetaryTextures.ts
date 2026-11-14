import * as THREE from 'three';

export interface PlanetaryTextureSet {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

// Deterministic PRNG so planetary geography looks crisp and reproducible
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lonLatToPixel(lon: number, lat: number, w: number, h: number): [number, number] {
  const normLon = ((lon + 180) % 360 + 360) % 360 - 180;
  const x = ((normLon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return [x, y];
}

function drawWrappedFeature(
  ctx: CanvasRenderingContext2D,
  w: number,
  x: number,
  y: number,
  drawFn: (cx: number, cy: number) => void
) {
  drawFn(x, y);
  if (x < w * 0.2) drawFn(x + w, y);
  if (x > w * 0.8) drawFn(x - w, y);
}

function paintSoftBasin(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  lon: number,
  lat: number,
  rxDeg: number,
  ryDeg: number,
  colorStops: Array<[number, string]>,
  rotationRad = 0
) {
  const [x, y] = lonLatToPixel(lon, lat, w, h);
  const cosLat = Math.max(0.28, Math.cos((lat * Math.PI) / 180));
  const rx = (rxDeg / 360) * w / cosLat;
  const ry = (ryDeg / 180) * h;

  drawWrappedFeature(ctx, w, x, y, (cx, cy) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationRad);
    ctx.scale(1, ry / rx);
    const grad = ctx.createRadialGradient(0, 0, rx * 0.08, 0, 0, rx);
    for (const [stop, color] of colorStops) {
      grad.addColorStop(stop, color);
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function paintCrater(
  albedoCtx: CanvasRenderingContext2D,
  bumpCtx: CanvasRenderingContext2D,
  w: number,
  h: number,
  lon: number,
  lat: number,
  radiusPx: number,
  depthStrength: number,
  hasEjectaRays: boolean,
  isMars: boolean
) {
  const [x, y] = lonLatToPixel(lon, lat, w, h);
  const latFactor = 1 / Math.max(0.32, Math.cos((lat * Math.PI) / 180));
  const rx = Math.min(w * 0.12, radiusPx * latFactor);
  const ry = radiusPx;

  drawWrappedFeature(albedoCtx, w, x, y, (cx, cy) => {
    // Ejecta rays (bright lunar craters like Tycho/Copernicus)
    if (hasEjectaRays) {
      albedoCtx.save();
      albedoCtx.translate(cx, cy);
      albedoCtx.scale(latFactor, 1);
      const rayCount = 10;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + (lon % 1) * 2;
        const len = radiusPx * (3.2 + (i % 3) * 1.4);
        const grad = albedoCtx.createLinearGradient(0, 0, Math.cos(angle) * len, Math.sin(angle) * len);
        grad.addColorStop(0, 'rgba(235, 238, 244, 0.28)');
        grad.addColorStop(1, 'rgba(235, 238, 244, 0)');
        albedoCtx.strokeStyle = grad;
        albedoCtx.lineWidth = Math.max(1, radiusPx * 0.25);
        albedoCtx.beginPath();
        albedoCtx.moveTo(Math.cos(angle) * radiusPx * 0.8, Math.sin(angle) * radiusPx * 0.8);
        albedoCtx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        albedoCtx.stroke();
      }
      albedoCtx.restore();
    }

    // Albedo floor + bright rim
    albedoCtx.save();
    albedoCtx.translate(cx, cy);
    albedoCtx.scale(rx / ry, 1);
    const floorGrad = albedoCtx.createRadialGradient(0, 0, ry * 0.1, 0, 0, ry * 1.15);
    if (isMars) {
      floorGrad.addColorStop(0, `rgba(74, 34, 21, ${0.35 * depthStrength})`);
      floorGrad.addColorStop(0.75, `rgba(110, 52, 32, ${0.22 * depthStrength})`);
      floorGrad.addColorStop(0.92, `rgba(218, 134, 88, ${0.28 * depthStrength})`);
      floorGrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else {
      floorGrad.addColorStop(0, `rgba(72, 75, 80, ${0.38 * depthStrength})`);
      floorGrad.addColorStop(0.78, `rgba(112, 115, 120, ${0.22 * depthStrength})`);
      floorGrad.addColorStop(0.93, `rgba(220, 224, 230, ${0.3 * depthStrength})`);
      floorGrad.addColorStop(1, 'rgba(0,0,0,0)');
    }
    albedoCtx.fillStyle = floorGrad;
    albedoCtx.beginPath();
    albedoCtx.arc(0, 0, ry * 1.15, 0, Math.PI * 2);
    albedoCtx.fill();
    albedoCtx.restore();
  });

  // Height / bump map: dark bowl, bright rim
  drawWrappedFeature(bumpCtx, w, x, y, (cx, cy) => {
    bumpCtx.save();
    bumpCtx.translate(cx, cy);
    bumpCtx.scale(rx / ry, 1);
    const bGrad = bumpCtx.createRadialGradient(0, 0, ry * 0.05, 0, 0, ry * 1.25);
    bGrad.addColorStop(0, `rgba(25, 25, 25, ${0.75 * depthStrength})`);
    bGrad.addColorStop(0.72, `rgba(55, 55, 55, ${0.55 * depthStrength})`);
    bGrad.addColorStop(0.88, `rgba(245, 245, 245, ${0.75 * depthStrength})`);
    bGrad.addColorStop(1, 'rgba(128,128,128,0)');
    bumpCtx.fillStyle = bGrad;
    bumpCtx.beginPath();
    bumpCtx.arc(0, 0, ry * 1.25, 0, Math.PI * 2);
    bumpCtx.fill();
    bumpCtx.restore();
  });
}

function addProceduralRegolithGrain(
  albedoCtx: CanvasRenderingContext2D,
  bumpCtx: CanvasRenderingContext2D,
  roughCtx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  isMars: boolean
) {
  const albedoData = albedoCtx.getImageData(0, 0, w, h);
  const bumpData = bumpCtx.getImageData(0, 0, w, h);
  const roughData = roughCtx.getImageData(0, 0, w, h);
  const a = albedoData.data;
  const b = bumpData.data;
  const r = roughData.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const polarBlend = Math.max(0, Math.abs(v - 0.5) * 2 - 0.84) / 0.16;
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const n1 = Math.sin(x * 0.045 + Math.cos(y * 0.04) * 2.2) * Math.cos(y * 0.05);
      const n2 = Math.sin(x * 0.16 - y * 0.11) * 0.5;
      const micro = (rand() - 0.5) * 18;
      const delta = n1 * 9 + n2 * 6 + micro;

      if (isMars) {
        a[idx] = Math.min(255, Math.max(0, a[idx] + delta * 1.1));
        a[idx + 1] = Math.min(255, Math.max(0, a[idx + 1] + delta * 0.72));
        a[idx + 2] = Math.min(255, Math.max(0, a[idx + 2] + delta * 0.45));
      } else {
        a[idx] = Math.min(255, Math.max(0, a[idx] + delta));
        a[idx + 1] = Math.min(255, Math.max(0, a[idx + 1] + delta));
        a[idx + 2] = Math.min(255, Math.max(0, a[idx + 2] + delta * 1.02));
      }

      const bumpVal = Math.min(255, Math.max(0, b[idx] + delta * 1.3));
      b[idx] = bumpVal;
      b[idx + 1] = bumpVal;
      b[idx + 2] = bumpVal;

      // Roughness: highlands/dust rougher (225-248), icy poles or smooth maria slightly lower (190-220)
      const roughBase = isMars ? 225 - polarBlend * 55 : 230;
      const roughVal = Math.min(255, Math.max(130, roughBase + micro * 0.7));
      r[idx] = roughVal;
      r[idx + 1] = roughVal;
      r[idx + 2] = roughVal;
      r[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(albedoData, 0, 0);
  bumpCtx.putImageData(bumpData, 0, 0);
  roughCtx.putImageData(roughData, 0, 0);
}

export function createMoonTextureSet(
  renderer: THREE.WebGLRenderer,
  lowRes = false
): PlanetaryTextureSet {
  const w = lowRes ? 1024 : 2048;
  const h = lowRes ? 512 : 1024;
  const rand = mulberry32(19690720);

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = w;
  albedoCanvas.height = h;
  const albedoCtx = albedoCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const bumpCtx = bumpCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = w;
  roughCanvas.height = h;
  const roughCtx = roughCanvas.getContext('2d')!;

  // Base lunar anorthositic highland regolith
  albedoCtx.fillStyle = '#a8aaad';
  albedoCtx.fillRect(0, 0, w, h);

  bumpCtx.fillStyle = '#868686';
  bumpCtx.fillRect(0, 0, w, h);

  // Subtle regional brightness mottling
  for (let i = 0; i < 90; i++) {
    const lon = rand() * 360 - 180;
    const lat = rand() * 160 - 80;
    const shade = 148 + Math.floor(rand() * 44);
    paintSoftBasin(albedoCtx, w, h, lon, lat, 18 + rand() * 28, 14 + rand() * 22, [
      [0, `rgba(${shade}, ${shade + 1}, ${shade + 3}, 0.25)`],
      [1, 'rgba(160,160,160,0)']
    ]);
  }

  // Real major lunar maria & basins mapped accurately by (lon, lat)
  const lunarMaria: Array<[number, number, number, number, number, string]> = [
    // [lon, lat, rxDeg, ryDeg, rot, darkness]
    [-46, 18, 30, 26, -0.3, 'rgba(68, 72, 79, 0.72)'], // Oceanus Procellarum
    [-25, 2, 16, 14, 0.2, 'rgba(72, 76, 82, 0.65)'], // Procellarum south / Apollo 12 area
    [-16, 33, 21, 18, 0.1, 'rgba(62, 66, 73, 0.78)'], // Mare Imbrium
    [18, 28, 13, 12, 0.0, 'rgba(66, 70, 77, 0.74)'], // Mare Serenitatis
    [30, 9, 14, 11, -0.2, 'rgba(60, 64, 72, 0.76)'], // Mare Tranquillitatis (Apollo 11)
    [51, -8, 11, 12, 0.2, 'rgba(68, 72, 78, 0.7)'], // Mare Fecunditatis (Luna 16)
    [59, 17, 8, 7, 0.0, 'rgba(58, 62, 70, 0.8)'], // Mare Crisium (Luna 24)
    [35, -15, 9, 8, 0.1, 'rgba(72, 75, 82, 0.68)'], // Mare Nectaris
    [-17, -21, 13, 11, 0.2, 'rgba(70, 74, 80, 0.68)'], // Mare Nubium
    [-39, -24, 9, 8, 0.0, 'rgba(66, 70, 76, 0.72)'], // Mare Humorum
    [-21, -10, 9, 7, -0.1, 'rgba(70, 74, 81, 0.68)'], // Mare Cognitum (Ranger 7)
    [5, 52, 16, 7, 0.0, 'rgba(72, 76, 82, 0.62)'], // Mare Frigoris
    [-169, -53, 36, 28, 0.15, 'rgba(84, 87, 92, 0.56)'] // South Pole-Aitken Basin (Far Side, Chang'e-4)
  ];

  for (const [lon, lat, rx, ry, rot, col] of lunarMaria) {
    paintSoftBasin(
      albedoCtx,
      w,
      h,
      lon,
      lat,
      rx,
      ry,
      [
        [0, col],
        [0.65, col.replace(/0\.\d+\)/, '0.42)')],
        [1, 'rgba(140,142,146,0)']
      ],
      rot
    );
    // Slight basin depression in bump map
    paintSoftBasin(
      bumpCtx,
      w,
      h,
      lon,
      lat,
      rx,
      ry,
      [
        [0, 'rgba(92, 92, 92, 0.55)'],
        [0.85, 'rgba(138, 138, 138, 0.2)'],
        [1, 'rgba(128,128,128,0)']
      ],
      rot
    );
  }

  // Iconic bright-rayed lunar craters
  const rayCraters: Array<[number, number, number]> = [
    [-11.4, -43.3, 18], // Tycho
    [-20.1, 9.6, 17], // Copernicus
    [-38.0, 8.1, 10], // Kepler
    [-47.4, 23.7, 11], // Aristarchus
    [147.8, 10.6, 14] // Giordano Bruno / far-side bright crater
  ];
  for (const [lon, lat, r] of rayCraters) {
    paintCrater(albedoCtx, bumpCtx, w, h, lon, lat, (r / 1024) * h, 0.95, true, false);
  }

  // Dense multi-scale lunar cratering (more intense on far side)
  const craterCount = lowRes ? 520 : 950;
  for (let i = 0; i < craterCount; i++) {
    const lon = rand() * 360 - 180;
    const lat = (rand() - 0.5) * 168;
    const farSideBoost = Math.abs(lon) > 95 ? 1.25 : 0.95;
    const radius = Math.pow(rand(), 2.4) * (h * 0.042) * farSideBoost + h * 0.0028;
    const strength = 0.35 + rand() * 0.55;
    paintCrater(albedoCtx, bumpCtx, w, h, lon, lat, radius, strength, false, false);
  }

  addProceduralRegolithGrain(albedoCtx, bumpCtx, roughCtx, w, h, rand, false);

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const map = new THREE.CanvasTexture(albedoCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAniso;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.anisotropy = maxAniso;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = maxAniso;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  return { map, bumpMap, roughnessMap };
}

export function createMarsTextureSet(
  renderer: THREE.WebGLRenderer,
  lowRes = false
): PlanetaryTextureSet {
  const w = lowRes ? 1024 : 2048;
  const h = lowRes ? 512 : 1024;
  const rand = mulberry32(20210218);

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = w;
  albedoCanvas.height = h;
  const albedoCtx = albedoCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const bumpCtx = bumpCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = w;
  roughCanvas.height = h;
  const roughCtx = roughCanvas.getContext('2d')!;

  // Base Martian ferric dust & ochre regolith gradient (darker southern highlands, dusty bright northern/Tharsis plains)
  const baseGrad = albedoCtx.createLinearGradient(0, 0, 0, h);
  baseGrad.addColorStop(0.0, '#c89b7c');
  baseGrad.addColorStop(0.25, '#c16f45');
  baseGrad.addColorStop(0.55, '#b65b34');
  baseGrad.addColorStop(0.85, '#9d4b2d');
  baseGrad.addColorStop(1.0, '#b57b5b');
  albedoCtx.fillStyle = baseGrad;
  albedoCtx.fillRect(0, 0, w, h);

  // Hemispheric crustal dichotomy in bump map (low northern plains, elevated cratered south)
  const bumpGrad = bumpCtx.createLinearGradient(0, 0, 0, h);
  bumpGrad.addColorStop(0.0, '#6e6e6e');
  bumpGrad.addColorStop(0.45, '#7c7c7c');
  bumpGrad.addColorStop(0.65, '#929292');
  bumpGrad.addColorStop(1.0, '#9a9a9a');
  bumpCtx.fillStyle = bumpGrad;
  bumpCtx.fillRect(0, 0, w, h);

  // Major real Martian albedo & geological features
  const marsFeatures: Array<[number, number, number, number, number, string, boolean]> = [
    // [lon, lat, rxDeg, ryDeg, rot, rgba, isHighland]
    [69, 9, 16, 18, 0.2, 'rgba(72, 42, 34, 0.72)', false], // Syrtis Major dark basaltic shield
    [-21, 48, 28, 18, -0.1, 'rgba(84, 52, 40, 0.58)', false], // Acidalia Planitia
    [-40, 24, 16, 13, 0.2, 'rgba(168, 92, 54, 0.45)', false], // Chryse Planitia (Viking 1, Pathfinder)
    [110, 38, 34, 22, 0.05, 'rgba(182, 102, 58, 0.48)', false], // Utopia Planitia (Viking 2, Tianwen-1)
    [70, -42, 24, 20, 0.0, 'rgba(196, 122, 78, 0.52)', false], // Hellas Planitia bright dusty basin
    [-44, -50, 14, 12, 0.0, 'rgba(186, 108, 68, 0.42)', false], // Argyre Planitia
    [-112, 2, 28, 28, 0.0, 'rgba(206, 124, 72, 0.56)', true], // Tharsis Volcanic Rise
    [-134, 18.6, 8, 8, 0.0, 'rgba(218, 138, 84, 0.62)', true], // Olympus Mons
    [146, 18, 16, 14, 0.0, 'rgba(198, 114, 68, 0.45)', true], // Elysium Rise (near InSight / Curiosity)
    [-5, -2, 18, 10, 0.0, 'rgba(88, 52, 40, 0.48)', false], // Meridiani Planum (Opportunity / Schiaparelli)
    [-158, -45, 28, 18, 0.0, 'rgba(104, 58, 42, 0.44)', true] // Terra Sirenum (Mars 3)
  ];

  for (const [lon, lat, rx, ry, rot, col, isHigh] of marsFeatures) {
    paintSoftBasin(
      albedoCtx,
      w,
      h,
      lon,
      lat,
      rx,
      ry,
      [
        [0, col],
        [0.65, col.replace(/0\.\d+\)/, '0.26)')],
        [1, 'rgba(180,95,55,0)']
      ],
      rot
    );
    paintSoftBasin(
      bumpCtx,
      w,
      h,
      lon,
      lat,
      rx,
      ry,
      [
        [0, isHigh ? 'rgba(225, 225, 225, 0.65)' : 'rgba(65, 65, 65, 0.45)'],
        [1, 'rgba(128,128,128,0)']
      ],
      rot
    );
  }

  // Valles Marineris canyon scar (~14°S, -92°E to -35°E)
  const [vmStartX, vmStartY] = lonLatToPixel(-92, -8, w, h);
  const [vmEndX, vmEndY] = lonLatToPixel(-38, -16, w, h);
  albedoCtx.save();
  albedoCtx.strokeStyle = 'rgba(66, 30, 22, 0.72)';
  albedoCtx.lineWidth = h * 0.022;
  albedoCtx.lineCap = 'round';
  albedoCtx.beginPath();
  albedoCtx.moveTo(vmStartX, vmStartY);
  albedoCtx.bezierCurveTo(
    (vmStartX + vmEndX) * 0.45,
    vmStartY + h * 0.03,
    (vmStartX + vmEndX) * 0.65,
    vmEndY - h * 0.02,
    vmEndX,
    vmEndY
  );
  albedoCtx.stroke();
  albedoCtx.restore();

  bumpCtx.save();
  bumpCtx.strokeStyle = 'rgba(20, 20, 20, 0.85)';
  bumpCtx.lineWidth = h * 0.024;
  bumpCtx.lineCap = 'round';
  bumpCtx.beginPath();
  bumpCtx.moveTo(vmStartX, vmStartY);
  bumpCtx.bezierCurveTo(
    (vmStartX + vmEndX) * 0.45,
    vmStartY + h * 0.03,
    (vmStartX + vmEndX) * 0.65,
    vmEndY - h * 0.02,
    vmEndX,
    vmEndY
  );
  bumpCtx.stroke();
  bumpCtx.restore();

  // Dusty wind streaks and mottling
  for (let i = 0; i < 120; i++) {
    const lon = rand() * 360 - 180;
    const lat = (rand() - 0.5) * 140;
    const bright = rand() > 0.45;
    paintSoftBasin(
      albedoCtx,
      w,
      h,
      lon,
      lat,
      8 + rand() * 18,
      3 + rand() * 8,
      [
        [0, bright ? 'rgba(218, 134, 82, 0.2)' : 'rgba(90, 44, 30, 0.22)'],
        [1, 'rgba(0,0,0,0)']
      ],
      (rand() - 0.5) * 0.5
    );
  }

  // Martian craters (concentrated in southern highlands)
  const craterCount = lowRes ? 280 : 520;
  for (let i = 0; i < craterCount; i++) {
    const lon = rand() * 360 - 180;
    const inSouth = rand() > 0.3;
    const lat = inSouth ? -rand() * 75 : rand() * 68;
    const radius = Math.pow(rand(), 2.5) * (h * 0.032) + h * 0.0025;
    paintCrater(albedoCtx, bumpCtx, w, h, lon, lat, radius, 0.4 + rand() * 0.45, false, true);
  }

  // Polar CO2 / water-ice caps
  const northCapGrad = albedoCtx.createLinearGradient(0, 0, 0, h * 0.1);
  northCapGrad.addColorStop(0, 'rgba(246, 243, 240, 0.96)');
  northCapGrad.addColorStop(0.65, 'rgba(235, 224, 214, 0.78)');
  northCapGrad.addColorStop(1, 'rgba(215, 165, 130, 0)');
  albedoCtx.fillStyle = northCapGrad;
  albedoCtx.fillRect(0, 0, w, h * 0.1);

  const southCapGrad = albedoCtx.createLinearGradient(0, h * 0.91, 0, h);
  southCapGrad.addColorStop(0, 'rgba(210, 155, 120, 0)');
  southCapGrad.addColorStop(0.4, 'rgba(235, 226, 218, 0.72)');
  southCapGrad.addColorStop(1, 'rgba(246, 244, 242, 0.95)');
  albedoCtx.fillStyle = southCapGrad;
  albedoCtx.fillRect(0, h * 0.91, w, h * 0.09);

  addProceduralRegolithGrain(albedoCtx, bumpCtx, roughCtx, w, h, rand, true);

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const map = new THREE.CanvasTexture(albedoCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAniso;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.anisotropy = maxAniso;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = maxAniso;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  return { map, bumpMap, roughnessMap };
}

export function createMarsAtmosphereMesh(radius: number): THREE.Mesh {
  const geo = new THREE.SphereGeometry(radius * 1.032, 64, 48);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uGlowColor: { value: new THREE.Color('#e07a52') }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uGlowColor;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim = pow(clamp(0.65 - dot(vNormal, -vViewDir), 0.0, 1.0), 3.2);
        gl_FragColor = vec4(uGlowColor, rim * 0.42);
      }
    `
  });
  return new THREE.Mesh(geo, mat);
}

export function createStarfield(count = 1600, radius = 95): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rand = mulberry32(1958);
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius + rand() * 35;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const temp = rand();
    if (temp > 0.85) c.set('#cbdcf7');
    else if (temp > 0.65) c.set('#f5ead8');
    else c.set('#dce4ef');

    const brightness = 0.45 + rand() * 0.55;
    colors[i * 3] = c.r * brightness;
    colors[i * 3 + 1] = c.g * brightness;
    colors[i * 3 + 2] = c.b * brightness;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.28,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  });

  return new THREE.Points(geo, mat);
}

export function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}
