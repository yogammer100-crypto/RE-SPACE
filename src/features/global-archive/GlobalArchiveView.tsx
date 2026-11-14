import React, { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, Search } from 'lucide-react';
import {
  Artifact,
  ArtifactStatus,
  ArtifactType,
  CelestialBody,
  OutcomeCategory
} from '../../types/space';
import { formatCoordinates } from '../../utils/coordinates';

interface GlobalArchiveViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
}

export const GlobalArchiveView: React.FC<GlobalArchiveViewProps> = ({
  artifacts,
  onSelectArtifact
}) => {
  const [query, setQuery] = useState('');
  const [bodyFilter, setBodyFilter] = useState<'All' | CelestialBody>('All');
  const [missionFilter, setMissionFilter] = useState('All');
  const [operatorFilter, setOperatorFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'All' | ArtifactType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | ArtifactStatus>('All');
  const [outcomeFilter, setOutcomeFilter] = useState<'All' | OutcomeCategory>('All');
  const [yearFilter, setYearFilter] = useState('All');

  const missions = useMemo(
    () => Array.from(new Set(artifacts.map((a) => a.mission))).sort(),
    [artifacts]
  );
  const operators = useMemo(
    () => Array.from(new Set(artifacts.map((a) => a.operator))).sort(),
    [artifacts]
  );
  const types = useMemo(
    () => Array.from(new Set(artifacts.map((a) => a.type))).sort(),
    [artifacts]
  );
  const statuses = useMemo(
    () => Array.from(new Set(artifacts.map((a) => a.status))).sort(),
    [artifacts]
  );
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          artifacts
            .map((a) => a.landingDate?.slice(0, 4))
            .filter((y): y is string => Boolean(y))
        )
      ).sort(),
    [artifacts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artifacts.filter((a) => {
      if (bodyFilter !== 'All' && a.body !== bodyFilter) return false;
      if (missionFilter !== 'All' && a.mission !== missionFilter) return false;
      if (operatorFilter !== 'All' && a.operator !== operatorFilter) return false;
      if (typeFilter !== 'All' && a.type !== typeFilter) return false;
      if (statusFilter !== 'All' && a.status !== statusFilter) return false;
      if (outcomeFilter !== 'All' && a.outcomeCategory !== outcomeFilter) return false;
      if (yearFilter !== 'All' && a.landingDate?.slice(0, 4) !== yearFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.mission.toLowerCase().includes(q) ||
        a.operator.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.purpose.toLowerCase().includes(q) ||
        (a.locationName ?? '').toLowerCase().includes(q)
      );
    });
  }, [
    artifacts,
    query,
    bodyFilter,
    missionFilter,
    operatorFilter,
    typeFilter,
    statusFilter,
    outcomeFilter,
    yearFilter
  ]);

  const resetFilters = () => {
    setQuery('');
    setBodyFilter('All');
    setMissionFilter('All');
    setOperatorFilter('All');
    setTypeFilter('All');
    setStatusFilter('All');
    setOutcomeFilter('All');
    setYearFilter('All');
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#05070b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        <header className="pb-6 border-b border-white/10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-cyan-300 font-medium">
              Global Artifact Catalog
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mt-2">
              Verified Surface Archive
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Search and filter every documented lander, rover, descent stage, scientific instrument, debris field, and impact site on the Moon and Mars.
            </p>
          </div>

          <div className="text-xs font-mono-tabular text-slate-300">
            Showing {filtered.length} of {artifacts.length} cataloged entries
          </div>
        </header>

        {/* Search & Multi-Facet Filters */}
        <div className="border border-white/10 bg-[#0b101b] rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artifact name, mission, operator, or site..."
                aria-label="Search artifacts"
                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-white/15 bg-[#111827] text-xs text-white placeholder:text-slate-500 focus:outline-2 focus:outline-cyan-400"
              />
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-md border border-white/15 bg-[#111827] hover:border-white/30 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            <select
              aria-label="Filter by world"
              value={bodyFilter}
              onChange={(e) => setBodyFilter(e.target.value as 'All' | CelestialBody)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">World: All</option>
              <option value="Moon">Moon</option>
              <option value="Mars">Mars</option>
            </select>

            <select
              aria-label="Filter by mission"
              value={missionFilter}
              onChange={(e) => setMissionFilter(e.target.value)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">Mission: All</option>
              {missions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by operator"
              value={operatorFilter}
              onChange={(e) => setOperatorFilter(e.target.value)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">Operator: All</option>
              {operators.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by artifact type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'All' | ArtifactType)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">Type: All</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'All' | ArtifactStatus)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">Status: All</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by landing outcome"
              value={outcomeFilter}
              onChange={(e) =>
                setOutcomeFilter(e.target.value as 'All' | OutcomeCategory)
              }
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100"
            >
              <option value="All">Outcome: All</option>
              <option value="Successful Landing">Successful Landing</option>
              <option value="Deliberate Impact">Deliberate Impact</option>
              <option value="Failed Landing">Failed Landing</option>
            </select>

            <select
              aria-label="Filter by year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-2.5 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100 font-mono-tabular"
            >
              <option value="All">Year: All</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-10 text-center border border-white/10 bg-[#0b101b] rounded-xl text-sm text-slate-400">
            No artifacts match your current search and filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => onSelectArtifact(art)}
                className="text-left p-5 rounded-xl border border-white/10 bg-[#0b101b] hover:border-cyan-400/55 transition-colors flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-1.5">
                    <span className="text-cyan-300 font-medium">{art.body}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">
                      {art.landingDate ?? 'Date Unknown'}
                    </span>
                  </div>

                  <h2 className="text-base font-semibold text-white mt-2 leading-snug">
                    {art.name}
                  </h2>

                  <div className="text-xs text-slate-300 mt-1.5">
                    {art.mission} · {art.operator}
                  </div>

                  <div className="text-xs font-mono-tabular text-slate-400 mt-3 truncate">
                    {art.locationName ?? 'Location Unknown'}
                  </div>
                  <div className="text-[11px] font-mono-tabular text-slate-500 mt-0.5 truncate">
                    {formatCoordinates(
                      art.latitude,
                      art.longitude,
                      art.coordinateConfidence
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span
                    className={
                      art.outcomeCategory === 'Failed Landing'
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }
                  >
                    {art.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-cyan-300 font-medium">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
