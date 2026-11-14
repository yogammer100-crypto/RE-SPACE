import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CelestialBody } from '../types/space';
import {
  createMarsAtmosphereMesh,
  createMarsTextureSet,
  createMoonTextureSet,
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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05070b');

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 0.15, 8.2);

    // Three-point cosmic illumination: warm solar key, cool space hemisphere fill, subtle rim
    const sunKey = new THREE.DirectionalLight('#fff5e6', 2.8);
    sunKey.position.set(7, 3.2, 6.5);
    scene.add(sunKey);

    const spaceHemi = new THREE.HemisphereLight('#334e78', '#090d16', 0.36);
    scene.add(spaceHemi);

    const rimLight = new THREE.DirectionalLight('#67e8f9', 0.45);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const stars = createStarfield(isSoftwareGl ? 700 : 1400, 75);
    scene.add(stars);

    // Moon textures & mesh
    const moonTex = createMoonTextureSet(renderer, isSoftwareGl);
    const moonGeo = new THREE.SphereGeometry(1, 64, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex.map,
      bumpMap: moonTex.bumpMap,
      bumpScale: 0.032,
      roughnessMap: moonTex.roughnessMap,
      roughness: 0.92,
      metalness: 0.02
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.userData.world = 'Moon';
    moonMesh.rotation.y = -Math.PI * 0.45; // Showcase lunar near side initially

    const moonRingGeo = new THREE.RingGeometry(1.12, 1.135, 72);
    const moonRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const moonRing = new THREE.Mesh(moonRingGeo, moonRingMat);
    const moonGroup = new THREE.Group();
    moonGroup.add(moonMesh);
    moonGroup.add(moonRing);
    scene.add(moonGroup);

    // Mars textures & mesh
    const marsTex = createMarsTextureSet(renderer, isSoftwareGl);
    const marsGeo = new THREE.SphereGeometry(1, 64, 48);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex.map,
      bumpMap: marsTex.bumpMap,
      bumpScale: 0.028,
      roughnessMap: marsTex.roughnessMap,
      roughness: 0.88,
      metalness: 0.03
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.userData.world = 'Mars';
    marsMesh.rotation.y = -Math.PI * 0.28;

    const marsAtmo = createMarsAtmosphereMesh(1.0);
    const marsRingGeo = new THREE.RingGeometry(1.12, 1.135, 72);
    const marsRingMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const marsRing = new THREE.Mesh(marsRingGeo, marsRingMat);

    const marsGroup = new THREE.Group();
    marsGroup.add(marsMesh);
    marsGroup.add(marsAtmo);
    marsGroup.add(marsRing);
    scene.add(marsGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const layoutPlanets = (w: number, h: number) => {
      const aspect = w / Math.max(1, h);
      const isCompact = aspect < 1.08;
      if (isCompact) {
        camera.fov = 48;
        camera.position.z = 9.0;
        moonGroup.userData.basePos = new THREE.Vector3(0, 1.55, 0);
        moonGroup.userData.baseScale = 1.08;
        marsGroup.userData.basePos = new THREE.Vector3(0, -1.55, 0);
        marsGroup.userData.baseScale = 1.12;
      } else {
        camera.fov = 42;
        camera.position.z = 8.2;
        const spread = Math.min(2.75, aspect * 1.52);
        moonGroup.userData.basePos = new THREE.Vector3(-spread, -0.08, 0);
        moonGroup.userData.baseScale = 1.44;
        marsGroup.userData.basePos = new THREE.Vector3(spread, -0.08, 0);
        marsGroup.userData.baseScale = 1.48;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    layoutPlanets(width, height);
    moonGroup.position.copy(moonGroup.userData.basePos);
    moonGroup.scale.setScalar(moonGroup.userData.baseScale);
    marsGroup.position.copy(marsGroup.userData.basePos);
    marsGroup.scale.setScalar(marsGroup.userData.baseScale);

    // Raycasting for direct hover & click on 3D spheres
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
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

    const targetCamPos = new THREE.Vector3(0, 0.15, 8.2);
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
        moonMesh.rotation.y += dt * 0.055;
        marsMesh.rotation.y += dt * 0.068;
        stars.rotation.y += dt * 0.004;
      }

      const activeHover = hoveredRef.current;
      const entering = enteringRef.current;

      const moonBasePos = moonGroup.userData.basePos as THREE.Vector3;
      const marsBasePos = marsGroup.userData.basePos as THREE.Vector3;
      const moonBaseScale = moonGroup.userData.baseScale as number;
      const marsBaseScale = marsGroup.userData.baseScale as number;

      const moonTargetScale =
        entering === 'Moon'
          ? moonBaseScale * 1.15
          : entering === 'Mars'
            ? moonBaseScale * 0.85
            : activeHover === 'Moon'
              ? moonBaseScale * 1.055
              : moonBaseScale;

      const marsTargetScale =
        entering === 'Mars'
          ? marsBaseScale * 1.15
          : entering === 'Moon'
            ? marsBaseScale * 0.85
            : activeHover === 'Mars'
              ? marsBaseScale * 1.055
              : marsBaseScale;

      const sM = THREE.MathUtils.damp(moonGroup.scale.x, moonTargetScale, 6, dt);
      const sR = THREE.MathUtils.damp(marsGroup.scale.x, marsTargetScale, 6, dt);
      moonGroup.scale.setScalar(sM);
      marsGroup.scale.setScalar(sR);

      // Subtle selection ring billboarded toward camera
      moonRing.lookAt(camera.position);
      marsRing.lookAt(camera.position);
      moonRingMat.opacity = THREE.MathUtils.damp(
        moonRingMat.opacity,
        activeHover === 'Moon' || entering === 'Moon' ? 0.55 : 0,
        8,
        dt
      );
      marsRingMat.opacity = THREE.MathUtils.damp(
        marsRingMat.opacity,
        activeHover === 'Mars' || entering === 'Mars' ? 0.55 : 0,
        8,
        dt
      );

      // Cinematic camera transition when entering a world
      if (entering === 'Moon') {
        targetCamPos.set(moonBasePos.x * 0.85, moonBasePos.y, 4.4);
        targetLook.copy(moonBasePos);
      } else if (entering === 'Mars') {
        targetCamPos.set(marsBasePos.x * 0.85, marsBasePos.y, 4.4);
        targetLook.copy(marsBasePos);
      } else {
        targetCamPos.set(0, 0.15, (width / Math.max(1, height)) < 1.08 ? 9.0 : 8.2);
        targetLook.set(0, 0, 0);
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, 4.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, 4.5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, 4.5, dt);
      currentLook.x = THREE.MathUtils.damp(currentLook.x, targetLook.x, 5, dt);
      currentLook.y = THREE.MathUtils.damp(currentLook.y, targetLook.y, 5, dt);
      currentLook.z = THREE.MathUtils.damp(currentLook.z, targetLook.z, 5, dt);
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
      moonTex.map.dispose();
      moonTex.bumpMap.dispose();
      moonTex.roughnessMap.dispose();

      marsGeo.dispose();
      marsMat.dispose();
      marsAtmo.geometry.dispose();
      (marsAtmo.material as THREE.Material).dispose();
      marsRingGeo.dispose();
      marsRingMat.dispose();
      marsTex.map.dispose();
      marsTex.bumpMap.dispose();
      marsTex.roughnessMap.dispose();

      stars.geometry.dispose();
      (stars.material as THREE.Material).dispose();
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
