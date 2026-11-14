import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
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
      {/* Minimal Editorial Museum Entrance Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: enteringWorld ? 0 : 1,
          y: enteringWorld ? -10 : 0
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-2.5"
      >
        <p className="text-[11px] sm:text-xs tracking-[0.26em] text-cyan-300 font-medium uppercase">
          Digital Museum of Human Space Heritage · 1958–2026
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white [text-wrap:balance]">
          RE:SPACE
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Two worlds bearing humanity’s physical legacy. Select the Moon or Mars in 3D space to explore verified landing zones, archival mission photography, and surface artifacts.
        </p>
      </motion.div>

      {/* Bottom Interactive World Destinations — Unboxed Editorial Anchors */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: enteringWorld ? 0 : 1,
          y: enteringWorld ? 12 : 0
        }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end pb-2"
      >
        {/* Left: THE MOON */}
        <div className="pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="space-y-0.5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-cyan-300/90 font-medium">
              Destination I · 384,400 km
            </div>
            <div className="text-xs text-slate-300 font-mono-tabular">
              {moonArtifactCount} Verified Surface Entries · 1959–2023
            </div>
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
                ? 'border-cyan-400 bg-cyan-400/16 text-white shadow-[0_0_24px_rgba(34,211,238,0.18)]'
                : 'border-white/25 bg-[#070b12]/90 text-slate-100 hover:border-cyan-400/80'
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
        <div className="pointer-events-auto flex flex-col items-center md:items-end text-center md:text-right space-y-2">
          <div className="space-y-0.5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-cyan-300/90 font-medium">
              Destination II · 225 Million km Avg
            </div>
            <div className="text-xs text-slate-300 font-mono-tabular">
              {marsArtifactCount} Verified Surface Entries · 1971–2021
            </div>
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
                ? 'border-cyan-400 bg-cyan-400/16 text-white shadow-[0_0_24px_rgba(34,211,238,0.18)]'
                : 'border-white/25 bg-[#070b12]/90 text-slate-100 hover:border-cyan-400/80'
            }`}
          >
            <span>EXPLORE MARS</span>
            <ArrowRight
              className="w-4 h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
