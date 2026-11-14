import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Artifact, CelestialBody, PlanetaryLocation } from '../types/space';
import {
  clusterLocationsByZoom,
  latLonToVector3,
  LocationCluster
} from '../utils/coordinates';
import {
  createMarsAtmosphereMesh,
  createMarsTextureSet,
  createMoonTextureSet,
  createStarfield,
  detectSoftwareWebGL
} from '../utils/planetaryTextures';

export type MarkerCategory = 'rover' | 'lander' | 'instrument' | 'impact';

export function getLocationMarkerCategory(
  loc: PlanetaryLocation,
  artifactsById: Record<string, Artifact>
): MarkerCategory {
  const items = loc.artifactIds.map((id) => artifactsById[id]).filter(Boolean);
  if (items.some((a) => a.type === 'Rover')) return 'rover';
  if (items.some((a) => a.type === 'Lander' || a.type === 'Descent Stage')) return 'lander';
  if (items.some((a) => a.type === 'Scientific Instrument')) return 'instrument';
  return 'impact';
}

interface ProjectedMarker {
  id: string;
  x: number;
  y: number;
  isCluster: boolean;
  label: string;
  sublabel: string;
  category: MarkerCategory | 'cluster';
  isSelected: boolean;
  isHovered: boolean;
  cluster: LocationCluster;
}

interface PlanetExplorerSceneProps {
  body: CelestialBody;
  locations: PlanetaryLocation[];
  artifactsById: Record<string, Artifact>;
  selectedLocationId: string | null;
  sunAzimuthDeg: number;
  surveyLighting: boolean;
  resetSignal: number;
  focusLocationId: string | null;
  onSelectLocation: (location: PlanetaryLocation) => void;
  onCameraZoomChange?: (zoomPercent: number) => void;
}

const PLANET_RADIUS = 2.4;
const MIN_CAM_DIST = 3.25;
const MAX_CAM_DIST = 8.6;
const DEFAULT_CAM_DIST = 5.6;

export const PlanetExplorerScene: React.FC<PlanetExplorerSceneProps> = ({
  body,
  locations,
  artifactsById,
  selectedLocationId,
  sunAzimuthDeg,
  surveyLighting,
  resetSignal,
  focusLocationId,
  onSelectLocation,
  onCameraZoomChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);
  const [projectedMarkers, setProjectedMarkers] = useState<ProjectedMarker[]>([]);
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);

  const locationsRef = useRef(locations);
  const artifactsRef = useRef(artifactsById);
  const selectedIdRef = useRef(selectedLocationId);
  const hoveredIdRef = useRef(hoveredClusterId);
  const sunAzimuthRef = useRef(sunAzimuthDeg);
  const surveyLightingRef = useRef(surveyLighting);
  const onSelectRef = useRef(onSelectLocation);
  const onZoomChangeRef = useRef(onCameraZoomChange);

  locationsRef.current = locations;
  artifactsRef.current = artifactsById;
  selectedIdRef.current = selectedLocationId;
  hoveredIdRef.current = hoveredClusterId;
  sunAzimuthRef.current = sunAzimuthDeg;
  surveyLightingRef.current = surveyLighting;
  onSelectRef.current = onSelectLocation;
  onZoomChangeRef.current = onCameraZoomChange;

  const focusTriggerRef = useRef<(lat: number, lon: number, targetDist: number) => void>(() => {});
  const resetTriggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (resetSignal > 0) {
      resetTriggerRef.current();
    }
  }, [resetSignal]);

  useEffect(() => {
    if (!focusLocationId) return;
    const loc = locations.find((l) => l.id === focusLocationId);
    if (loc && loc.latitude !== null && loc.longitude !== null) {
      focusTriggerRef.current(loc.latitude, loc.longitude, 4.15);
    }
  }, [focusLocationId, locations]);

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
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05070b');

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    // Initial angle faces near-side Moon (~15°E) or Mars (~75°E)
    const initialLon = body === 'Moon' ? 18 : 85;
    const initialPos = latLonToVector3(12, initialLon, DEFAULT_CAM_DIST);
    camera.position.copy(initialPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.minDistance = MIN_CAM_DIST;
    controls.maxDistance = MAX_CAM_DIST;
    controls.rotateSpeed = 0.68;
    controls.zoomSpeed = 0.85;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;

    // Lighting rig
    const sunKey = new THREE.DirectionalLight('#fff6ea', 2.85);
    scene.add(sunKey);

    const hemiFill = new THREE.HemisphereLight('#3b5582', '#0b101b', 0.38);
    scene.add(hemiFill);

    const surveyAmbient = new THREE.AmbientLight('#dbeafe', 0.12);
    scene.add(surveyAmbient);

    const stars = createStarfield(isSoftwareGl ? 700 : 1500, 90);
    scene.add(stars);

    // Planet sphere
    const texSet =
      body === 'Moon'
        ? createMoonTextureSet(renderer, isSoftwareGl)
        : createMarsTextureSet(renderer, isSoftwareGl);

    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 96, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      map: texSet.map,
      bumpMap: texSet.bumpMap,
      bumpScale: body === 'Moon' ? 0.036 : 0.032,
      roughnessMap: texSet.roughnessMap,
      roughness: body === 'Moon' ? 0.92 : 0.88,
      metalness: 0.02
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planetMesh);

    let atmoMesh: THREE.Mesh | null = null;
    if (body === 'Mars') {
      atmoMesh = createMarsAtmosphereMesh(PLANET_RADIUS);
      scene.add(atmoMesh);
    }

    // Subtle latitude/longitude scientific graticule grid
    const gridGroup = new THREE.Group();
    const gridMat = new THREE.LineBasicMaterial({
      color: '#64748b',
      transparent: true,
      opacity: 0.14
    });
    for (let lat = -60; lat <= 60; lat += 30) {
      const r = Math.cos(THREE.MathUtils.degToRad(lat)) * (PLANET_RADIUS + 0.004);
      const y = Math.sin(THREE.MathUtils.degToRad(lat)) * (PLANET_RADIUS + 0.004);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    for (let lon = 0; lon < 180; lon += 30) {
      const pts: THREE.Vector3[] = [];
      const rad = THREE.MathUtils.degToRad(lon);
      for (let i = 0; i <= 72; i++) {
        const theta = (i / 72) * Math.PI * 2;
        const x = Math.cos(theta) * Math.cos(rad) * (PLANET_RADIUS + 0.004);
        const y = Math.sin(theta) * (PLANET_RADIUS + 0.004);
        const z = -Math.cos(theta) * Math.sin(rad) * (PLANET_RADIUS + 0.004);
        pts.push(new THREE.Vector3(x, y, z));
      }
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    scene.add(gridGroup);

    // Marker container
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);

    // Reusable marker geometries
    const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.09, 8);
    const diamondGeo = new THREE.OctahedronGeometry(0.042, 0);
    const hexGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.025, 6);
    const prismGeo = new THREE.ConeGeometry(0.04, 0.06, 3);
    const ringGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 24);
    const clusterGeo = new THREE.TorusGeometry(0.062, 0.014, 10, 28);
    const hitSphereGeo = new THREE.SphereGeometry(0.11, 10, 10);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    const matRover = new THREE.MeshStandardMaterial({
      color: '#22d3ee',
      emissive: '#0891b2',
      emissiveIntensity: 0.7,
      roughness: 0.3
    });
    const matLander = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      emissive: '#38bdf8',
      emissiveIntensity: 0.4,
      roughness: 0.35
    });
    const matInstrument = new THREE.MeshStandardMaterial({
      color: '#67e8f9',
      emissive: '#0e7490',
      emissiveIntensity: 0.55,
      roughness: 0.3
    });
    const matImpact = new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      emissive: '#b45309',
      emissiveIntensity: 0.65,
      roughness: 0.4
    });
    const matSelected = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#22d3ee',
      emissiveIntensity: 1.2,
      roughness: 0.2
    });
    const matStem = new THREE.MeshBasicMaterial({ color: '#94a3b8' });

    let activeClusters: LocationCluster[] = [];
    const clickableHitMeshes: THREE.Mesh[] = [];
    let lastClusterSignature = '';

    const rebuildMarkerMeshes = (clusters: LocationCluster[]) => {
      const sig =
        clusters.map((c) => `${c.id}:${c.locations.length}`).join('|') +
        `|sel:${selectedIdRef.current ?? ''}`;
      if (sig === lastClusterSignature) return;
      lastClusterSignature = sig;

      while (markerGroup.children.length > 0) {
        markerGroup.remove(markerGroup.children[0]);
      }
      clickableHitMeshes.length = 0;

      const up = new THREE.Vector3(0, 1, 0);

      for (const cluster of clusters) {
        const pos = latLonToVector3(cluster.latitude, cluster.longitude, PLANET_RADIUS + 0.015);
        const normal = pos.clone().normalize();
        const holder = new THREE.Group();
        holder.position.copy(pos);
        holder.quaternion.setFromUnitVectors(up, normal);

        const isSelected =
          !cluster.isCluster && cluster.locations[0]?.id === selectedIdRef.current;

        if (cluster.isCluster) {
          const ring = new THREE.Mesh(clusterGeo, matRover);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 0.035;
          holder.add(ring);
        } else {
          const loc = cluster.locations[0];
          const category = getLocationMarkerCategory(loc, artifactsRef.current);

          const stem = new THREE.Mesh(pinGeo, matStem);
          stem.position.y = 0.045;
          holder.add(stem);

          const mat = isSelected
            ? matSelected
            : category === 'rover'
              ? matRover
              : category === 'lander'
                ? matLander
                : category === 'instrument'
                  ? matInstrument
                  : matImpact;

          if (category === 'rover') {
            const head = new THREE.Mesh(diamondGeo, mat);
            head.position.y = 0.1;
            holder.add(head);
          } else if (category === 'lander') {
            const head = new THREE.Mesh(hexGeo, mat);
            head.position.y = 0.09;
            holder.add(head);
          } else if (category === 'instrument') {
            const head = new THREE.Mesh(prismGeo, mat);
            head.position.y = 0.095;
            holder.add(head);
          } else {
            const head = new THREE.Mesh(ringGeo, mat);
            head.rotation.x = Math.PI / 2;
            head.position.y = 0.04;
            holder.add(head);
          }
        }

        const hitMesh = new THREE.Mesh(hitSphereGeo, hitMat);
        hitMesh.position.y = 0.06;
        hitMesh.userData.cluster = cluster;
        holder.add(hitMesh);
        clickableHitMeshes.push(hitMesh);

        markerGroup.add(holder);
      }
    };

    // Smooth camera fly-to target state
    let camTransitionActive = false;
    const camTargetPos = new THREE.Vector3();

    focusTriggerRef.current = (lat: number, lon: number, targetDist: number) => {
      latLonToVector3(lat, lon, targetDist, camTargetPos);
      camTransitionActive = true;
      requestRender();
    };

    resetTriggerRef.current = () => {
      const defLon = body === 'Moon' ? 18 : 85;
      latLonToVector3(12, defLon, DEFAULT_CAM_DIST, camTargetPos);
      camTransitionActive = true;
      requestRender();
    };

    // If entering with a preserved selectedLocationId, focus on it once immediately
    if (selectedIdRef.current) {
      const existing = locationsRef.current.find((l) => l.id === selectedIdRef.current);
      if (existing && existing.latitude !== null && existing.longitude !== null) {
        latLonToVector3(existing.latitude, existing.longitude, 4.3, camera.position);
        controls.update();
      }
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Cancel scripted camera fly-to when user grabs globe
    const onControlStart = () => {
      camTransitionActive = false;
    };
    controls.addEventListener('start', onControlStart);

    // Raycasting for markers
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let lastMoveCheck = 0;

    const handleClusterInteraction = (cluster: LocationCluster) => {
      if (cluster.isCluster) {
        const nextDist = Math.max(MIN_CAM_DIST + 0.35, camera.position.length() * 0.65);
        focusTriggerRef.current(cluster.latitude, cluster.longitude, nextDist);
      } else if (cluster.locations[0]) {
        const loc = cluster.locations[0];
        if (loc.latitude !== null && loc.longitude !== null) {
          focusTriggerRef.current(loc.latitude, loc.longitude, 4.15);
        }
        onSelectRef.current(loc);
      }
    };

    const getHitCluster = (clientX: number, clientY: number): LocationCluster | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableHitMeshes, false);
      if (hits.length > 0) {
        const cl = hits[0].object.userData.cluster as LocationCluster;
        // Verify point is on front hemisphere facing camera
        const markerWorldPos = new THREE.Vector3();
        hits[0].object.getWorldPosition(markerWorldPos);
        const toCam = camera.position.clone().sub(markerWorldPos).normalize();
        const surfNormal = markerWorldPos.clone().normalize();
        if (surfNormal.dot(toCam) > 0.08) {
          return cl;
        }
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMoveCheck < 45) return;
      lastMoveCheck = now;
      const cl = getHitCluster(e.clientX, e.clientY);
      const nextId = cl ? cl.id : null;
      if (nextId !== hoveredIdRef.current) {
        setHoveredClusterId(nextId);
      }
      renderer.domElement.style.cursor = cl ? 'pointer' : 'grab';
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: PointerEvent) => {
      renderer.domElement.style.cursor = 'grab';
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moved > 7) return;
      const cl = getHitCluster(e.clientX, e.clientY);
      if (cl) {
        handleClusterInteraction(cl);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // On-demand + damping render loop
    let frameId = 0;
    let disposed = false;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    const _pos = new THREE.Vector3();
    const _normal = new THREE.Vector3();
    const _toCam = new THREE.Vector3();
    const _proj = new THREE.Vector3();

    const updateProjectedLabels = () => {
      const w = renderer.domElement.clientWidth || width;
      const h = renderer.domElement.clientHeight || height;
      const camDist = camera.position.length();
      const nextMarkers: ProjectedMarker[] = [];

      for (const cluster of activeClusters) {
        latLonToVector3(cluster.latitude, cluster.longitude, PLANET_RADIUS + 0.14, _pos);
        _normal.copy(_pos).normalize();
        _toCam.copy(camera.position).sub(_pos).normalize();

        // Hide markers behind the planetary limb
        const facingDot = _normal.dot(_toCam);
        if (facingDot < 0.16) continue;

        _proj.copy(_pos).project(camera);
        if (_proj.z > 1) continue;

        const sx = ((_proj.x + 1) / 2) * w;
        const sy = ((-_proj.y + 1) / 2) * h;

        const isSelected =
          !cluster.isCluster && cluster.locations[0]?.id === selectedIdRef.current;
        const isHovered = cluster.id === hoveredIdRef.current;

        const category: MarkerCategory | 'cluster' = cluster.isCluster
          ? 'cluster'
          : getLocationMarkerCategory(cluster.locations[0], artifactsRef.current);

        // Keep viewport clean: show labels on clusters, selected/hovered markers, or when zoomed closer
        const showLabel =
          cluster.isCluster || isSelected || isHovered || camDist < 5.1;

        if (!showLabel && activeClusters.length > 10) {
          // Still project clickable pin dot without verbose text when far out
        }

        nextMarkers.push({
          id: cluster.id,
          x: sx,
          y: sy,
          isCluster: cluster.isCluster,
          label: cluster.isCluster
            ? `${cluster.locations.length} Sites`
            : cluster.locations[0].name.split('(')[0].trim(),
          sublabel: cluster.isCluster
            ? `${cluster.totalArtifacts} artifacts`
            : `${cluster.totalArtifacts} ${cluster.totalArtifacts === 1 ? 'artifact' : 'artifacts'}`,
          category,
          isSelected,
          isHovered,
          cluster
        });
      }

      setProjectedMarkers(nextMarkers);
    };

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

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const dt = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;

        // Sun illumination angle
        const az = THREE.MathUtils.degToRad(sunAzimuthRef.current);
        sunKey.position.set(Math.cos(az) * 9, 3.2, -Math.sin(az) * 9);
        if (surveyLightingRef.current) {
          sunKey.intensity = 1.85;
          hemiFill.intensity = 1.05;
          surveyAmbient.intensity = 0.72;
        } else {
          sunKey.intensity = 2.85;
          hemiFill.intensity = 0.38;
          surveyAmbient.intensity = 0.12;
        }

        // Smooth camera fly-to
        let stillAnimating = false;
        if (camTransitionActive) {
          if (prefersReducedMotion) {
            camera.position.copy(camTargetPos);
            camTransitionActive = false;
          } else {
            // Spherical slerp-like interpolation so camera arcs cleanly around planet instead of clipping through it
            const curDir = camera.position.clone().normalize();
            const tgtDir = camTargetPos.clone().normalize();
            const curLen = camera.position.length();
            const tgtLen = camTargetPos.length();
            const alpha = 1 - Math.exp(-5.5 * dt);

            curDir.lerp(tgtDir, alpha).normalize();
            const nextLen = THREE.MathUtils.lerp(curLen, tgtLen, alpha);
            camera.position.copy(curDir.multiplyScalar(nextLen));

            if (camera.position.distanceTo(camTargetPos) < 0.025) {
              camera.position.copy(camTargetPos);
              camTransitionActive = false;
            } else {
              stillAnimating = true;
            }
          }
        }

        const dampingMoved = controls.update();
        const camDist = camera.position.length();

        activeClusters = clusterLocationsByZoom(
          locationsRef.current,
          camDist,
          MIN_CAM_DIST,
          MAX_CAM_DIST
        );
        rebuildMarkerMeshes(activeClusters);

        if (onZoomChangeRef.current) {
          const pct = Math.round(
            (1 - (camDist - MIN_CAM_DIST) / (MAX_CAM_DIST - MIN_CAM_DIST)) * 100
          );
          onZoomChangeRef.current(THREE.MathUtils.clamp(pct, 0, 100));
        }

        renderer.render(scene, camera);
        updateProjectedLabels();

        const finish = () => {
          renderBusy = false;
          if (renderDirty || stillAnimating || (dampingMoved && !isSoftwareGl)) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(finish);
        } else {
          finish();
        }
      });
    }

    const onControlsChange = () => {
      requestRender();
    };
    controls.addEventListener('change', onControlsChange);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      requestRender();
    };
    window.addEventListener('resize', onResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    // Expose re-render trigger when props update
    (container as HTMLDivElement & { __requestRender?: () => void }).__requestRender = requestRender;
    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.removeEventListener('change', onControlsChange);
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      planetGeo.dispose();
      planetMat.dispose();
      texSet.map.dispose();
      texSet.bumpMap.dispose();
      texSet.roughnessMap.dispose();
      if (atmoMesh) {
        atmoMesh.geometry.dispose();
        (atmoMesh.material as THREE.Material).dispose();
      }
      gridGroup.traverse((obj) => {
        if (obj instanceof THREE.Line) obj.geometry.dispose();
      });
      gridMat.dispose();

      pinGeo.dispose();
      diamondGeo.dispose();
      hexGeo.dispose();
      prismGeo.dispose();
      ringGeo.dispose();
      clusterGeo.dispose();
      hitSphereGeo.dispose();
      hitMat.dispose();
      matRover.dispose();
      matLander.dispose();
      matInstrument.dispose();
      matImpact.dispose();
      matSelected.dispose();
      matStem.dispose();

      stars.geometry.dispose();
      (stars.material as THREE.Material).dispose();
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [body]);

  // Trigger render when lighting or selectedLocationId changes
  useEffect(() => {
    const el = mountRef.current as (HTMLDivElement & { __requestRender?: () => void }) | null;
    el?.__requestRender?.();
  }, [sunAzimuthDeg, surveyLighting, selectedLocationId, hoveredClusterId]);

  if (webglError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#060911] p-6">
        <div className="max-w-lg border border-white/10 bg-[#0d1320] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-medium text-white">
            3D WebGL Globe Unavailable — Coordinate Directory Fallback
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your browser could not initialize a 3D WebGL context. You can still select any verified{' '}
            {body} location below to open its full digital museum archive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className="text-left p-3 rounded-lg border border-white/10 bg-[#131b2c] hover:border-cyan-400/50 transition-colors"
              >
                <div className="text-sm font-medium text-slate-100 truncate">{loc.name}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {loc.artifactIds.length} documented{' '}
                  {loc.artifactIds.length === 1 ? 'artifact' : 'artifacts'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        ref={mountRef}
        className="w-full h-full select-none"
        aria-label={`Interactive 3D globe of ${body}`}
      />

      {/* Projected semantic marker overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {projectedMarkers.map((m) => {
          const showText = m.isCluster || m.isSelected || m.isHovered;
          const accentClass =
            m.category === 'impact'
              ? 'border-amber-400/60 text-amber-200'
              : m.isSelected
                ? 'border-cyan-400 text-white'
                : 'border-white/25 text-slate-100';

          return (
            <button
              key={m.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (m.isCluster) {
                  focusTriggerRef.current(m.cluster.latitude, m.cluster.longitude, 3.9);
                } else if (m.cluster.locations[0]) {
                  const loc = m.cluster.locations[0];
                  if (loc.latitude !== null && loc.longitude !== null) {
                    focusTriggerRef.current(loc.latitude, loc.longitude, 4.15);
                  }
                  onSelectLocation(loc);
                }
              }}
              onMouseEnter={() => setHoveredClusterId(m.id)}
              onMouseLeave={() => setHoveredClusterId(null)}
              style={{
                transform: `translate3d(${m.x}px, ${m.y}px, 0) translate(-50%, -100%)`
              }}
              className={`pointer-events-auto absolute top-0 left-0 -mt-2 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                showText ? 'z-20 opacity-100' : 'z-10 opacity-85 hover:opacity-100'
              }`}
              aria-label={`${m.label} (${m.sublabel})`}
            >
              {showText ? (
                <div
                  className={`px-2.5 py-1.5 rounded-md border bg-[#090d16]/92 shadow-lg text-left whitespace-nowrap ${accentClass}`}
                >
                  <div className="text-[11px] font-semibold tracking-wide leading-tight flex items-center gap-1.5">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-sm ${
                        m.category === 'impact'
                          ? 'bg-amber-400'
                          : m.category === 'rover'
                            ? 'bg-cyan-400'
                            : 'bg-slate-200'
                      }`}
                    />
                    <span>{m.label}</span>
                  </div>
                  <div className="text-[10px] font-mono-tabular text-slate-400 mt-0.5">
                    {m.sublabel}
                  </div>
                </div>
              ) : (
                <div className="px-1.5 py-0.5 rounded bg-[#090d16]/85 border border-white/15 text-[10px] font-medium text-slate-200 whitespace-nowrap hover:border-cyan-400/70">
                  {m.label}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
