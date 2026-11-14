import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe,
  Image as ImageIcon,
  MapPin
} from 'lucide-react';
import {
  Artifact,
  MissionRecord,
  PlanetaryLocation,
  SourceRecord
} from '../../types/space';
import { formatCoordinates, formatLongitudeEast } from '../../utils/coordinates';

type ArchiveTab =
  | 'OVERVIEW'
  | 'ARTIFACTS'
  | 'MISSIONS'
  | 'DOCUMENTS'
  | 'PHOTOGRAPHS'
  | 'SCIENCE'
  | 'TIMELINE';

interface LocationArchiveViewProps {
  location: PlanetaryLocation;
  artifacts: Artifact[];
  missions: MissionRecord[];
  sources: SourceRecord[];
  onBackToGlobe: () => void;
  onSelectArtifact: (artifact: Artifact) => void;
  onOpenMissionExplorer: (missionId: string) => void;
}

const TABS: ArchiveTab[] = [
  'OVERVIEW',
  'ARTIFACTS',
  'MISSIONS',
  'DOCUMENTS',
  'PHOTOGRAPHS',
  'SCIENCE',
  'TIMELINE'
];

export const LocationArchiveView: React.FC<LocationArchiveViewProps> = ({
  location,
  artifacts,
  missions,
  sources,
  onBackToGlobe,
  onSelectArtifact,
  onOpenMissionExplorer
}) => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('OVERVIEW');

  const coordText = formatCoordinates(
    location.latitude,
    location.longitude,
    location.coordinateConfidence
  );

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#05070b] text-slate-100">
      {/* Editorial Location Header */}
      <section className="border-b border-white/10 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
              <span className="text-cyan-300 font-medium">
                {location.body === 'Moon' ? 'The Moon' : 'Mars'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{location.regionType}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                {artifacts.length} Verified {artifacts.length === 1 ? 'Artifact' : 'Artifacts'}
              </span>
            </div>

            <button
              type="button"
              onClick={onBackToGlobe}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-xs font-medium text-cyan-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Return to 3D Globe Location</span>
            </button>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]">
            {location.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 font-mono-tabular">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>{coordText}</span>
            </span>
            {location.longitude !== null && (
              <span className="text-slate-400">
                East Longitude: {formatLongitudeEast(location.longitude)}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {location.historicalIntro}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div
            role="tablist"
            aria-label="Location Archive Sections"
            className="flex items-center gap-1 overflow-x-auto border-t border-white/10 pt-1"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-3 text-xs font-medium tracking-wider border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-cyan-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
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
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white mb-3">
                  Geographic & Terrain Context
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                  {location.terrainSummary}
                </p>
                <p className="mt-3 text-xs font-mono-tabular text-slate-400">
                  Coordinate Verification: {location.coordinateNote}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-semibold text-white">
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
                  {artifacts.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onSelectArtifact(art)}
                      className="w-full text-left p-4 rounded-lg border border-white/10 bg-[#0b101b] hover:border-cyan-400/50 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {art.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-2">
                          <span>{art.type}</span>
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
                      <ArrowRight
                        className="w-4 h-4 text-cyan-300 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
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
                </dl>
              </div>

              <div className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-3">
                <h3 className="text-xs tracking-wider uppercase text-slate-400 font-medium">
                  Verified Source Attribution
                </h3>
                <ul className="space-y-2.5 text-xs">
                  {sources.map((src) => (
                    <li key={src.id} className="border-t border-white/5 pt-2 first:border-0 first:pt-0">
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
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-white">
              Artifacts at {location.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artifacts.map((art) => (
                <div
                  key={art.id}
                  className="border border-white/10 bg-[#0b101b] rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                      <span className="text-cyan-300">{art.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.operator}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{art.landingDate ?? 'Date Unknown'}</span>
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
              ))}
            </div>
          </div>
        )}

        {activeTab === 'MISSIONS' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white">
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

        {activeTab === 'DOCUMENTS' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-white">
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

        {activeTab === 'PHOTOGRAPHS' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-white">
              Photographs & Visual Records
            </h2>
            <div className="border border-white/10 bg-[#0b101b] rounded-xl p-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                <ImageIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Additional photographic records not yet available in local archive.</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                To maintain strict provenance and avoid unverified imagery, RE:SPACE does not fabricate or substitute archival surface or orbital photographs. Official mission photography and orbital verification mosaics for this location can be consulted directly via the verified agency repositories below:
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
          </div>
        )}

        {activeTab === 'SCIENCE' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-white">
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

        {activeTab === 'TIMELINE' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-white">
              Chronological Site Timeline
            </h2>
            <ol className="space-y-4 border-t border-white/10 pt-4">
              {location.timeline.map((ev, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-lg border border-white/10 bg-[#0b101b] space-y-1.5"
                >
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
    </div>
  );
};
