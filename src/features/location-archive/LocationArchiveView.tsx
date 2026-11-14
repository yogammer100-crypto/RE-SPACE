import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe,
  Image as ImageIcon,
  MapPin,
  Maximize2
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Artifact,
  MediaItem,
  MissionRecord,
  PlanetaryLocation,
  SourceRecord
} from '../../types/space';
import { formatCoordinates, formatLongitudeEast } from '../../utils/coordinates';
import { ArchivalImage, ArchivalLightbox } from '../../components/ArchivalImage';

type ArchiveTab =
  | 'OVERVIEW'
  | 'ARTIFACTS'
  | 'PHOTOGRAPHS'
  | 'MISSIONS'
  | 'SCIENCE'
  | 'DOCUMENTS'
  | 'TIMELINE';

interface LocationArchiveViewProps {
  location: PlanetaryLocation;
  artifacts: Artifact[];
  missions: MissionRecord[];
  sources: SourceRecord[];
  mediaItems: MediaItem[];
  artifactMediaMap: Record<string, MediaItem[]>;
  onBackToGlobe: () => void;
  onSelectArtifact: (artifact: Artifact) => void;
  onOpenMissionExplorer: (missionId: string) => void;
}

const TABS: ArchiveTab[] = [
  'OVERVIEW',
  'ARTIFACTS',
  'PHOTOGRAPHS',
  'MISSIONS',
  'SCIENCE',
  'DOCUMENTS',
  'TIMELINE'
];

export const LocationArchiveView: React.FC<LocationArchiveViewProps> = ({
  location,
  artifacts,
  missions,
  sources,
  mediaItems,
  artifactMediaMap,
  onBackToGlobe,
  onSelectArtifact,
  onOpenMissionExplorer
}) => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('OVERVIEW');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [heroBroken, setHeroBroken] = useState(false);

  const heroMedia =
    mediaItems.find((m) => m.isHeroCandidate) ?? mediaItems[0] ?? null;

  const coordText = formatCoordinates(
    location.latitude,
    location.longitude,
    location.coordinateConfidence
  );

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#05070b] text-slate-100">
      {/* Exhibition Hero Header */}
      <section className="relative border-b border-white/10 bg-[#080c14] overflow-hidden">
        {heroMedia && !heroBroken && (
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={heroMedia.url}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              onError={() => setHeroBroken(true)}
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/80 to-[#080c14]/55"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#080c14]/95 via-[#080c14]/70 to-transparent"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
              <span className="text-cyan-300 font-semibold uppercase tracking-wider">
                {location.body === 'Moon' ? 'The Moon' : 'Mars'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{location.regionType}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                {artifacts.length} Verified {artifacts.length === 1 ? 'Artifact' : 'Artifacts'}
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

            <div className="flex flex-wrap items-center gap-2.5">
              {heroMedia && !heroBroken && (
                <button
                  type="button"
                  onClick={() => setLightboxItem(heroMedia)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/20 bg-[#05070b]/80 hover:border-cyan-400/60 text-xs font-medium text-slate-200 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>Inspect Banner Photo</span>
                </button>
              )}

              <button
                type="button"
                onClick={onBackToGlobe}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/60 bg-cyan-400/12 hover:bg-cyan-400/22 text-xs font-medium text-cyan-100 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                <span>Return to 3D Globe Location</span>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white [text-wrap:balance] max-w-4xl">
              {location.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-200 font-mono-tabular">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>{coordText}</span>
              </span>
              {location.longitude !== null && (
                <span className="text-slate-300">
                  East Longitude: {formatLongitudeEast(location.longitude)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
              {location.historicalIntro}
            </p>

            {heroMedia && !heroBroken && (
              <div className="mt-5 pt-4 border-t border-white/10 text-[11px] font-mono-tabular text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Camera className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                <span className="text-cyan-300 font-sans uppercase tracking-wider font-semibold">
                  {heroMedia.mediaClass}
                </span>
                <span aria-hidden="true">·</span>
                <span>{heroMedia.title}</span>
                <span aria-hidden="true">·</span>
                <span>{heroMedia.agency} ({heroMedia.catalogId})</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Section Tabs */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <div
            role="tablist"
            aria-label="Location Archive Sections"
            className="flex items-center gap-1 overflow-x-auto border-t border-white/10 pt-1"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab;
              const badgeCount =
                tab === 'ARTIFACTS'
                  ? artifacts.length
                  : tab === 'PHOTOGRAPHS'
                    ? mediaItems.length
                    : null;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-3 text-xs font-medium tracking-wider border-b-2 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 ${
                    active
                      ? 'border-cyan-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{tab}</span>
                  {badgeCount !== null && (
                    <span className="font-mono-tabular text-[10px] text-slate-400">
                      ({badgeCount})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Archive Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Archival Photography Strip */}
              {mediaItems.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-cyan-300 font-medium">
                        Historical Evidence
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-0.5">
                        Archival Mission Photography
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('PHOTOGRAPHS')}
                      className="text-xs text-cyan-300 hover:text-cyan-200 font-medium whitespace-nowrap"
                    >
                      Open gallery ({mediaItems.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mediaItems.slice(0, 2).map((item) => (
                      <ArchivalImage
                        key={item.id}
                        item={item}
                        aspectClass="aspect-[16/10]"
                        compact
                        onInspect={setLightboxItem}
                      />
                    ))}
                  </div>
                </section>
              )}

              <section className={mediaItems.length > 0 ? 'pt-8 border-t border-white/10' : ''}>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
                  Geographic & Terrain Context
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                  {location.terrainSummary}
                </p>
                <p className="mt-3 text-xs font-mono-tabular text-slate-400">
                  Coordinate Verification: {location.coordinateNote}
                </p>
              </section>

              <section className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                    Documented Surface Hardware
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ARTIFACTS')}
                    className="text-xs text-cyan-300 hover:text-cyan-200 font-medium"
                  >
                    View all ({artifacts.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {artifacts.map((art) => {
                    const thumb = artifactMediaMap[art.id]?.[0] ?? null;
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => onSelectArtifact(art)}
                        className="w-full text-left p-4 rounded-xl border border-white/10 bg-[#0b101b] hover:border-cyan-400/55 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {thumb && (
                            <img
                              src={thumb.url}
                              alt={thumb.alt}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-16 h-12 sm:w-20 sm:h-14 rounded-md object-cover border border-white/10 shrink-0 bg-[#060910]"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="text-sm sm:text-base font-semibold text-white truncate">
                              {art.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-2">
                              <span className="text-cyan-300">{art.type}</span>
                              <span aria-hidden="true">·</span>
                              <span>{art.mission}</span>
                              <span aria-hidden="true">·</span>
                              <span
                                className={
                                  art.outcomeCategory === 'Failed Landing'
                                    ? 'text-amber-300'
                                    : 'text-slate-300'
                                }
                              >
                                {art.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight
                          className="w-4 h-4 text-cyan-300 shrink-0"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Site Scientific Takeaways */}
              <section className="pt-8 border-t border-white/10 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Scientific Findings
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                  {location.scientificOverview}
                </p>
                <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside leading-relaxed">
                  {location.experimentsAndFindings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-4">
                <h3 className="text-xs tracking-wider uppercase text-slate-400 font-medium">
                  Site Accession Summary
                </h3>
                <dl className="space-y-3 text-xs border-t border-white/10 pt-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Celestial Body</dt>
                    <dd className="text-slate-100 font-medium">{location.body}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Confidence</dt>
                    <dd className="text-slate-100 capitalize">
                      {location.coordinateConfidence}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Missions</dt>
                    <dd className="text-slate-100 font-mono-tabular">{missions.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Artifacts</dt>
                    <dd className="text-slate-100 font-mono-tabular">{artifacts.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Archival Photographs</dt>
                    <dd className="text-slate-100 font-mono-tabular">{mediaItems.length}</dd>
                  </div>
                </dl>
              </div>

              {location.timeline.length > 0 && (
                <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs tracking-wider uppercase text-slate-400 font-medium">
                      Key Dates
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('TIMELINE')}
                      className="text-[11px] text-cyan-300 hover:text-cyan-200"
                    >
                      Full timeline
                    </button>
                  </div>
                  <ol className="space-y-3 border-t border-white/10 pt-3">
                    {location.timeline.slice(0, 3).map((ev, idx) => (
                      <li key={idx} className="space-y-0.5 text-xs">
                        <div className="font-mono-tabular text-cyan-300">{ev.date}</div>
                        <div className="font-medium text-slate-100">{ev.title}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
                <h3 className="text-xs tracking-wider uppercase text-slate-400 font-medium">
                  Verified Source Attribution
                </h3>
                <ul className="space-y-2.5 text-xs">
                  {sources.map((src) => (
                    <li
                      key={src.id}
                      className="border-t border-white/5 pt-2 first:border-0 first:pt-0"
                    >
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 inline-flex items-start gap-1.5 leading-snug"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" aria-hidden="true" />
                      </a>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {src.authorOrOrg} · {src.citationTag}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'ARTIFACTS' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                Artifacts at {location.name}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Select any object to examine its authentic mission photography, 3D technical schematic, and verified accession record.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {artifacts.map((art) => {
                const artPhoto = artifactMediaMap[art.id]?.[0] ?? null;
                return (
                  <div
                    key={art.id}
                    className="border border-white/10 bg-[#0b101b] rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    {artPhoto && (
                      <div className="relative aspect-[16/9] bg-[#060910] border-b border-white/10 overflow-hidden">
                        <img
                          src={artPhoto.url}
                          alt={artPhoto.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-[#05070b]/88 border border-white/15 text-[10px] font-mono-tabular text-cyan-200">
                          {artPhoto.mediaClass} · {artPhoto.catalogId}
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                          <span className="text-cyan-300">{art.type}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.operator}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {art.landingDate ?? 'Date Unknown'}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mt-2">
                          {art.name}
                        </h3>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                          {art.purpose}
                        </p>
                        <div className="mt-3 text-xs font-mono-tabular text-slate-400">
                          {formatCoordinates(
                            art.latitude,
                            art.longitude,
                            art.coordinateConfidence
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-300">
                          Status: <strong className="font-medium text-white">{art.status}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectArtifact(art)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                        >
                          <span>Open Artifact Record</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'PHOTOGRAPHS' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                Photographs & Visual Evidence
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Official surface photographs and orbital reconnaissance images from agency archives. Every plate lists its catalog ID, capture date, and explicit classification so authentic photography is never confused with illustrations or 3D schematics.
              </p>
            </div>

            {mediaItems.length === 0 ? (
              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-6 space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                  <ImageIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>No site-specific archival photographs are bundled locally for this location.</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To preserve strict historical provenance, RE:SPACE never substitutes stock images or unverified renders as site photographs. Consult the official agency repositories below for original orbital survey plates and mission logs:
                </p>
                <div className="pt-2 space-y-2 border-t border-white/10">
                  {sources.map((src) => (
                    <a
                      key={src.id}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-[#111827] hover:border-cyan-400/50 text-xs text-cyan-300 transition-colors"
                    >
                      <span>
                        {src.authorOrOrg} — {src.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaItems.map((item) => (
                  <ArchivalImage
                    key={item.id}
                    item={item}
                    aspectClass="aspect-[16/10]"
                    onInspect={setLightboxItem}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'MISSIONS' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Connected Mission Histories
            </h2>
            <div className="space-y-4">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className="border border-white/10 bg-[#0b101b] rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{m.operator}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{m.arrivalDate ?? m.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{m.outcome}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mt-1">{m.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenMissionExplorer(m.id)}
                      className="text-xs font-medium text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1"
                    >
                      <span>View in Mission Explorer</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-prose">
                    {m.overview}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider mb-1.5">
                        Objectives
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {m.objectives.map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider mb-1.5">
                        Major Events
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {m.majorEvents.map((ev, idx) => (
                          <li key={idx}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'SCIENCE' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Scientific Records & Significance
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {location.scientificOverview}
            </p>
            <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-300 font-medium">
                <FlaskConical className="w-4 h-4" aria-hidden="true" />
                <span>Documented Experiments & Findings</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-200 list-disc list-inside leading-relaxed">
                {location.experimentsAndFindings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'DOCUMENTS' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Verified Documentary Records
            </h2>
            {location.documents.length === 0 ? (
              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-6 space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                  <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>Additional records not yet available.</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No standalone site-specific press kit or report file is bundled for this location beyond the primary Research Report and catalog entries listed in Sources.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {location.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-2"
                  >
                    <div className="text-xs text-slate-400 flex flex-wrap gap-x-2">
                      <span className="text-cyan-300">{doc.documentType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{doc.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{doc.date ?? 'Date Unknown'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">Ref: {doc.citationRef}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{doc.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{doc.summary}</p>
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 pt-1"
                      >
                        <span>Open External / Reference Document</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'TIMELINE' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Chronological Site Timeline
            </h2>
            <ol className="relative border-l border-white/15 pl-6 space-y-6 ml-2">
              {location.timeline.map((ev, idx) => (
                <li
                  key={idx}
                  className="relative p-5 rounded-xl border border-white/10 bg-[#0b101b] space-y-1.5"
                >
                  <span
                    className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-[#05070b]"
                    aria-hidden="true"
                  />
                  <div className="text-xs font-mono-tabular text-cyan-300">{ev.date}</div>
                  <h3 className="text-base font-semibold text-white">{ev.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{ev.description}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onBackToGlobe}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to {location.body === 'Moon' ? 'The Moon' : 'Mars'} 3D Globe</span>
          </button>
        </div>
      </main>

      <ArchivalLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
};
