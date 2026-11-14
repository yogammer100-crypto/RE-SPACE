import * as THREE from 'three';
import { CoordinateConfidence, PlanetaryLocation } from '../types/space';

/**
 * Normalizes any planetary longitude (0..360°E or -180..180°) into [-180, 180].
 */
export function normalizeLongitude(lon: number): number {
  let normalized = ((lon + 180) % 360 + 360) % 360 - 180;
  if (normalized === -180 && lon > 0) normalized = 180;
  return normalized;
}

/**
 * Formats coordinates clearly with confidence awareness.
 */
export function formatCoordinates(
  lat: number | null,
  lon: number | null,
  confidence: CoordinateConfidence
): string {
  if (lat === null || lon === null || confidence === 'unknown') {
    return 'Coordinates Unknown (Unpublished in extract)';
  }
  const normLon = normalizeLongitude(lon);
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = normLon >= 0 ? 'E' : 'W';
  const prefix = confidence === 'approximate' ? 'Approx. ' : '';
  return `${prefix}${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(normLon).toFixed(4)}° ${lonDir}`;
}

export function formatLongitudeEast(lon: number | null): string {
  if (lon === null) return 'Unknown';
  const east = ((lon % 360) + 360) % 360;
  return `${east.toFixed(4)}° E`;
}

/**
 * Converts planetocentric latitude/longitude to a 3D point on a sphere of given radius.
 * Matches Three.js SphereGeometry equirectangular UV orientation where (0°N, 0°E) is at +X.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
  target = new THREE.Vector3()
): THREE.Vector3 {
  const normLon = normalizeLongitude(lon);
  const latRad = THREE.MathUtils.degToRad(lat);
  const lonRad = THREE.MathUtils.degToRad(normLon);

  const cosLat = Math.cos(latRad);
  const x = radius * cosLat * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = -radius * cosLat * Math.sin(lonRad);

  return target.set(x, y, z);
}

/**
 * Great-circle angular distance in degrees between two planetary coordinates.
 */
export function angularDistanceDeg(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const p1 = THREE.MathUtils.degToRad(lat1);
  const p2 = THREE.MathUtils.degToRad(lat2);
  const dl = THREE.MathUtils.degToRad(normalizeLongitude(lon2) - normalizeLongitude(lon1));
  const cosAngle =
    Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(dl);
  return THREE.MathUtils.radToDeg(Math.acos(THREE.MathUtils.clamp(cosAngle, -1, 1)));
}

export interface LocationCluster {
  id: string;
  isCluster: boolean;
  label: string;
  latitude: number;
  longitude: number;
  locations: PlanetaryLocation[];
  totalArtifacts: number;
}

/**
 * Groups nearby PlanetaryLocations when camera is zoomed out to prevent marker clutter,
 * revealing individual locations automatically as the visitor zooms in.
 */
export function clusterLocationsByZoom(
  locations: PlanetaryLocation[],
  cameraDistance: number,
  minDist: number,
  maxDist: number
): LocationCluster[] {
  const located = locations.filter(
    (l): l is PlanetaryLocation & { latitude: number; longitude: number } =>
      l.latitude !== null && l.longitude !== null
  );

  // Normalized zoom ratio: 0 = closest, 1 = furthest
  const zoomT = THREE.MathUtils.clamp(
    (cameraDistance - minDist) / Math.max(0.001, maxDist - minDist),
    0,
    1
  );

  // Below threshold, show every individual site cleanly
  const mergeAngleDeg = zoomT < 0.35 ? 0 : THREE.MathUtils.lerp(4, 24, (zoomT - 0.35) / 0.65);

  if (mergeAngleDeg <= 0) {
    return located.map((loc) => ({
      id: loc.id,
      isCluster: false,
      label: loc.name,
      latitude: loc.latitude,
      longitude: loc.longitude,
      locations: [loc],
      totalArtifacts: loc.artifactIds.length
    }));
  }

  const visited = new Set<string>();
  const clusters: LocationCluster[] = [];

  for (const seed of located) {
    if (visited.has(seed.id)) continue;
    visited.add(seed.id);

    const group = [seed];
    for (const candidate of located) {
      if (visited.has(candidate.id)) continue;
      if (
        angularDistanceDeg(seed.latitude, seed.longitude, candidate.latitude, candidate.longitude) <=
        mergeAngleDeg
      ) {
        visited.add(candidate.id);
        group.push(candidate);
      }
    }

    if (group.length === 1) {
      clusters.push({
        id: seed.id,
        isCluster: false,
        label: seed.name,
        latitude: seed.latitude,
        longitude: seed.longitude,
        locations: group,
        totalArtifacts: seed.artifactIds.length
      });
    } else {
      // Average unit vectors for accurate spherical centroid
      const centroid = new THREE.Vector3();
      const tmp = new THREE.Vector3();
      for (const item of group) {
        latLonToVector3(item.latitude, item.longitude, 1, tmp);
        centroid.add(tmp);
      }
      centroid.normalize();
      const avgLat = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(centroid.y, -1, 1)));
      const avgLon = THREE.MathUtils.radToDeg(Math.atan2(-centroid.z, centroid.x));
      const totalArtifacts = group.reduce((sum, l) => sum + l.artifactIds.length, 0);

      clusters.push({
        id: `cluster-${group.map((g) => g.id).join('-')}`,
        isCluster: true,
        label: `${group.length} Sites (${totalArtifacts} artifacts)`,
        latitude: avgLat,
        longitude: avgLon,
        locations: group,
        totalArtifacts
      });
    }
  }

  return clusters;
}
