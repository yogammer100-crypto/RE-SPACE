import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Artifact,
  MediaItem,
  MissionRecord,
  PlanetaryLocation,
  SourceRecord
} from '../../types/space';
import { ArtifactSchematicScene } from '../../scenes/ArtifactSchematicScene';
import { ArchivalImage, ArchivalLightbox } from '../../components/ArchivalImage';
import { formatCoordinates, formatLongitudeEast } from '../../utils/coordinates';

interface ArtifactDetailViewProps {
  artifact: Artifact;
  location: PlanetaryLocation | null;
  mission: MissionRecord | null;
  mediaItems: MediaItem[];
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
  mediaItems,
  relatedArtifacts,
  sources,
  onBack,
  onOpenOnGlobe,
  onOpenLocation,
  onSelectArtifact,
  onOpenMission
}) => {
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [visualMode, setVisualMode] = useState<'gallery' | 'schematic'>(
    mediaItems.length > 0 ? 'gallery' : 'schematic'
  );

  const hasCoords = artifact.latitude !== null && artifact.longitude !== null;
  const primaryPhoto = mediaItems[0] ?? null;

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
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pb-8 border-b border-white/10"
        >
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
            {mediaItems.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular text-cyan-200">
                  {mediaItems.length} Archival {mediaItems.length === 1 ? 'Plate' : 'Plates'}
                </span>
              </>
            )}
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
        </motion.header>

        {/* Main 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
          {/* Left 7 cols: Visual Exhibition (Authentic Photography vs 3D Schematic) + Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Explicit Visual Evidence vs 3D Technical Schematic Switcher / Paired Exhibition */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>Visual Documentation & Schematic</span>
                </div>

                <div
                  role="tablist"
                  aria-label="Artifact visual mode"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0b101b] border border-white/10"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={visualMode === 'gallery'}
                    onClick={() => setVisualMode('gallery')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      visualMode === 'gallery'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Archival Photography ({mediaItems.length})
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={visualMode === 'schematic'}
                    onClick={() => setVisualMode('schematic')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      visualMode === 'schematic'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    3D Technical Schematic
                  </button>
                </div>
              </div>

              {visualMode === 'gallery' ? (
                mediaItems.length > 0 ? (
                  <div className="space-y-4">
                    {primaryPhoto && (
                      <ArchivalImage
                        item={primaryPhoto}
                        aspectClass="aspect-[16/10]"
                        onInspect={setLightboxItem}
                      />
                    )}
                    {mediaItems.length > 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mediaItems.slice(1).map((item) => (
                          <ArchivalImage
                            key={item.id}
                            item={item}
                            aspectClass="aspect-[16/10]"
                            compact
                            onInspect={setLightboxItem}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-white/10 bg-[#0b101b] rounded-xl p-6 space-y-3">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                      <ImageIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      <span>
                        No verified surface or orbital plate is bundled locally for this record.
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Many early impactors, failed descent probes, and dispersed hardware fragments were never photographed directly on the surface or have not been resolved cleanly in public orbital surveys. To preserve historical accuracy, RE:SPACE never invents photographs—switch to the interactive{' '}
                      <button
                        type="button"
                        onClick={() => setVisualMode('schematic')}
                        className="text-cyan-300 hover:underline font-medium"
                      >
                        3D Technical Schematic Illustration
                      </button>{' '}
                      or inspect the official source citations in the sidebar.
                    </p>
                  </div>
                )
              ) : (
                <ArtifactSchematicScene
                  schematicType={artifact.schematicType}
                  body={artifact.body}
                  caption={artifact.schematicCaption}
                />
              )}

              {/* When viewing Gallery with photos available, always offer immediate secondary access to the 3D schematic below if user wants both, or keep clean toggle + subtle schematic preview card */}
              {visualMode === 'gallery' && mediaItems.length > 0 && (
                <div className="pt-2">
                  <ArtifactSchematicScene
                    schematicType={artifact.schematicType}
                    body={artifact.body}
                    caption={artifact.schematicCaption}
                  />
                </div>
              )}
            </section>

            <section className="space-y-3 pt-4 border-t border-white/10">
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

            {mission && mission.majorEvents.length > 0 && (
              <section className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-white">
                    Mission Chronology Highlights
                  </h2>
                  <button
                    type="button"
                    onClick={() => onOpenMission(mission.id)}
                    className="text-xs text-cyan-300 hover:text-cyan-200 font-medium"
                  >
                    Open {mission.name} Record
                  </button>
                </div>
                <ol className="relative border-l border-white/15 pl-5 space-y-3 ml-1.5">
                  {mission.majorEvents.map((evt, idx) => (
                    <li key={idx} className="relative text-sm text-slate-300 leading-relaxed">
                      <span
                        className="absolute -left-[25px] top-2 w-2 h-2 rounded-full bg-cyan-400/80 ring-4 ring-[#05070b]"
                        aria-hidden="true"
                      />
                      {evt}
                    </li>
                  ))}
                </ol>
              </section>
            )}

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

          {/* Right 5 cols: Accession Spec Table + Location Context + Related Hardware + Sources */}
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

            {location && (
              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Landing Site Context
                </div>
                <div className="text-sm font-semibold text-white">{location.name}</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {location.terrainSummary}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenLocation(location)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    <span>Explore {location.name} Exhibition</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

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

      <ArchivalLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
};
