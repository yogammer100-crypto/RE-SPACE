import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CelestialBody } from '../types/space';

interface WorldSelectorOverlayProps {
  hoveredWorld: CelestialBody | null;
  enteringWorld: CelestialBody | null;
  moonArtifactCount: number;
  marsArtifactCount: number;
  onHoverWorld: (body: CelestialBody | null) => void;
  onSelectWorld: (body: CelestialBody) => void;
}

export const WorldSelectorOverlay: React.FC<WorldSelectorOverlayProps> = ({
  hoveredWorld,
  enteringWorld,
  moonArtifactCount,
  marsArtifactCount,
  onHoverWorld,
  onSelectWorld
}) => {
  return (
    <div className="pointer-events-none relative z-10 flex flex-col justify-between min-h-[calc(100vh-3.5rem)] px-4 sm:px-8 py-6 sm:py-10 max-w-7xl mx-auto">
      {/* Minimal Editorial Title Header */}
      <div
        className={`text-center space-y-2 transition-opacity duration-500 ${
          enteringWorld ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-xs tracking-[0.22em] text-cyan-300 font-medium uppercase">
          A Digital Museum of Human Space Heritage
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white [text-wrap:balance]">
          RE:SPACE
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
          Explore the worlds humanity has reached. Select a planet in 3D space to inspect verified surface artifacts from 1958 to 2026.
        </p>
      </div>

      {/* Bottom Interactive World Labels — Clean Typographic Anchors, Not Rectangular Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end pb-2 transition-opacity duration-500 ${
          enteringWorld ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Left: THE MOON */}
        <div className="pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-xs text-slate-400 font-mono-tabular mb-1.5">
            First World · {moonArtifactCount} Verified Entries · 1959–2023
          </div>
          <button
            type="button"
            onMouseEnter={() => onHoverWorld('Moon')}
            onMouseLeave={() => onHoverWorld(null)}
            onFocus={() => onHoverWorld('Moon')}
            onBlur={() => onHoverWorld(null)}
            onClick={() => onSelectWorld('Moon')}
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-md border text-sm font-semibold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
              hoveredWorld === 'Moon'
                ? 'border-cyan-400 bg-cyan-400/15 text-white'
                : 'border-white/25 bg-[#090d16]/88 text-slate-100 hover:border-cyan-400/80'
            }`}
          >
            <span>EXPLORE THE MOON</span>
            <ArrowRight
              className="w-4 h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right: MARS */}
        <div className="pointer-events-auto flex flex-col items-center md:items-end text-center md:text-right">
          <div className="text-xs text-slate-400 font-mono-tabular mb-1.5">
            Second World · {marsArtifactCount} Verified Entries · 1971–2021
          </div>
          <button
            type="button"
            onMouseEnter={() => onHoverWorld('Mars')}
            onMouseLeave={() => onHoverWorld(null)}
            onFocus={() => onHoverWorld('Mars')}
            onBlur={() => onHoverWorld(null)}
            onClick={() => onSelectWorld('Mars')}
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-md border text-sm font-semibold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
              hoveredWorld === 'Mars'
                ? 'border-cyan-400 bg-cyan-400/15 text-white'
                : 'border-white/25 bg-[#090d16]/88 text-slate-100 hover:border-cyan-400/80'
            }`}
          >
            <span>EXPLORE MARS</span>
            <ArrowRight
              className="w-4 h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
