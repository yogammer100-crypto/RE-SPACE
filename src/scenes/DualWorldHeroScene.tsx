import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CelestialBody } from '../types/space';
import {
  createDistantSunSprite,
  createMarsAtmosphereMesh,
  createMarsTextureSet,
  createMoonTextureSet,
  createOrbitalDustParticles,
  createStarfield,
  detectSoftwareWebGL,
  isCompactViewportDevice,
  loadVerifiedPlanetaryTextures
} from '../utils/planetaryTextures';

export interface HeroScrollChoreographyState {
  /** Normalized scroll across the full homepage (0 = top hero, 1 = bottom choose section) */
  totalProgress: number;
  /** Weight (0..1) of how strongly the planets should step back during editorial storytelling sections B/C */
  storyRecess: number;
  /** Lateral sweep (-1..1) driven by Section C horizontal timeline scrub */
  horizonSweep: number;
}

interface DualWorldHeroSceneProps {
  scrollStateRef: MutableRefObject<HeroScrollChoreographyState>;
  hoveredWorld: CelestialBody | null;
  enteringWorld: CelestialBody | null;
  onHoverWorld: (body: CelestialBody | null) => void;
  onSelectWorld: (body: CelestialBody) => void;
}

const _moonTargetPos = new THREE.Vector3();
const _marsTargetPos = new THREE.Vector3();
const _camTargetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();
const _currentLook = new THREE.Vector3();

export const DualWorldHeroScene: React.FC<DualWorldHeroSceneProps> = ({
  scrollStateRef,
  hoveredWorld,
  enteringWorld,
  onHoverWorld,
  onSelectWorld
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  const hoveredRef = useRef<CelestialBody | null>(hoveredWorld);
  const enteringRef = useRef<CelestialBody | null>(enteringWorld);
  const onHoverRef = useRef(onHoverWorld);
  const onSelectRef = useRef(onSelectWorld);

  hoveredRef.current = hoveredWorld;
  enteringRef.current = enteringWorld;
  onHoverRef.current = onHoverWorld;
  onSelectRef.current = onSelectWorld;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const isCompact = isCompactViewportDevice();
    const lowRes = isSoftwareGl || isCompact;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false
      });
    } catch {
      setWebglError(true);
      return;
    }

    let viewportWidth = container.clientWidth || window.innerWidth;
    let viewportHeight = container.clientHeight || window.innerHeight;

    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isCompact ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#04060a');

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(42, viewportWidth / Math.max(1, viewportHeight), 0.1, 260);
    camera.position.set(0, 0.08, 7.6);

    // Three-point deep-space illumination aligned with distant solar corona
    const sunKey = new THREE.DirectionalLight('#fff4e3', 3.15);
    sunKey.position.set(9.5, 4.2, 7.2);
    scene.add(sunKey);

    const spaceHemi = new THREE.HemisphereLight('#2d4772', '#060912', 0.32);
    scene.add(spaceHemi);

    const rimLight = new THREE.DirectionalLight('#38bdf8', 0.56);
    rimLight.position.set(-7.5, -2.5, -5.8);
    scene.add(rimLight);

    // Dedicated subtle focus fill light that warms/brightens the hovered world
    const focusSpot = new THREE.PointLight('#e0f2fe', 0, 14, 1.4);
    focusSpot.position.set(0, 0.8, 4.2);
    scene.add(focusSpot);

    // Three-depth starfield layers for true spatial parallax
    const starsFar = createStarfield(lowRes ? 420 : 1100, 120, 0.22, 0.72, 1958);
    const starsMid = createStarfield(lowRes ? 280 : 750, 74, 0.31, 0.88, 1969);
    const starsNear = createStarfield(lowRes ? 120 : 340, 40, 0.38, 0.66, 2021);
    scene.add(starsFar);
    scene.add(starsMid);
    scene.add(starsNear);

    // Distant solar corona in upper-right space
    const sunSprite = createDistantSunSprite(new THREE.Vector3(24, 11.5, -36));
    scene.add(sunSprite);

    // Subtle orbital dust cloud
    const orbitalDust = createOrbitalDustParticles(lowRes ? 80 : 240, 2.2, 8.4, '#94a3b8');
    scene.add(orbitalDust);

    // Moon textures & mesh (procedural base + progressive NASA LRO/LOLA upgrade)
    const moonTex = createMoonTextureSet(renderer, lowRes);
    const moonGeo = new THREE.SphereGeometry(1, lowRes ? 56 : 84, lowRes ? 42 : 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex.map,
      bumpMap: moonTex.bumpMap,
      bumpScale: 0.042,
      roughnessMap: moonTex.roughnessMap,
      roughness: 0.92,
      metalness: 0.02
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.userData.world = 'Moon';
    moonMesh.rotation.y = -Math.PI * 0.44;
    moonMesh.rotation.z = THREE.MathUtils.degToRad(6.6);

    const moonRingGeo = new THREE.RingGeometry(1.09, 1.106, 84);
    const moonRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const moonRing = new THREE.Mesh(moonRingGeo, moonRingMat);

    const moonOrbitGeo = new THREE.RingGeometry(1.34, 1.346, 96);
    const moonOrbitMat = new THREE.MeshBasicMaterial({
      color: '#64748b',
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const moonOrbit = new THREE.Mesh(moonOrbitGeo, moonOrbitMat);
    moonOrbit.rotation.x = Math.PI * 0.42;
    moonOrbit.rotation.y = 0.25;

    const moonGroup = new THREE.Group();
    moonGroup.add(moonMesh);
    moonGroup.add(moonRing);
    moonGroup.add(moonOrbit);
    scene.add(moonGroup);

    // Mars textures & mesh (procedural base + progressive Viking/MGS upgrade)
    const marsTex = createMarsTextureSet(renderer, lowRes);
    const marsGeo = new THREE.SphereGeometry(1, lowRes ? 56 : 84, lowRes ? 42 : 64);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex.map,
      bumpMap: marsTex.bumpMap,
      bumpScale: 0.038,
      roughnessMap: marsTex.roughnessMap,
      roughness: 0.88,
      metalness: 0.03
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.userData.world = 'Mars';
    marsMesh.rotation.y = -Math.PI * 0.28;
    marsMesh.rotation.z = THREE.MathUtils.degToRad(25.19);

    const marsAtmo = createMarsAtmosphereMesh(1.0);
    const marsRingGeo = new THREE.RingGeometry(1.09, 1.106, 84);
    const marsRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const marsRing = new THREE.Mesh(marsRingGeo, marsRingMat);

    const marsOrbitGeo = new THREE.RingGeometry(1.36, 1.366, 96);
    const marsOrbitMat = new THREE.MeshBasicMaterial({
      color: '#c27b5c',
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const marsOrbit = new THREE.Mesh(marsOrbitGeo, marsOrbitMat);
    marsOrbit.rotation.x = Math.PI * 0.44;
    marsOrbit.rotation.y = -0.22;

    const marsGroup = new THREE.Group();
    marsGroup.add(marsMesh);
    marsGroup.add(marsAtmo);
    marsGroup.add(marsRing);
    marsGroup.add(marsOrbit);
    scene.add(marsGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let disposed = false;
    void loadVerifiedPlanetaryTextures('Moon', moonTex, lowRes, () => disposed);
    void loadVerifiedPlanetaryTextures('Mars', marsTex, lowRes, () => disposed);

    let baseCamZ = 7.6;
    const moonBasePos = new THREE.Vector3(-2.45, -0.05, 0);
    const marsBasePos = new THREE.Vector3(2.45, -0.05, 0);
    let moonBaseScale = 1.76;
    let marsBaseScale = 1.82;

    const layoutPlanets = (w: number, h: number) => {
      viewportWidth = w;
      viewportHeight = h;
      const aspect = w / Math.max(1, h);
      const compactLayout = aspect < 1.05;
      if (compactLayout) {
        camera.fov = 48;
        baseCamZ = 8.4;
        moonBasePos.set(0, 1.48, 0);
        moonBaseScale = 1.24;
        marsBasePos.set(0, -1.48, 0);
        marsBaseScale = 1.3;
      } else {
        camera.fov = 41;
        baseCamZ = 7.55;
        const spread = Math.min(2.68, aspect * 1.48);
        moonBasePos.set(-spread, -0.06, 0);
        moonBaseScale = 1.78;
        marsBasePos.set(spread, -0.06, 0);
        marsBaseScale = 1.84;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    layoutPlanets(viewportWidth, viewportHeight);
    moonGroup.position.copy(moonBasePos);
    moonGroup.scale.setScalar(moonBaseScale);
    marsGroup.position.copy(marsBasePos);
    marsGroup.scale.setScalar(marsBaseScale);

    // Raycasting & subtle pointer parallax
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerTargetOffset = { x: 0, y: 0 };
    const pointerCurrentOffset = { x: 0, y: 0 };
    let pointerHover: CelestialBody | null = null;
    let pointerDownPos = { x: 0, y: 0 };

    const getHitWorld = (clientX: number, clientY: number): CelestialBody | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      pointer.y = -((clientY - rect.top) / Math.max(1, rect.height)) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([moonMesh, marsMesh], false);
      if (hits.length > 0) {
        return hits[0].object.userData.world as CelestialBody;
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = -((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 + 1;
      pointerTargetOffset.x = nx * 0.24;
      pointerTargetOffset.y = ny * 0.14;

      if (enteringRef.current) return;
      const hit = getHitWorld(e.clientX, e.clientY);
      if (hit !== pointerHover) {
        pointerHover = hit;
        onHoverRef.current(hit);
      }
      renderer.domElement.style.cursor = hit ? 'pointer' : 'default';
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (enteringRef.current) return;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 8) return;
      const hit = getHitWorld(e.clientX, e.clientY);
      if (hit) {
        onSelectRef.current(hit);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isCompact ? 1.5 : 2)
      );
      layoutPlanets(w, h);
    };
    window.addEventListener('resize', onResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    let frameId = 0;
    let lastTime = performance.now();
    let isTabVisible = document.visibilityState !== 'hidden';

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState !== 'hidden';
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync || !gl.getSyncParameter) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!isTabVisible) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (!prefersReducedMotion) {
        moonMesh.rotation.y += dt * 0.055;
        marsMesh.rotation.y += dt * 0.072;
        moonOrbit.rotation.z += dt * 0.036;
        marsOrbit.rotation.z -= dt * 0.034;
        starsFar.rotation.y += dt * 0.0024;
        starsMid.rotation.y += dt * 0.0048;
        starsNear.rotation.y += dt * 0.008;
        orbitalDust.rotation.y += dt * 0.018;
      }

      const activeHover = hoveredRef.current;
      const entering = enteringRef.current;
      const scroll = scrollStateRef.current;
      const recess = entering ? 0 : THREE.MathUtils.clamp(scroll.storyRecess, 0, 1);
      const sweep = entering ? 0 : THREE.MathUtils.clamp(scroll.horizonSweep, -1, 1);

      // Planet positions: separate slightly and recess into cosmic depth during Sections B/C;
      // on planet selection, opposing planet recedes smoothly away while selected planet stays anchored
      const spreadBoost = recess * 1.15;
      const depthRecess = -recess * 2.6;

      if (entering === 'Moon') {
        _moonTargetPos.set(moonBasePos.x, moonBasePos.y, 0.25);
        _marsTargetPos.set(marsBasePos.x + 2.8, marsBasePos.y - 0.6, -4.5);
      } else if (entering === 'Mars') {
        _moonTargetPos.set(moonBasePos.x - 2.8, moonBasePos.y - 0.6, -4.5);
        _marsTargetPos.set(marsBasePos.x, marsBasePos.y, 0.25);
      } else {
        const signM = moonBasePos.x <= 0 ? -1 : 1;
        _moonTargetPos.set(
          moonBasePos.x + signM * spreadBoost - sweep * 0.55,
          moonBasePos.y + recess * 0.28,
          depthRecess
        );
        _marsTargetPos.set(
          marsBasePos.x - signM * spreadBoost - sweep * 0.55,
          marsBasePos.y + recess * 0.28,
          depthRecess
        );
      }

      moonGroup.position.x = THREE.MathUtils.damp(moonGroup.position.x, _moonTargetPos.x, 5.5, dt);
      moonGroup.position.y = THREE.MathUtils.damp(moonGroup.position.y, _moonTargetPos.y, 5.5, dt);
      moonGroup.position.z = THREE.MathUtils.damp(moonGroup.position.z, _moonTargetPos.z, 5.5, dt);

      marsGroup.position.x = THREE.MathUtils.damp(marsGroup.position.x, _marsTargetPos.x, 5.5, dt);
      marsGroup.position.y = THREE.MathUtils.damp(marsGroup.position.y, _marsTargetPos.y, 5.5, dt);
      marsGroup.position.z = THREE.MathUtils.damp(marsGroup.position.z, _marsTargetPos.z, 5.5, dt);

      const storyScaleFactor = 1 - recess * 0.16;
      const moonTargetScale =
        entering === 'Moon'
          ? moonBaseScale * 1.2
          : entering === 'Mars'
            ? moonBaseScale * 0.45
            : activeHover === 'Moon'
              ? moonBaseScale * 1.07 * storyScaleFactor
              : moonBaseScale * storyScaleFactor;

      const marsTargetScale =
        entering === 'Mars'
          ? marsBaseScale * 1.2
          : entering === 'Moon'
            ? marsBaseScale * 0.45
            : activeHover === 'Mars'
              ? marsBaseScale * 1.07 * storyScaleFactor
              : marsBaseScale * storyScaleFactor;

      moonGroup.scale.setScalar(THREE.MathUtils.damp(moonGroup.scale.x, moonTargetScale, 5.8, dt));
      marsGroup.scale.setScalar(THREE.MathUtils.damp(marsGroup.scale.x, marsTargetScale, 5.8, dt));

      // Subtle pointer parallax drift
      if (!prefersReducedMotion && !entering) {
        pointerCurrentOffset.x = THREE.MathUtils.damp(
          pointerCurrentOffset.x,
          pointerTargetOffset.x,
          4.2,
          dt
        );
        pointerCurrentOffset.y = THREE.MathUtils.damp(
          pointerCurrentOffset.y,
          pointerTargetOffset.y,
          4.2,
          dt
        );
      } else {
        pointerCurrentOffset.x = 0;
        pointerCurrentOffset.y = 0;
      }

      // Hover lighting response
      if (activeHover === 'Moon') {
        focusSpot.position.set(moonGroup.position.x * 0.7, moonGroup.position.y + 0.6, 4.4);
        focusSpot.intensity = THREE.MathUtils.damp(focusSpot.intensity, 1.35, 6, dt);
      } else if (activeHover === 'Mars') {
        focusSpot.position.set(marsGroup.position.x * 0.7, marsGroup.position.y + 0.6, 4.4);
        focusSpot.intensity = THREE.MathUtils.damp(focusSpot.intensity, 1.35, 6, dt);
      } else {
        focusSpot.intensity = THREE.MathUtils.damp(focusSpot.intensity, 0, 6, dt);
      }

      // Subtle solar illumination angle drift along scroll
      sunKey.position.x = 9.5 - sweep * 2.8;
      sunKey.position.y = 4.2 + recess * 1.6;

      // Selection reticle rings facing camera
      moonRing.lookAt(camera.position);
      marsRing.lookAt(camera.position);
      moonRingMat.opacity = THREE.MathUtils.damp(
        moonRingMat.opacity,
        entering === 'Moon'
          ? 0.72
          : entering === 'Mars'
            ? 0
            : activeHover === 'Moon'
              ? 0.62
              : 0.12 * (1 - recess * 0.65),
        8,
        dt
      );
      marsRingMat.opacity = THREE.MathUtils.damp(
        marsRingMat.opacity,
        entering === 'Mars'
          ? 0.72
          : entering === 'Moon'
            ? 0
            : activeHover === 'Mars'
              ? 0.62
              : 0.12 * (1 - recess * 0.65),
        8,
        dt
      );
      moonOrbitMat.opacity = THREE.MathUtils.damp(
        moonOrbitMat.opacity,
        entering === 'Mars' ? 0 : 0.2 * (1 - recess * 0.55),
        6,
        dt
      );
      marsOrbitMat.opacity = THREE.MathUtils.damp(
        marsOrbitMat.opacity,
        entering === 'Moon' ? 0 : 0.2 * (1 - recess * 0.55),
        6,
        dt
      );

      // Camera choreography:
      // 1. Entering world -> smooth fly-in toward selected planet
      // 2. Hovering world -> gentle camera drift toward hovered world
      // 3. Scroll -> subtle orbital sweep & depth shift across Sections A–D
      if (entering === 'Moon') {
        _camTargetPos.set(moonBasePos.x * 0.96, moonBasePos.y, 3.45);
        _targetLook.copy(moonBasePos);
      } else if (entering === 'Mars') {
        _camTargetPos.set(marsBasePos.x * 0.96, marsBasePos.y, 3.45);
        _targetLook.copy(marsBasePos);
      } else {
        const hoverBiasX =
          activeHover === 'Moon'
            ? moonBasePos.x * 0.16
            : activeHover === 'Mars'
              ? marsBasePos.x * 0.16
              : 0;
        const hoverBiasZ = activeHover ? -0.35 : 0;

        _camTargetPos.set(
          pointerCurrentOffset.x + hoverBiasX + sweep * 0.65,
          0.08 + pointerCurrentOffset.y + recess * 0.18,
          baseCamZ + hoverBiasZ + recess * 1.1
        );
        _targetLook.set(
          pointerCurrentOffset.x * 0.28 + hoverBiasX * 0.55 - sweep * 0.2,
          pointerCurrentOffset.y * 0.25,
          0
        );
      }

      const camDamp = entering ? 4.4 : 5.5;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTargetPos.x, camDamp, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTargetPos.y, camDamp, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTargetPos.z, camDamp, dt);
      _currentLook.x = THREE.MathUtils.damp(_currentLook.x, _targetLook.x, camDamp + 0.5, dt);
      _currentLook.y = THREE.MathUtils.damp(_currentLook.y, _targetLook.y, camDamp + 0.5, dt);
      _currentLook.z = THREE.MathUtils.damp(_currentLook.z, _targetLook.z, camDamp + 0.5, dt);
      camera.lookAt(_currentLook);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      moonGeo.dispose();
      moonMat.dispose();
      moonRingGeo.dispose();
      moonRingMat.dispose();
      moonOrbitGeo.dispose();
      moonOrbitMat.dispose();
      moonTex.map.dispose();
      moonTex.bumpMap.dispose();
      moonTex.roughnessMap.dispose();

      marsGeo.dispose();
      marsMat.dispose();
      marsAtmo.geometry.dispose();
      (marsAtmo.material as THREE.Material).dispose();
      marsRingGeo.dispose();
      marsRingMat.dispose();
      marsOrbitGeo.dispose();
      marsOrbitMat.dispose();
      marsTex.map.dispose();
      marsTex.bumpMap.dispose();
      marsTex.roughnessMap.dispose();

      [starsFar, starsMid, starsNear, orbitalDust].forEach((pts) => {
        pts.geometry.dispose();
        (pts.material as THREE.Material).dispose();
      });
      (sunSprite.material as THREE.SpriteMaterial).map?.dispose();
      sunSprite.material.dispose();

      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollStateRef]);

  if (webglError) {
    return (
      <div className="fixed inset-0 bg-[#04060a] flex items-center justify-center p-8 pointer-events-none">
        <div className="max-w-md text-center space-y-3 border border-white/10 bg-[#0b101b]/90 p-6 rounded-xl pointer-events-auto">
          <p className="text-sm font-medium text-slate-200">
            Interactive 3D acceleration is unavailable in this browser context.
          </p>
          <p className="text-xs text-slate-400">
            Use the destination actions and archive sections to explore the Moon and Mars directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 top-14 w-full h-[calc(100vh-3.5rem)] z-0 select-none"
      aria-label="Interactive 3D observatory of the Moon and Mars"
    />
  );
};
