import React, { Component, ErrorInfo, ReactNode, Suspense, lazy, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  ALL_ARTIFACTS,
  FACT_CHECK_NOTES,
  MARS_ARTIFACTS,
  MISSIONS,
  MOON_ARTIFACTS,
  SCIENCE_TOPICS,
  SOURCES,
  getArtifactById,
  getArtifactsForLocation,
  getLocationById,
  getLocationsByBody,
  getMediaForArtifact,
  getMediaForLocation,
  getMissionById,
  getMissionsForLocation,
  getSourceById,
  getUnlocatedArtifactsByBody
} from './data';
import { AppView, Artifact, CelestialBody, MediaItem, PlanetaryLocation } from './types/space';
import { Navbar } from './components/Navbar';
import { WorldSelectorOverlay } from './components/WorldSelectorOverlay';

const DualWorldHeroScene = lazy(() =>
  import('./scenes/DualWorldHeroScene').then((m) => ({ default: m.DualWorldHeroScene }))
);
const PlanetExplorerView = lazy(() =>
  import('./features/planet-explorer/PlanetExplorerView').then((m) => ({
    default: m.PlanetExplorerView
  }))
);
const LocationArchiveView = lazy(() =>
  import('./features/location-archive/LocationArchiveView').then((m) => ({
    default: m.LocationArchiveView
  }))
);
const ArtifactDetailView = lazy(() =>
  import('./features/artifact-detail/ArtifactDetailView').then((m) => ({
    default: m.ArtifactDetailView
  }))
);
const MissionExplorerView = lazy(() =>
  import('./features/mission-explorer/MissionExplorerView').then((m) => ({
    default: m.MissionExplorerView
  }))
);
const GlobalArchiveView = lazy(() =>
  import('./features/global-archive/GlobalArchiveView').then((m) => ({
    default: m.GlobalArchiveView
  }))
);
const ScienceLearningView = lazy(() =>
  import('./features/science-learning/ScienceLearningView').then((m) => ({
    default: m.ScienceLearningView
  }))
);
const ResearchLibraryView = lazy(() =>
  import('./features/research-library/ResearchLibraryView').then((m) => ({
    default: m.ResearchLibraryView
  }))
);

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onReset: () => void }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('RE:SPACE view error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#05070b]">
          <div className="max-w-md border border-white/10 bg-[#0b101b] rounded-xl p-6 text-center space-y-4">
            <h2 className="font-display text-2xl text-white">Display Interrupted</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected rendering issue occurred. You can return safely to the museum entrance or open the Global Archive.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onReset();
              }}
              className="px-4 py-2 rounded-md bg-cyan-400 text-slate-950 text-xs font-semibold"
            >
              Return to Entrance
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingState: React.FC<{ label?: string }> = ({ label = 'Initializing Museum Environment...' }) => (
  <div className="min-h-[calc(100vh-3.5rem)] bg-[#05070b] flex items-center justify-center p-6">
    <div className="text-center space-y-2">
      <div className="text-xs tracking-[0.2em] uppercase text-cyan-300 font-medium">
        RE:SPACE
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [previousView, setPreviousView] = useState<AppView>('home');
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  const [hoveredWorld, setHoveredWorld] = useState<CelestialBody | null>(null);
  const [enteringWorld, setEnteringWorld] = useState<CelestialBody | null>(null);

  const artifactsById = useMemo(() => {
    const map: Record<string, Artifact> = {};
    for (const a of ALL_ARTIFACTS) map[a.id] = a;
    return map;
  }, []);

  const missionsById = useMemo(() => {
    const map: Record<string, (typeof MISSIONS)[number]> = {};
    for (const m of MISSIONS) map[m.id] = m;
    return map;
  }, []);

  const artifactMediaMap = useMemo(() => {
    const map: Record<string, MediaItem[]> = {};
    for (const a of ALL_ARTIFACTS) {
      const items = getMediaForArtifact(a.id);
      if (items.length > 0) map[a.id] = items;
    }
    return map;
  }, []);

  const selectedLocation = useMemo(
    () => (selectedLocationId ? getLocationById(selectedLocationId) ?? null : null),
    [selectedLocationId]
  );

  const selectedArtifact = useMemo(
    () => (selectedArtifactId ? getArtifactById(selectedArtifactId) ?? null : null),
    [selectedArtifactId]
  );

  const navigateView = (view: AppView) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleEnterWorldFromHero = (body: CelestialBody) => {
    if (enteringWorld) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnteringWorld(body);
    setHoveredWorld(body);

    const delay = prefersReducedMotion ? 50 : 620;
    window.setTimeout(() => {
      setSelectedBody(body);
      setSelectedLocationId(null);
      setSelectedArtifactId(null);
      setEnteringWorld(null);
      setHoveredWorld(null);
      setPreviousView('home');
      setCurrentView('planet');
    }, delay);
  };

  const handleSelectBodyDirect = (body: CelestialBody) => {
    setSelectedBody(body);
    if (selectedLocation && selectedLocation.body !== body) {
      setSelectedLocationId(null);
    }
    setPreviousView(currentView);
    setCurrentView('planet');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectLocation = (location: PlanetaryLocation) => {
    setSelectedBody(location.body);
    setSelectedLocationId(location.id);
    setPreviousView('planet');
    setCurrentView('location');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectArtifact = (artifact: Artifact) => {
    setSelectedBody(artifact.body);
    if (artifact.locationId) {
      setSelectedLocationId(artifact.locationId);
    }
    setSelectedArtifactId(artifact.id);
    setPreviousView(currentView);
    setCurrentView('artifact');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenGlobeAtLocation = (body: CelestialBody, locationId: string) => {
    setSelectedBody(body);
    setSelectedLocationId(locationId);
    setPreviousView(currentView);
    setCurrentView('planet');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenMission = (missionId: string) => {
    setSelectedMissionId(missionId);
    setPreviousView(currentView);
    setCurrentView('missions');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleGoBack = () => {
    if (currentView === 'artifact') {
      if (previousView === 'archive' || previousView === 'missions') {
        setCurrentView(previousView);
      } else if (selectedLocationId) {
        setCurrentView('location');
      } else if (selectedBody) {
        setCurrentView('planet');
      } else {
        setCurrentView('archive');
      }
      return;
    }

    if (currentView === 'location') {
      setCurrentView('planet');
      return;
    }

    if (currentView === 'planet') {
      setCurrentView('home');
      return;
    }

    setCurrentView('home');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#05070b] text-slate-100 flex flex-col">
      <Navbar
        currentView={currentView}
        selectedBody={selectedBody}
        selectedLocation={selectedLocation}
        selectedArtifact={selectedArtifact}
        onNavigate={navigateView}
        onSelectBody={handleSelectBodyDirect}
        onGoBack={handleGoBack}
      />

      <div className="flex-1">
        <SceneErrorBoundary onReset={() => setCurrentView('home')}>
          {currentView === 'home' && (
            <main className="relative min-h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-[#05070b]">
              <Suspense fallback={<LoadingState label="Preparing 3D Dual-World Observatory..." />}>
                <DualWorldHeroScene
                  hoveredWorld={hoveredWorld}
                  enteringWorld={enteringWorld}
                  onHoverWorld={setHoveredWorld}
                  onSelectWorld={handleEnterWorldFromHero}
                />
              </Suspense>

              <WorldSelectorOverlay
                hoveredWorld={hoveredWorld}
                enteringWorld={enteringWorld}
                moonArtifactCount={MOON_ARTIFACTS.length}
                marsArtifactCount={MARS_ARTIFACTS.length}
                onHoverWorld={setHoveredWorld}
                onSelectWorld={handleEnterWorldFromHero}
              />
            </main>
          )}

          {currentView === 'planet' && selectedBody && (
            <Suspense fallback={<LoadingState label={`Loading 3D ${selectedBody} Surface...`} />}>
              <PlanetExplorerView
                body={selectedBody}
                locations={getLocationsByBody(selectedBody)}
                artifacts={selectedBody === 'Moon' ? MOON_ARTIFACTS : MARS_ARTIFACTS}
                unlocatedArtifacts={getUnlocatedArtifactsByBody(selectedBody)}
                selectedLocationId={selectedLocationId}
                onSelectLocation={handleSelectLocation}
                onSelectArtifact={handleSelectArtifact}
                onBackToWorlds={() => navigateView('home')}
              />
            </Suspense>
          )}

          {currentView === 'location' && selectedLocation && (
            <Suspense fallback={<LoadingState label="Opening Location Archive..." />}>
              <LocationArchiveView
                location={selectedLocation}
                artifacts={getArtifactsForLocation(selectedLocation.id)}
                missions={getMissionsForLocation(selectedLocation.id)}
                sources={selectedLocation.sourceIds
                  .map((id) => getSourceById(id))
                  .filter((s): s is NonNullable<typeof s> => Boolean(s))}
                mediaItems={getMediaForLocation(selectedLocation.id)}
                artifactMediaMap={artifactMediaMap}
                onBackToGlobe={() => {
                  setSelectedBody(selectedLocation.body);
                  setCurrentView('planet');
                }}
                onSelectArtifact={handleSelectArtifact}
                onOpenMissionExplorer={handleOpenMission}
              />
            </Suspense>
          )}

          {currentView === 'artifact' && selectedArtifact && (
            <Suspense fallback={<LoadingState label="Loading Artifact Monograph..." />}>
              <ArtifactDetailView
                artifact={selectedArtifact}
                location={
                  selectedArtifact.locationId
                    ? getLocationById(selectedArtifact.locationId) ?? null
                    : null
                }
                mission={getMissionById(selectedArtifact.missionId) ?? null}
                mediaItems={artifactMediaMap[selectedArtifact.id] ?? []}
                relatedArtifacts={selectedArtifact.relatedArtifacts
                  .map((id) => getArtifactById(id))
                  .filter((a): a is Artifact => Boolean(a))}
                sources={selectedArtifact.sources
                  .map((id) => getSourceById(id))
                  .filter((s): s is NonNullable<typeof s> => Boolean(s))}
                onBack={handleGoBack}
                onOpenOnGlobe={(locId) =>
                  handleOpenGlobeAtLocation(selectedArtifact.body, locId)
                }
                onOpenLocation={handleSelectLocation}
                onSelectArtifact={handleSelectArtifact}
                onOpenMission={handleOpenMission}
              />
            </Suspense>
          )}

          {currentView === 'missions' && (
            <Suspense fallback={<LoadingState label="Loading Mission Explorer..." />}>
              <MissionExplorerView
                missions={MISSIONS}
                artifactsById={artifactsById}
                artifactMediaMap={artifactMediaMap}
                initialMissionId={selectedMissionId}
                onSelectArtifact={handleSelectArtifact}
                onNavigateToGlobeLocation={handleOpenGlobeAtLocation}
              />
            </Suspense>
          )}

          {currentView === 'archive' && (
            <Suspense fallback={<LoadingState label="Loading Global Artifact Archive..." />}>
              <GlobalArchiveView
                artifacts={ALL_ARTIFACTS}
                artifactMediaMap={artifactMediaMap}
                onSelectArtifact={handleSelectArtifact}
              />
            </Suspense>
          )}

          {currentView === 'science' && (
            <Suspense fallback={<LoadingState label="Loading Science & Engineering Guides..." />}>
              <ScienceLearningView
                topics={SCIENCE_TOPICS}
                missionsById={missionsById}
                onOpenMission={handleOpenMission}
              />
            </Suspense>
          )}

          {currentView === 'sources' && (
            <Suspense fallback={<LoadingState label="Loading Verified Research Library..." />}>
              <ResearchLibraryView
                sources={SOURCES}
                factChecks={FACT_CHECK_NOTES}
              />
            </Suspense>
          )}
        </SceneErrorBoundary>
      </div>

      {/* Quiet Editorial Footer on non-3D-fullscreen views */}
      {currentView !== 'home' && currentView !== 'planet' && (
        <footer className="border-t border-white/10 bg-[#05070b] py-6 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>
              RE:SPACE — Interactive Digital Museum of Human Space Heritage (1958–2026)
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigateView('sources')}
                className="hover:text-slate-300 transition-colors"
              >
                Sources & Fact-Checks
              </button>
              <button
                type="button"
                onClick={() => navigateView('science')}
                className="hover:text-slate-300 transition-colors"
              >
                Science Guides
              </button>
              <button
                type="button"
                onClick={() => navigateView('archive')}
                className="hover:text-slate-300 transition-colors"
              >
                Global Archive
              </button>
            </div>
          </div>
        </footer>
      )}
      </div>
    </MotionConfig>
  );
}
