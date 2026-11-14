import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Filter,
  HelpCircle,
  RotateCcw,
  Sun,
  X
} from 'lucide-react';
import {
  Artifact,
  CelestialBody,
  PlanetaryLocation
} from '../../types/space';
import {
  getLocationMarkerCategory,
  MarkerCategory,
  PlanetExplorerScene
} from '../../scenes/PlanetExplorerScene';
import { MarkerLegend } from '../../components/MarkerLegend';
import { formatCoordinates } from '../../utils/coordinates';

interface PlanetExplorerViewProps {
  body: CelestialBody;
  locations: PlanetaryLocation[];
  artifacts: Artifact[];
  unlocatedArtifacts: Artifact[];
  selectedLocationId: string | null;
  onSelectLocation: (location: PlanetaryLocation) => void;
  onSelectArtifact: (artifact: Artifact) => void;
  onBackToWorlds: () => void;
}

export const PlanetExplorerView: React.FC<PlanetExplorerViewProps> = ({
  body,
  locations,
  artifacts,
  unlocatedArtifacts,
  selectedLocationId,
  onSelectLocation,
  onSelectArtifact,
  onBackToWorlds
}) => {
  const [sunAzimuthDeg, setSunAzimuthDeg] = useState(body === 'Moon' ? 38 : 48);
  const [surveyLighting, setSurveyLighting] = useState(false);
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const [focusLocationId, setFocusLocationId] = useState<string | null>(selectedLocationId);
  const [dockExpanded, setDockExpanded] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | MarkerCategory>('all');
  const [showUnlocatedModal, setShowUnlocatedModal] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(40);

  useEffect(() => {
    setCategoryFilter('all');
    setFocusLocationId(selectedLocationId);
    setSunAzimuthDeg(body === 'Moon' ? 38 : 48);
  }, [body, selectedLocationId]);

  const artifactsById = useMemo(() => {
    const map: Record<string, Artifact> = {};
    for (const a of artifacts) {
      map[a.id] = a;
    }
    return map;
  }, [artifacts]);

  const filteredLocations = useMemo(() => {
    if (categoryFilter === 'all') return locations;
    return locations.filter(
      (loc) => getLocationMarkerCategory(loc, artifactsById) === categoryFilter
    );
  }, [locations, artifactsById, categoryFilter]);

  const sortedLocations = useMemo(
    () => [...filteredLocations].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredLocations]
  );

  const selectedLocObj = useMemo(
    () => (selectedLocationId ? locations.find((l) => l.id === selectedLocationId) ?? null : null),
    [locations, selectedLocationId]
  );

  const handleResetView = () => {
    setFocusLocationId(null);
    setCategoryFilter('all');
    setResetSignal((n) => n + 1);
  };

  const filterOptions: Array<{ value: 'all' | MarkerCategory; label: string }> = [
    { value: 'all', label: `All Sites (${locations.length})` },
    { value: 'lander', label: 'Landers' },
    { value: 'rover', label: 'Rovers' },
    { value: 'instrument', label: 'Instruments' },
    { value: 'impact', label: 'Impacts & Debris' }
  ];

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] min-h-[540px] bg-[#05070b] overflow-hidden">
      {/* Interactive 3D Globe Viewport */}
      <PlanetExplorerScene
        body={body}
        locations={filteredLocations}
        artifactsById={artifactsById}
        selectedLocationId={selectedLocationId}
        sunAzimuthDeg={sunAzimuthDeg}
        surveyLighting={surveyLighting}
        autoOrbit={autoOrbit}
        resetSignal={resetSignal}
        focusLocationId={focusLocationId}
        onSelectLocation={onSelectLocation}
        onCameraZoomChange={setZoomPercent}
      />

      {/* Minimal Top-Left Context Strip */}
      <div className="pointer-events-none absolute top-4 left-4 sm:left-6 z-20 max-w-md">
        <div className="pointer-events-auto inline-block bg-[#090d16]/90 border border-white/10 rounded-lg px-4 py-2.5 space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300 font-medium">
            <span>{body === 'Moon' ? 'The Moon' : 'Mars'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-slate-300">
              {filteredLocations.length}
              {categoryFilter !== 'all' ? ` / ${locations.length}` : ''} Mapped Sites · Zoom {zoomPercent}%
            </span>
          </div>
          {selectedLocObj ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-300">
              <span className="font-medium text-white">{selectedLocObj.name}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular text-slate-400">
                {formatCoordinates(
                  selectedLocObj.latitude,
                  selectedLocObj.longitude,
                  selectedLocObj.coordinateConfidence
                )}
              </span>
              <button
                type="button"
                onClick={() => onSelectLocation(selectedLocObj)}
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 ml-1"
              >
                Open Archive
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              Drag to rotate · Scroll or pinch to zoom · Click any marker to open its location archive
            </p>
          )}
        </div>
      </div>

      {/* Collapsible Bottom Control Dock (Zero Mid-Screen Occlusion) */}
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-30 flex flex-col items-center px-3 sm:px-6">
        <button
          type="button"
          onClick={() => setDockExpanded((v) => !v)}
          className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-t-md border border-white/15 bg-[#090d16]/95 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
        >
          {dockExpanded ? (
            <>
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Hide Controls</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Show Controls</span>
            </>
          )}
        </button>

        {dockExpanded && (
          <div className="pointer-events-auto w-full max-w-4xl border border-white/12 bg-[#090d16]/94 rounded-xl p-3 sm:p-4 shadow-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetView}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/15 bg-[#111827] hover:border-cyan-400/60 text-xs font-medium text-slate-100 transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>Reset Global View</span>
                </button>

                <button
                  type="button"
                  onClick={onBackToWorlds}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/15 bg-[#111827] hover:border-white/30 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>World Selection</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-medium transition-colors whitespace-nowrap ${
                    filtersOpen || categoryFilter !== 'all'
                      ? 'border-cyan-400/70 bg-cyan-400/12 text-cyan-200'
                      : 'border-white/15 bg-[#111827] hover:border-white/30 text-slate-300 hover:text-white'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    Filter{categoryFilter !== 'all' ? `: ${categoryFilter}` : ''}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowUnlocatedModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-amber-400/35 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-medium text-amber-200 transition-colors whitespace-nowrap"
                >
                  <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Unlocated Records ({unlocatedArtifacts.length})</span>
                </button>
              </div>

              {/* Site Quick Jump */}
              <div className="flex items-center gap-2 flex-1 min-w-[210px] sm:max-w-xs">
                <label htmlFor="site-jump-select" className="sr-only">
                  Jump to documented site
                </label>
                <select
                  id="site-jump-select"
                  value={selectedLocationId ?? ''}
                  onChange={(e) => {
                    const loc = locations.find((l) => l.id === e.target.value);
                    if (loc) {
                      setFocusLocationId(loc.id);
                      onSelectLocation(loc);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-md border border-white/15 bg-[#111827] text-xs text-slate-100 focus:outline-2 focus:outline-cyan-400"
                >
                  <option value="">Jump to mapped location...</option>
                  {sortedLocations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.artifactIds.length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filtersOpen && (
              <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 mr-1">
                  Surface Category:
                </span>
                {filterOptions.map((opt) => {
                  const active = categoryFilter === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setCategoryFilter(opt.value)}
                      className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'border-cyan-400 bg-cyan-400/16 text-cyan-200'
                          : 'border-white/12 bg-[#111827] text-slate-300 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bottom Row: Legend + Solar Illumination */}
            <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <MarkerLegend compact />

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <label
                  htmlFor="sun-azimuth"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  <span>Sun Angle</span>
                </label>
                <input
                  id="sun-azimuth"
                  type="range"
                  min={-180}
                  max={180}
                  value={sunAzimuthDeg}
                  onChange={(e) => setSunAzimuthDeg(Number(e.target.value))}
                  className="w-24 accent-cyan-400 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setSurveyLighting((v) => !v)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors whitespace-nowrap ${
                    surveyLighting
                      ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
                      : 'border-white/15 bg-[#111827] text-slate-300 hover:text-white'
                  }`}
                >
                  {surveyLighting ? 'Uniform Light: On' : 'Uniform Light: Off'}
                </button>
                <button
                  type="button"
                  onClick={() => setAutoOrbit((v) => !v)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors whitespace-nowrap ${
                    autoOrbit
                      ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-200'
                      : 'border-white/15 bg-[#111827] text-slate-300 hover:text-white'
                  }`}
                >
                  {autoOrbit ? 'Idle Orbit: On' : 'Idle Orbit: Off'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Honest Unknown / Unpublished Coordinates Drawer */}
      {showUnlocatedModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="unlocated-dialog-title"
        >
          <div className="w-full max-w-2xl max-h-[82vh] flex flex-col border border-white/15 bg-[#0b101b] rounded-xl shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div>
                <h2
                  id="unlocated-dialog-title"
                  className="font-display text-2xl font-semibold text-white"
                >
                  {body === 'Moon' ? 'Lunar' : 'Martian'} Records Without Published Coordinates
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Per RE:SPACE evidence policy, objects lacking confirmed numeric coordinates in the research report are not placed as invented globe markers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUnlocatedModal(false)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {unlocatedArtifacts.length === 0 ? (
                <p className="text-sm text-slate-400">
                  All documented artifacts on {body} have mapped coordinates.
                </p>
              ) : (
                unlocatedArtifacts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setShowUnlocatedModal(false);
                      onSelectArtifact(item);
                    }}
                    className="w-full text-left p-4 rounded-lg border border-white/10 bg-[#111827] hover:border-cyan-400/60 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {item.name}
                      </h3>
                      <span className="text-xs font-mono-tabular text-amber-300">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-2">
                      <span>{item.mission}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.operator}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.locationName ?? 'Location Unknown'}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {item.coordinateAccuracyNote ??
                        formatCoordinates(item.latitude, item.longitude, item.coordinateConfidence)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
