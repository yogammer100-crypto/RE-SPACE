import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Clock,
  Globe,
  Search
} from 'lucide-react';
import {
  Artifact,
  CelestialBody,
  MissionRecord,
  OutcomeCategory
} from '../../types/space';

interface MissionExplorerViewProps {
  missions: MissionRecord[];
  artifactsById: Record<string, Artifact>;
  initialMissionId?: string | null;
  onSelectArtifact: (artifact: Artifact) => void;
  onNavigateToGlobeLocation: (body: CelestialBody, locationId: string) => void;
}

export const MissionExplorerView: React.FC<MissionExplorerViewProps> = ({
  missions,
  artifactsById,
  initialMissionId = null,
  onSelectArtifact,
  onNavigateToGlobeLocation
}) => {
  const [query, setQuery] = useState('');
  const [bodyFilter, setBodyFilter] = useState<'All' | CelestialBody>('All');
  const [operatorFilter, setOperatorFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState<'All' | OutcomeCategory>('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'catalog' | 'timeline'>('catalog');
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(
    initialMissionId ?? missions[0]?.id ?? null
  );

  const operators = useMemo(
    () => Array.from(new Set(missions.map((m) => m.operator))).sort(),
    [missions]
  );

  const years = useMemo(
    () => Array.from(new Set(missions.map((m) => m.year))).sort((a, b) => a - b),
    [missions]
  );

  const filteredMissions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return missions
      .filter((m) => {
        if (bodyFilter !== 'All' && m.body !== bodyFilter) return false;
        if (operatorFilter !== 'All' && m.operator !== operatorFilter) return false;
        if (outcomeFilter !== 'All' && m.outcome !== outcomeFilter) return false;
        if (yearFilter !== 'All' && String(m.year) !== yearFilter) return false;
        if (!q) return true;
        return (
          m.name.toLowerCase().includes(q) ||
          m.operator.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q) ||
          (m.locationName ?? '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.year - b.year);
  }, [missions, query, bodyFilter, operatorFilter, outcomeFilter, yearFilter]);

  const activeMission = useMemo(
    () =>
      filteredMissions.find((m) => m.id === selectedMissionId) ??
      filteredMissions[0] ??
      null,
    [filteredMissions, selectedMissionId]
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#05070b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-cyan-300 font-medium">
              Mission Explorer · 1959–2023
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mt-2">
              Surface Missions & Chronology
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Browse verified robotic and crewed surface missions across the Moon and Mars. Orbiters without surface impact and unflown future programs are excluded from surface artifact counts.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0b101b] border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('catalog')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                viewMode === 'catalog'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Mission Index
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                viewMode === 'timeline'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Chronological Timeline
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative lg:col-span-2">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search missions, agencies, regions..."
              aria-label="Search missions"
              className="w-full pl-9 pr-3 py-2.5 rounded-md border border-white/15 bg-[#0b101b] text-xs text-white placeholder:text-slate-500 focus:outline-2 focus:outline-cyan-400"
            />
          </div>

          <select
            aria-label="Filter by world"
            value={bodyFilter}
            onChange={(e) => setBodyFilter(e.target.value as 'All' | CelestialBody)}
            className="px-3 py-2.5 rounded-md border border-white/15 bg-[#0b101b] text-xs text-slate-100"
          >
            <option value="All">All Worlds (Moon & Mars)</option>
            <option value="Moon">The Moon</option>
            <option value="Mars">Mars</option>
          </select>

          <select
            aria-label="Filter by operator"
            value={operatorFilter}
            onChange={(e) => setOperatorFilter(e.target.value)}
            className="px-3 py-2.5 rounded-md border border-white/15 bg-[#0b101b] text-xs text-slate-100"
          >
            <option value="All">All Operators</option>
            {operators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <select
              aria-label="Filter by outcome"
              value={outcomeFilter}
              onChange={(e) =>
                setOutcomeFilter(e.target.value as 'All' | OutcomeCategory)
              }
              className="px-2.5 py-2.5 rounded-md border border-white/15 bg-[#0b101b] text-xs text-slate-100"
            >
              <option value="All">All Outcomes</option>
              <option value="Successful Landing">Successful Landing</option>
              <option value="Deliberate Impact">Deliberate Impact</option>
              <option value="Failed Landing">Failed Landing</option>
            </select>

            <select
              aria-label="Filter by year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-2.5 py-2.5 rounded-md border border-white/15 bg-[#0b101b] text-xs text-slate-100 font-mono-tabular"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'catalog' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left List */}
            <div className="lg:col-span-5 space-y-2 max-h-[68vh] overflow-y-auto pr-1">
              {filteredMissions.length === 0 ? (
                <div className="p-6 border border-white/10 rounded-xl bg-[#0b101b] text-sm text-slate-400">
                  No missions match the selected filters.
                </div>
              ) : (
                filteredMissions.map((m) => {
                  const selected = activeMission?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMissionId(m.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selected
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-white/10 bg-[#0b101b] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                        <span>
                          {m.body} · {m.operator}
                        </span>
                        <span className="font-mono-tabular text-slate-300">
                          {m.arrivalDate ?? m.year}
                        </span>
                      </div>
                      <div className="text-base font-semibold text-white mt-1">
                        {m.name}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 flex items-center justify-between">
                        <span>{m.outcome}</span>
                        <span className="text-slate-400 font-mono-tabular">
                          {m.artifactIds.length}{' '}
                          {m.artifactIds.length === 1 ? 'artifact' : 'artifacts'}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Right Detail Panel */}
            <div className="lg:col-span-7">
              {activeMission ? (
                <div className="border border-white/10 bg-[#0b101b] rounded-xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                        <span className="text-cyan-300 font-medium">
                          {activeMission.body}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {activeMission.operator} ({activeMission.country})
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{activeMission.outcome}</span>
                      </div>
                      <h2 className="font-display text-3xl font-semibold text-white mt-1">
                        {activeMission.name}
                      </h2>
                    </div>

                    {activeMission.hasConfirmedCoordinates &&
                      activeMission.locationId && (
                        <button
                          type="button"
                          onClick={() =>
                            onNavigateToGlobeLocation(
                              activeMission.body,
                              activeMission.locationId!
                            )
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-xs font-medium text-cyan-200 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Explore on 3D Globe</span>
                        </button>
                      )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {activeMission.overview}
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#111827] border border-white/10 text-xs">
                    <div>
                      <dt className="text-slate-400">Launch Date</dt>
                      <dd className="text-slate-100 font-mono-tabular mt-1">
                        {activeMission.launchDate ?? 'Unknown'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Landing / Impact</dt>
                      <dd className="text-slate-100 font-mono-tabular mt-1">
                        {activeMission.arrivalDate ?? 'Unknown'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Site / Region</dt>
                      <dd className="text-slate-100 mt-1">
                        {activeMission.locationName ?? 'Unknown'}
                      </dd>
                    </div>
                  </dl>

                  {activeMission.uncertaintyNote && (
                    <p className="text-xs text-amber-200/90 border border-amber-400/25 bg-amber-500/10 rounded-lg p-3 leading-relaxed">
                      {activeMission.uncertaintyNote}
                    </p>
                  )}

                  <div className="space-y-2.5">
                    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                      Documented Surface Artifacts ({activeMission.artifactIds.length})
                    </h3>
                    <div className="space-y-2">
                      {activeMission.artifactIds.map((aid) => {
                        const art = artifactsById[aid];
                        if (!art) return null;
                        return (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => onSelectArtifact(art)}
                            className="w-full text-left p-3.5 rounded-lg border border-white/10 bg-[#111827] hover:border-cyan-400/50 transition-colors flex items-center justify-between gap-3"
                          >
                            <div>
                              <div className="text-sm font-medium text-white">
                                {art.name}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {art.type} · {art.status}
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
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-white/10 rounded-xl bg-[#0b101b] text-sm text-slate-400">
                  Select a mission to inspect its briefing and artifacts.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Chronological Timeline Mode */
          <div className="space-y-4 max-w-4xl">
            {filteredMissions.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-xl border border-white/10 bg-[#0b101b] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono-tabular text-cyan-300 inline-flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{m.arrivalDate ?? m.year}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 font-sans">
                      {m.body} · {m.operator}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {m.statusSummary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {m.hasConfirmedCoordinates && m.locationId && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateToGlobeLocation(m.body, m.locationId!)
                      }
                      className="px-3 py-1.5 rounded border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-xs font-medium text-cyan-200 whitespace-nowrap"
                    >
                      View on Globe
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMissionId(m.id);
                      setViewMode('catalog');
                    }}
                    className="px-3 py-1.5 rounded border border-white/15 bg-[#111827] hover:border-white/30 text-xs font-medium text-slate-200 whitespace-nowrap"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scope Boundary Note: Excluded Orbiters & Future Missions */}
        <section className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-white/10 bg-[#0b101b] space-y-2">
            <h3 className="text-sm font-semibold text-white">
              Excluded Orbital & Flyby Spacecraft
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Per RE:SPACE research methodology, active or defunct spacecraft remaining in lunar, Martian, or heliocentric orbit—such as LRO, MRO, ExoMars Trace Gas Orbiter (TGO), Tianwen-1 Orbiter, Apollo LM ascent stages, and Ranger 4 (solar orbit)—are excluded from surface artifact markers.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-[#0b101b] space-y-2">
            <h3 className="text-sm font-semibold text-white">
              Planned / Future Missions (Not Current Surface Artifacts)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Artemis II (crewed cislunar flyby), Artemis III (planned lunar landing), Chang’e-6/7/8, and proposed 2030s crewed Mars policies are tracked in the research report strictly as future items with zero current surface hardware at the report cutoff.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
