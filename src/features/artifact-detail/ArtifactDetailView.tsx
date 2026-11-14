import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  MapPin
} from 'lucide-react';
import {
  Artifact,
  MissionRecord,
  PlanetaryLocation,
  SourceRecord
} from '../../types/space';
import { ArtifactSchematicScene } from '../../scenes/ArtifactSchematicScene';
import { formatCoordinates, formatLongitudeEast } from '../../utils/coordinates';

interface ArtifactDetailViewProps {
  artifact: Artifact;
  location: PlanetaryLocation | null;
  mission: MissionRecord | null;
  relatedArtifacts: Artifact[];
  sources: SourceRecord[];
  onBack: () => void;
  onOpenOnGlobe: (locationId: string) => void;
  onOpenLocation: (location: PlanetaryLocation) => void;
  onSelectArtifact: (artifact: Artifact) => void;
  onOpenMission: (missionId: string) => void;
}

export const ArtifactDetailView: React.FC<ArtifactDetailViewProps> = ({
  artifact,
  location,
  mission,
  relatedArtifacts,
  sources,
  onBack,
  onOpenOnGlobe,
  onOpenLocation,
  onSelectArtifact,
  onOpenMission
}) => {
  const hasCoords = artifact.latitude !== null && artifact.longitude !== null;

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#05070b] text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back</span>
        </button>

        {/* Artifact Header */}
        <header className="pb-8 border-b border-white/10">
          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mb-3">
            <span className="text-cyan-300 font-medium">{artifact.body}</span>
            <span aria-hidden="true">·</span>
            <span>{artifact.type}</span>
            <span aria-hidden="true">·</span>
            <span>{artifact.operator} ({artifact.country})</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">
              {artifact.landingDate ?? 'Date Unknown'}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]">
            {artifact.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="text-xs font-mono-tabular text-slate-300 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>
                {formatCoordinates(
                  artifact.latitude,
                  artifact.longitude,
                  artifact.coordinateConfidence
                )}
              </span>
            </div>

            {location && hasCoords && (
              <button
                type="button"
                onClick={() => onOpenOnGlobe(location.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-xs font-medium text-cyan-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Locate on 3D {artifact.body}</span>
              </button>
            )}

            {location && (
              <button
                type="button"
                onClick={() => onOpenLocation(location)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/15 bg-[#0e1420] hover:border-white/30 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>Open Location Archive</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </header>

        {/* Main 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
          {/* Left 7 cols: Schematic + Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <ArtifactSchematicScene
              schematicType={artifact.schematicType}
              body={artifact.body}
              caption={artifact.schematicCaption}
            />

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white">
                Purpose & Engineering Function
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                {artifact.purpose}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-prose">
                {artifact.engineeringFunction}
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-white/10">
              <h2 className="font-display text-2xl font-semibold text-white">
                Mission Journey
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                {artifact.missionJourney}
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-white/10">
              <h2 className="font-display text-2xl font-semibold text-white">
                Scientific & Historical Significance
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-prose">
                {artifact.significance}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-prose">
                {artifact.historicalImportance}
              </p>
              {artifact.scientificFindings ? (
                <div className="p-4 rounded-lg border border-white/10 bg-[#0b101b] text-sm text-slate-200 leading-relaxed">
                  <span className="text-xs uppercase tracking-wider text-cyan-300 block mb-1">
                    Documented Scientific Findings
                  </span>
                  {artifact.scientificFindings}
                </div>
              ) : (
                <div className="p-4 rounded-lg border border-white/10 bg-[#0b101b] text-xs text-slate-400">
                  No surface scientific dataset is recorded for this artifact (impact / failed descent / debris record).
                </div>
              )}
            </section>

            {artifact.notes && (
              <section className="space-y-2 pt-6 border-t border-white/10">
                <h2 className="font-display text-xl font-semibold text-white">
                  Verification & Uncertainty Notes
                </h2>
                <p className="text-sm text-amber-200/90 leading-relaxed max-w-prose">
                  {artifact.notes}
                </p>
              </section>
            )}
          </div>

          {/* Right 5 cols: Accession Spec Table + Related Hardware + Sources */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5">
              <h2 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-4">
                Artifact Accession Record
              </h2>
              <dl className="divide-y divide-white/10 text-xs">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Mission</dt>
                  <dd className="text-right text-slate-100 font-medium">
                    {mission ? (
                      <button
                        type="button"
                        onClick={() => onOpenMission(mission.id)}
                        className="text-cyan-300 hover:underline"
                      >
                        {artifact.mission}
                      </button>
                    ) : (
                      artifact.mission
                    )}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Operator / Country</dt>
                  <dd className="text-right text-slate-100">
                    {artifact.operator} · {artifact.country}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Artifact Type</dt>
                  <dd className="text-right text-slate-100">{artifact.type}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Outcome Class</dt>
                  <dd className="text-right text-slate-100">{artifact.outcomeCategory}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Current / Final Status</dt>
                  <dd
                    className={`text-right font-medium ${
                      artifact.outcomeCategory === 'Failed Landing'
                        ? 'text-amber-300'
                        : 'text-cyan-200'
                    }`}
                  >
                    {artifact.status}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Launch Date</dt>
                  <dd className="text-right text-slate-100 font-mono-tabular">
                    {artifact.launchDate ?? 'Unknown'}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Landing / Impact Date</dt>
                  <dd className="text-right text-slate-100 font-mono-tabular">
                    {artifact.landingDate ?? 'Unknown'}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Geographic Site</dt>
                  <dd className="text-right text-slate-100 max-w-[60%]">
                    {artifact.locationName ?? 'Unknown'}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-slate-400">Coordinates</dt>
                  <dd className="text-right text-slate-100 font-mono-tabular">
                    {formatCoordinates(
                      artifact.latitude,
                      artifact.longitude,
                      artifact.coordinateConfidence
                    )}
                  </dd>
                </div>
                {artifact.longitude !== null && (
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-400">Planetocentric East</dt>
                    <dd className="text-right text-slate-300 font-mono-tabular">
                      {formatLongitudeEast(artifact.longitude)}
                    </dd>
                  </div>
                )}
              </dl>

              {artifact.coordinateAccuracyNote && (
                <p className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed">
                  {artifact.coordinateAccuracyNote}
                </p>
              )}
            </div>

            {relatedArtifacts.length > 0 && (
              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
                <h2 className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Related Artifacts
                </h2>
                <div className="space-y-2">
                  {relatedArtifacts.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectArtifact(rel)}
                      className="w-full text-left p-3 rounded-lg border border-white/10 bg-[#111827] hover:border-cyan-400/50 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {rel.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {rel.mission} · {rel.type}
                        </div>
                      </div>
                      <ArrowRight
                        className="w-3.5 h-3.5 text-cyan-300 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Sources & Citations
              </h2>
              <div className="text-xs font-mono-tabular text-slate-300">
                Report Citations: {artifact.citationRefs.join(' · ')}
              </div>
              <ul className="space-y-2 pt-2 border-t border-white/10 text-xs">
                {sources.map((src) => (
                  <li key={src.id}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 inline-flex items-start gap-1.5"
                    >
                      <span>{src.title}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" aria-hidden="true" />
                    </a>
                    <div className="text-[11px] text-slate-400">{src.authorOrOrg}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
