import React, { useEffect, useRef, useState } from 'react';
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
  detectSoftwareWebGL
} from '../utils/planetaryTextures';

interface DualWorldHeroSceneProps {
  hoveredWorld: CelestialBody | null;
  enteringWorld: CelestialBody | null;
  onHoverWorld: (body: CelestialBody | null) => void;
  onSelectWorld: (body: CelestialBody) => void;
}

export const DualWorldHeroScene: React.FC<DualWorldHeroSceneProps> = ({
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
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
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

    const camera = new THREE.PerspectiveCamera(42, viewportWidth / viewportHeight, 0.1, 240);
    camera.position.set(0, 0.12, 8.0);

    // Three-point deep-space illumination aligned with distant solar corona
    const sunKey = new THREE.DirectionalLight('#fff4e3', 3.05);
    sunKey.position.set(9, 4.2, 7);
    scene.add(sunKey);

    const spaceHemi = new THREE.HemisphereLight('#2d4772', '#060912', 0.34);
    scene.add(spaceHemi);

    const rimLight = new THREE.DirectionalLight('#38bdf8', 0.52);
    rimLight.position.set(-7, -2.5, -5.5);
    scene.add(rimLight);

    // Multi-depth starfield layers for subtle parallax
    const starsFar = createStarfield(isSoftwareGl ? 450 : 1000, 118, 0.22, 0.72, 1958);
    const starsMid = createStarfield(isSoftwareGl ? 300 : 700, 74, 0.31, 0.88, 1969);
    const starsNear = createStarfield(isSoftwareGl ? 150 : 320, 42, 0.38, 0.65, 2021);
    scene.add(starsFar);
    scene.add(starsMid);
    scene.add(starsNear);

    // Distant solar corona positioned far in upper-right cosmic space
    const sunSprite = createDistantSunSprite(new THREE.Vector3(24, 11.5, -36));
    scene.add(sunSprite);

    // Subtle orbital dust cloud spanning deep space
    const orbitalDust = createOrbitalDustParticles(isSoftwareGl ? 90 : 220, 2.2, 8.2, '#94a3b8');
    scene.add(orbitalDust);

    // Moon textures & mesh
    const moonTex = createMoonTextureSet(renderer, isSoftwareGl);
    const moonGeo = new THREE.SphereGeometry(1, 72, 54);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex.map,
      bumpMap: moonTex.bumpMap,
      bumpScale: 0.036,
      roughnessMap: moonTex.roughnessMap,
      roughness: 0.92,
      metalness: 0.02
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.userData.world = 'Moon';
    moonMesh.rotation.y = -Math.PI * 0.44;
    moonMesh.rotation.z = THREE.MathUtils.degToRad(6.6);

    const moonRingGeo = new THREE.RingGeometry(1.1, 1.116, 80);
    const moonRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const moonRing = new THREE.Mesh(moonRingGeo, moonRingMat);

    // Faint tilted orbital track around Moon
    const moonOrbitGeo = new THREE.RingGeometry(1.36, 1.366, 96);
    const moonOrbitMat = new THREE.MeshBasicMaterial({
      color: '#64748b',
      transparent: true,
      opacity: 0.18,
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

    // Mars textures & mesh
    const marsTex = createMarsTextureSet(renderer, isSoftwareGl);
    const marsGeo = new THREE.SphereGeometry(1, 72, 54);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex.map,
      bumpMap: marsTex.bumpMap,
      bumpScale: 0.032,
      roughnessMap: marsTex.roughnessMap,
      roughness: 0.88,
      metalness: 0.03
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.userData.world = 'Mars';
    marsMesh.rotation.y = -Math.PI * 0.28;
    marsMesh.rotation.z = THREE.MathUtils.degToRad(25.19); // Authentic axial tilt

    const marsAtmo = createMarsAtmosphereMesh(1.0);
    const marsRingGeo = new THREE.RingGeometry(1.1, 1.116, 80);
    const marsRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const marsRing = new THREE.Mesh(marsRingGeo, marsRingMat);

    const marsOrbitGeo = new THREE.RingGeometry(1.38, 1.386, 96);
    const marsOrbitMat = new THREE.MeshBasicMaterial({
      color: '#c27b5c',
      transparent: true,
      opacity: 0.18,
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

    let baseCamZ = 8.0;
    const layoutPlanets = (w: number, h: number) => {
      viewportWidth = w;
      viewportHeight = h;
      const aspect = w / Math.max(1, h);
      const isCompact = aspect < 1.08;
      if (isCompact) {
        camera.fov = 48;
        baseCamZ = 8.6;
        moonGroup.userData.basePos = new THREE.Vector3(0, 1.52, 0);
        moonGroup.userData.baseScale = 1.18;
        marsGroup.userData.basePos = new THREE.Vector3(0, -1.52, 0);
        marsGroup.userData.baseScale = 1.24;
      } else {
        camera.fov = 42;
        baseCamZ = 7.75;
        const spread = Math.min(2.65, aspect * 1.48);
        moonGroup.userData.basePos = new THREE.Vector3(-spread, -0.04, 0);
        moonGroup.userData.baseScale = 1.62;
        marsGroup.userData.basePos = new THREE.Vector3(spread, -0.04, 0);
        marsGroup.userData.baseScale = 1.68;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    layoutPlanets(viewportWidth, viewportHeight);
    moonGroup.position.copy(moonGroup.userData.basePos);
    moonGroup.scale.setScalar(moonGroup.userData.baseScale);
    marsGroup.position.copy(marsGroup.userData.basePos);
    marsGroup.scale.setScalar(marsGroup.userData.baseScale);

    // Raycasting & subtle pointer parallax
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerTargetOffset = { x: 0, y: 0 };
    const pointerCurrentOffset = { x: 0, y: 0 };
    let pointerHover: CelestialBody | null = null;
    let pointerDownPos = { x: 0, y: 0 };

    const getHitWorld = (clientX: number, clientY: number): CelestialBody | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
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
      pointerTargetOffset.x = nx * 0.22;
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

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      layoutPlanets(w, h);
    };
    window.addEventListener('resize', onResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const targetCamPos = new THREE.Vector3(0, 0.12, baseCamZ);
    const targetLook = new THREE.Vector3(0, 0, 0);
    const currentLook = new THREE.Vector3(0, 0, 0);

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();

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

      if (!prefersReducedMotion) {
        moonMesh.rotation.y += dt * 0.048;
        marsMesh.rotation.y += dt * 0.062;
        moonOrbit.rotation.z += dt * 0.035;
        marsOrbit.rotation.z -= dt * 0.032;
        starsFar.rotation.y += dt * 0.0022;
        starsMid.rotation.y += dt * 0.0045;
        starsNear.rotation.y += dt * 0.0075;
        orbitalDust.rotation.y += dt * 0.016;
      }

      const activeHover = hoveredRef.current;
      const entering = enteringRef.current;

      const moonBasePos = moonGroup.userData.basePos as THREE.Vector3;
      const marsBasePos = marsGroup.userData.basePos as THREE.Vector3;
      const moonBaseScale = moonGroup.userData.baseScale as number;
      const marsBaseScale = marsGroup.userData.baseScale as number;

      const moonTargetScale =
        entering === 'Moon'
          ? moonBaseScale * 1.18
          : entering === 'Mars'
            ? moonBaseScale * 0.78
            : activeHover === 'Moon'
              ? moonBaseScale * 1.06
              : moonBaseScale;

      const marsTargetScale =
        entering === 'Mars'
          ? marsBaseScale * 1.18
          : entering === 'Moon'
            ? marsBaseScale * 0.78
            : activeHover === 'Mars'
              ? marsBaseScale * 1.06
              : marsBaseScale;

      moonGroup.scale.setScalar(THREE.MathUtils.damp(moonGroup.scale.x, moonTargetScale, 6, dt));
      marsGroup.scale.setScalar(THREE.MathUtils.damp(marsGroup.scale.x, marsTargetScale, 6, dt));

      // Subtle parallax drift when browsing entrance
      if (!prefersReducedMotion && !entering) {
        pointerCurrentOffset.x = THREE.MathUtils.damp(
          pointerCurrentOffset.x,
          pointerTargetOffset.x,
          4,
          dt
        );
        pointerCurrentOffset.y = THREE.MathUtils.damp(
          pointerCurrentOffset.y,
          pointerTargetOffset.y,
          4,
          dt
        );
      } else {
        pointerCurrentOffset.x = 0;
        pointerCurrentOffset.y = 0;
      }

      // Selection reticle ring facing camera
      moonRing.lookAt(camera.position);
      marsRing.lookAt(camera.position);
      moonRingMat.opacity = THREE.MathUtils.damp(
        moonRingMat.opacity,
        entering === 'Moon' ? 0.7 : activeHover === 'Moon' ? 0.58 : 0.08,
        8,
        dt
      );
      marsRingMat.opacity = THREE.MathUtils.damp(
        marsRingMat.opacity,
        entering === 'Mars' ? 0.7 : activeHover === 'Mars' ? 0.58 : 0.08,
        8,
        dt
      );

      // Cinematic camera fly-in when entering a world
      if (entering === 'Moon') {
        targetCamPos.set(moonBasePos.x * 0.96, moonBasePos.y, 3.85);
        targetLook.copy(moonBasePos);
      } else if (entering === 'Mars') {
        targetCamPos.set(marsBasePos.x * 0.96, marsBasePos.y, 3.85);
        targetLook.copy(marsBasePos);
      } else {
        targetCamPos.set(
          pointerCurrentOffset.x,
          0.12 + pointerCurrentOffset.y,
          baseCamZ
        );
        targetLook.set(pointerCurrentOffset.x * 0.25, pointerCurrentOffset.y * 0.25, 0);
      }

      const camDamp = entering ? 4.8 : 6.0;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, camDamp, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, camDamp, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, camDamp, dt);
      currentLook.x = THREE.MathUtils.damp(currentLook.x, targetLook.x, camDamp + 0.5, dt);
      currentLook.y = THREE.MathUtils.damp(currentLook.y, targetLook.y, camDamp + 0.5, dt);
      currentLook.z = THREE.MathUtils.damp(currentLook.z, targetLook.z, camDamp + 0.5, dt);
      camera.lookAt(currentLook);

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
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
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
  }, []);

  if (webglError) {
    return (
      <div className="absolute inset-0 bg-[#05070b] flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-3 border border-white/10 bg-[#0c111b] p-6 rounded-xl">
          <p className="text-sm font-medium text-slate-200">
            Interactive 3D acceleration is unavailable in this browser context.
          </p>
          <p className="text-xs text-slate-400">
            Use the world selection controls below to explore the Moon and Mars archives directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full select-none"
      aria-label="Interactive 3D showcase of the Moon and Mars"
    />
  );
};
