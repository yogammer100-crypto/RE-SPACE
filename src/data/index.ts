import { MOON_ARTIFACTS } from './moonArtifacts';
import { MARS_ARTIFACTS } from './marsArtifacts';
import { LOCATIONS } from './locations';
import { MISSIONS } from './missions';
import { SOURCES, FACT_CHECK_NOTES, RESEARCH_REPORT_URL } from './sources';
import { SCIENCE_TOPICS } from './scienceTopics';
import {
  ARCHIVAL_MEDIA,
  getHeroMediaForLocation,
  getMediaCountByBody,
  getMediaForArtifact,
  getMediaForLocation
} from './media';
import { Artifact, CelestialBody, MissionRecord, PlanetaryLocation, SourceRecord } from '../types/space';

export const ALL_ARTIFACTS: Artifact[] = [...MOON_ARTIFACTS, ...MARS_ARTIFACTS];

export {
  MOON_ARTIFACTS,
  MARS_ARTIFACTS,
  LOCATIONS,
  MISSIONS,
  SOURCES,
  FACT_CHECK_NOTES,
  SCIENCE_TOPICS,
  RESEARCH_REPORT_URL,
  ARCHIVAL_MEDIA,
  getMediaForLocation,
  getMediaForArtifact,
  getHeroMediaForLocation,
  getMediaCountByBody
};

export function getArtifactsByBody(body: CelestialBody): Artifact[] {
  return ALL_ARTIFACTS.filter((a) => a.body === body);
}

export function getLocationsByBody(body: CelestialBody): PlanetaryLocation[] {
  return LOCATIONS.filter((l) => l.body === body);
}

export function getUnlocatedArtifactsByBody(body: CelestialBody): Artifact[] {
  return ALL_ARTIFACTS.filter(
    (a) => a.body === body && (a.latitude === null || a.longitude === null)
  );
}

export function getLocationById(id: string): PlanetaryLocation | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function getArtifactById(id: string): Artifact | undefined {
  return ALL_ARTIFACTS.find((a) => a.id === id);
}

export function getMissionById(id: string): MissionRecord | undefined {
  return MISSIONS.find((m) => m.id === id);
}

export function getSourceById(id: string): SourceRecord | undefined {
  return SOURCES.find((s) => s.id === id);
}

export function getArtifactsForLocation(locationId: string): Artifact[] {
  const loc = getLocationById(locationId);
  if (!loc) return [];
  return loc.artifactIds
    .map((aid) => getArtifactById(aid))
    .filter((a): a is Artifact => Boolean(a));
}

export function getMissionsForLocation(locationId: string): MissionRecord[] {
  const loc = getLocationById(locationId);
  if (!loc) return [];
  return loc.missionIds
    .map((mid) => getMissionById(mid))
    .filter((m): m is MissionRecord => Boolean(m));
}
