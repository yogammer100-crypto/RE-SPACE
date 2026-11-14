import React, { useState } from 'react';
import { ChevronLeft, Menu, Search, X } from 'lucide-react';
import { AppView, Artifact, CelestialBody, PlanetaryLocation } from '../types/space';

interface NavbarProps {
  currentView: AppView;
  selectedBody: CelestialBody | null;
  selectedLocation: PlanetaryLocation | null;
  selectedArtifact: Artifact | null;
  onNavigate: (view: AppView) => void;
  onSelectBody: (body: CelestialBody) => void;
  onGoBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  selectedBody,
  selectedLocation,
  selectedArtifact,
  onNavigate,
  onSelectBody,
  onGoBack
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ label: string; view: AppView }> = [
    { label: 'Worlds', view: 'home' },
    { label: 'Missions', view: 'missions' },
    { label: 'Archive', view: 'archive' },
    { label: 'Science', view: 'science' },
    { label: 'Sources', view: 'sources' }
  ];

  const handleNavClick = (view: AppView) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const showBreadcrumbs =
    currentView === 'planet' ||
    currentView === 'location' ||
    currentView === 'artifact';

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070b]/94">
      {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (5 Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-xl sm:text-2xl font-semibold tracking-wider text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          RE:SPACE
        </button>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const active =
              currentView === item.view ||
              (item.view === 'home' &&
                (currentView === 'planet' || currentView === 'location'));
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  active
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('archive')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Search Archive</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-200 hover:bg-white/5 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Contextual Breadcrumb Strip when exploring a World / Location / Artifact */}
      {showBreadcrumbs && (
        <div className="border-t border-white/10 bg-[#080c14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <button
                type="button"
                onClick={onGoBack}
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-medium whitespace-nowrap shrink-0 pr-2 border-r border-white/10"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-1.5 text-slate-400 min-w-0 truncate">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-slate-100 whitespace-nowrap shrink-0"
                >
                  Worlds
                </button>
                {selectedBody && (
                  <>
                    <span aria-hidden="true">/</span>
                    <button
                      type="button"
                      onClick={() => onSelectBody(selectedBody)}
                      className={`whitespace-nowrap shrink-0 ${
                        currentView === 'planet'
                          ? 'text-white font-medium'
                          : 'hover:text-slate-100'
                      }`}
                    >
                      {selectedBody === 'Moon' ? 'The Moon' : 'Mars'}
                    </button>
                  </>
                )}
                {selectedLocation &&
                  (currentView === 'location' || currentView === 'artifact') && (
                    <>
                      <span aria-hidden="true">/</span>
                      <button
                        type="button"
                        onClick={() => onNavigate('location')}
                        className={`truncate max-w-[180px] sm:max-w-[260px] ${
                          currentView === 'location'
                            ? 'text-white font-medium'
                            : 'hover:text-slate-100'
                        }`}
                      >
                        {selectedLocation.name}
                      </button>
                    </>
                  )}
                {selectedArtifact && currentView === 'artifact' && (
                  <>
                    <span aria-hidden="true">/</span>
                    <span className="text-white font-medium truncate max-w-[160px] sm:max-w-[260px]">
                      {selectedArtifact.name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {selectedBody && (
              <button
                type="button"
                onClick={() =>
                  onSelectBody(selectedBody === 'Moon' ? 'Mars' : 'Moon')
                }
                className="hidden sm:inline-block text-slate-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                Switch to {selectedBody === 'Moon' ? 'Mars' : 'The Moon'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080c14] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const active = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-300'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
