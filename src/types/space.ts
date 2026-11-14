export type CelestialBody = 'Moon' | 'Mars';

export type ArtifactType =
  | 'Lander'
  | 'Rover'
  | 'Scientific Instrument'
  | 'Descent Stage'
  | 'Debris Field'
  | 'Impact Site'
  | 'Surface Hardware';

export type OutcomeCategory =
  | 'Successful Landing'
  | 'Deliberate Impact'
  | 'Failed Landing';

export type CoordinateConfidence = 'confirmed' | 'approximate' | 'unknown';

export type ArtifactStatus =
  | 'Operational'
  | 'Passive Operational'
  | 'Inert on surface'
  | 'Crashed/Destroyed'
  | 'Impacted (Planned)';

export type SchematicType =
  | 'lm-descent'
  | 'rover-wheeled'
  | 'lander-stationary'
  | 'instrument-package'
  | 'impact-site'
  | 'helicopter'
  | 'debris-field';

export interface SourceRecord {
  id: string;
  title: string;
  authorOrOrg: string;
  publicationDate: string | null;
  documentType:
    | 'Research Report'
    | 'Coordinate Catalog'
    | 'Mission Press Kit'
    | 'Official Agency Release'
    | 'Scientific Summary';
  relatedBody: CelestialBody | 'Both';
  relatedMissions: string[];
  relatedArtifactIds?: string[];
  url: string;
  isLocalAsset?: boolean;
  citationTag: string;
  description: string;
}

export interface FactCheckNote {
  id: string;
  subject: string;
  claimReviewed: string;
  verifiedFinding: string;
  citationRef: string;
  status: 'Corrected' | 'Confirmed' | 'Flagged Uncertainty';
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  sourceIds: string[];
}

export interface DocumentaryReference {
  title: string;
  documentType: string;
  organization: string;
  date: string | null;
  url: string | null;
  citationRef: string;
  summary: string;
}

export interface Artifact {
  id: string;
  name: string;
  missionId: string;
  mission: string;
  operator: string;
  country: string;
  launchDate: string | null;
  landingDate: string | null;
  body: CelestialBody;
  locationId: string | null;
  locationName: string | null;
  latitude: number | null;
  longitude: number | null;
  coordinateConfidence: CoordinateConfidence;
  coordinateAccuracyNote: string | null;
  type: ArtifactType;
  outcomeCategory: OutcomeCategory;
  purpose: string;
  engineeringFunction: string;
  missionJourney: string;
  status: ArtifactStatus;
  notes: string;
  significance: string;
  historicalImportance: string;
  scientificFindings: string | null;
  schematicType: SchematicType;
  schematicCaption: string;
  relatedArtifacts: string[];
  sources: string[];
  citationRefs: string[];
}

export interface PlanetaryLocation {
  id: string;
  name: string;
  body: CelestialBody;
  regionType: string;
  latitude: number | null;
  longitude: number | null;
  coordinateConfidence: CoordinateConfidence;
  coordinateNote: string;
  terrainSummary: string;
  historicalIntro: string;
  scientificOverview: string;
  experimentsAndFindings: string[];
  artifactIds: string[];
  missionIds: string[];
  documents: DocumentaryReference[];
  timeline: TimelineEvent[];
  sourceIds: string[];
}

export interface MissionRecord {
  id: string;
  name: string;
  body: CelestialBody;
  operator: string;
  country: string;
  launchDate: string | null;
  arrivalDate: string | null;
  year: number;
  outcome: OutcomeCategory;
  statusSummary: string;
  overview: string;
  objectives: string[];
  majorEvents: string[];
  locationId: string | null;
  locationName: string | null;
  hasConfirmedCoordinates: boolean;
  artifactIds: string[];
  sourceIds: string[];
  uncertaintyNote: string | null;
}

export interface ScienceTopic {
  id: string;
  category: string;
  title: string;
  summary: string;
  generalPrinciple: string;
  missionSpecificContext: string;
  relatedMissionIds: string[];
  sourceIds: string[];
}

export type AppView =
  | 'home'
  | 'planet'
  | 'location'
  | 'artifact'
  | 'missions'
  | 'archive'
  | 'science'
  | 'sources';

export type MediaClass =
  | 'Surface Photograph'
  | 'Orbital Reconnaissance'
  | 'Spacecraft Photograph'
  | 'Official Agency Illustration';

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  sourcePageUrl: string;
  agency: string;
  catalogId: string;
  date: string | null;
  mediaClass: MediaClass;
  caption: string;
  alt: string;
  body: CelestialBody;
  locationIds: string[];
  artifactIds: string[];
  isHeroCandidate?: boolean;
}

