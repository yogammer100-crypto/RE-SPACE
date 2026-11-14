import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  MapPin
} from 'lucide-react';
import { AppView, CelestialBody, MediaItem, MissionRecord } from '../types/space';
import { HeroScrollChoreographyState } from '../scenes/DualWorldHeroScene';
import { ARCHIVAL_MEDIA, MISSIONS } from '../data';
import { ArchivalImage, ArchivalLightbox } from './ArchivalImage';

gsap.registerPlugin(ScrollTrigger);

interface HomepageExperienceProps {
  scrollStateRef: MutableRefObject<HeroScrollChoreographyState>;
  hoveredWorld: CelestialBody | null;
  enteringWorld: CelestialBody | null;
  moonArtifactCount: number;
  marsArtifactCount: number;
  onHoverWorld: (body: CelestialBody | null) => void;
  onSelectWorld: (body: CelestialBody) => void;
  onNavigateView: (view: AppView) => void;
  onOpenLocationById: (body: CelestialBody, locationId: string) => void;
  onOpenArtifactById: (artifactId: string) => void;
  onOpenMission: (missionId: string) => void;
}

const FEATURED_PLATE_IDS = [
  'media-apollo11-eagle',
  'media-apollo12-surveyor3-dual',
  'media-luna9-first-surface',
  'media-perseverance-skycrane',
  'media-opportunity-victoria',
  'media-chandrayaan3-vikram'
] as const;

interface EraChapterConfig {
  id: string;
  span: string;
  title: string;
  subtitle: string;
  summary: string;
  plateId: string;
  missionIds: string[];
}

const ERA_CHAPTERS: EraChapterConfig[] = [
  {
    id: 'era-first-reach',
    span: '1959 — 1968',
    title: 'First Reach Beyond Earth',
    subtitle: 'Impactors, hard-landers, and the first surface panoramas',
    summary:
      'From Luna 2’s inaugural impact in 1959 and Ranger 7’s pre-impact framing in Mare Cognitum to Luna 9’s 1966 Oceanus Procellarum horizon—human engineering first touched another world.',
    plateId: 'media-ranger7-mare-cognitum',
    missionIds: ['mission-luna-2', 'mission-ranger-7', 'mission-luna-9', 'mission-surveyor-3']
  },
  {
    id: 'era-apollo-lunokhod',
    span: '1969 — 1973',
    title: 'Crewed Landings & Mobile Rovers',
    subtitle: 'Tranquility Base, Oceanus Procellarum, and Lunokhod traverses',
    summary:
      'Apollo 11 and 12 left descent stages, ALSEP geophysical stations, and laser retroreflectors on the near side while Soviet Lunokhod 1 and 2 proved long-range teleoperated mobility.',
    plateId: 'media-apollo11-eagle',
    missionIds: ['mission-apollo-11', 'mission-apollo-12', 'mission-luna-17', 'mission-luna-21']
  },
  {
    id: 'era-mars-touchdown',
    span: '1971 — 1997',
    title: 'Touchdown on Mars',
    subtitle: 'First Martian landings through Pathfinder & Sojourner',
    summary:
      'Following Mars 3’s 1971 soft landing and the multi-year Viking meteorology and biology stations, Mars Pathfinder’s 1997 airbag touchdown delivered the six-wheeled Sojourner rover to Ares Vallis.',
    plateId: 'media-pathfinder-panorama',
    missionIds: ['mission-mars-3', 'mission-viking-1', 'mission-viking-2', 'mission-pathfinder']
  },
  {
    id: 'era-endurance',
    span: '2004 — 2018',
    title: 'Geological Endurance & Ice',
    subtitle: 'Long-duration rovers, polar trenching, and lunar ice discovery',
    summary:
      'Opportunity crossed 45 km of Meridiani Planum over nearly 15 years, Phoenix excavated Martian polar water ice, LCROSS confirmed polar ice in Cabeus Crater, and Curiosity began ascending Mount Sharp.',
    plateId: 'media-curiosity-bradbury',
    missionIds: [
      'mission-mer-opportunity',
      'mission-phoenix',
      'mission-lcross',
      'mission-msl-curiosity'
    ]
  },
  {
    id: 'era-modern-frontier',
    span: '2013 — 2026',
    title: 'Far-Side, Polar & Aerial Frontiers',
    subtitle: 'Von Kármán Crater, Jezero delta, Utopia Planitia, and Shiv Shakti',
    summary:
      'Modern missions expanded to the lunar far side with Chang’e-4, sample return from Mons Rümker, south polar landing with Chandrayaan-3, Tianwen-1’s Zhurong traverse, and 72 powered flights by Ingenuity.',
    plateId: 'media-perseverance-ingenuity-selfie',
    missionIds: [
      'mission-change-4',
      'mission-mars2020',
      'mission-tianwen-1',
      'mission-chandrayaan-3'
    ]
  }
];

export const HomepageExperience: React.FC<HomepageExperienceProps> = ({
  scrollStateRef,
  hoveredWorld,
  enteringWorld,
  moonArtifactCount,
  marsArtifactCount,
  onHoverWorld,
  onSelectWorld,
  onNavigateView,
  onOpenLocationById,
  onOpenArtifactById,
  onOpenMission
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionBRef = useRef<HTMLElement>(null);
  const sectionCRef = useRef<HTMLElement>(null);
  const timelineViewportRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const sectionDRef = useRef<HTMLElement>(null);
  const [inspectedMedia, setInspectedMedia] = useState<MediaItem | null>(null);

  const mediaById = useMemo(() => {
    const map: Record<string, MediaItem> = {};
    for (const item of ARCHIVAL_MEDIA) map[item.id] = item;
    return map;
  }, []);

  const missionsById = useMemo(() => {
    const map: Record<string, MissionRecord> = {};
    for (const m of MISSIONS) map[m.id] = m;
    return map;
  }, []);

  const featuredPlates = useMemo(
    () =>
      FEATURED_PLATE_IDS.map((id) => mediaById[id]).filter((m): m is MediaItem => Boolean(m)),
    [mediaById]
  );

  useEffect(() => {
    const root = rootRef.current;
    const secB = sectionBRef.current;
    const secC = sectionCRef.current;
    const track = timelineTrackRef.current;
    const viewport = timelineViewportRef.current;
    const secD = sectionDRef.current;

    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      scrollStateRef.current.totalProgress = 0;
      scrollStateRef.current.storyRecess = 0;
      scrollStateRef.current.horizonSweep = 0;
      return;
    }

    const ctx = gsap.context(() => {
      // Master page progress tracker
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollStateRef.current.totalProgress = self.progress;
        }
      });

      // Gently recess planets during Section B ("The Human Footprint")
      if (secB) {
        ScrollTrigger.create({
          trigger: secB,
          start: 'top 85%',
          end: 'top 25%',
          scrub: true,
          onUpdate: (self) => {
            scrollStateRef.current.storyRecess = self.progress * 0.9;
          }
        });

        gsap.from(secB.querySelectorAll('[data-reveal="plate"]'), {
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: secB,
            start: 'top 76%',
            once: true
          }
        });
      }

      // Section C horizontal scroll-driven gallery on desktop viewports (>= 1024px)
      const mm = gsap.matchMedia();
      if (secC && track && viewport) {
        mm.add('(min-width: 1024px)', () => {
          const getDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth + 48);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: secC,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              end: () => `+=${Math.max(900, getDistance())}`,
              onUpdate: (self) => {
                scrollStateRef.current.storyRecess = 0.92;
                scrollStateRef.current.horizonSweep = (self.progress - 0.5) * 1.4;
              },
              onLeave: () => {
                scrollStateRef.current.horizonSweep = 0;
              },
              onLeaveBack: () => {
                scrollStateRef.current.horizonSweep = 0;
              }
            }
          });
        });

        mm.add('(max-width: 1023px)', () => {
          ScrollTrigger.create({
            trigger: secC,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            onUpdate: (self) => {
              scrollStateRef.current.storyRecess = 0.85;
              scrollStateRef.current.horizonSweep = (self.progress - 0.5) * 0.8;
            }
          });
        });
      }

      // Bring Moon and Mars back into prominent foreground focus in Section D ("Choose Your World")
      if (secD) {
        ScrollTrigger.create({
          trigger: secD,
          start: 'top 85%',
          end: 'top 25%',
          scrub: true,
          onUpdate: (self) => {
            scrollStateRef.current.storyRecess = (1 - self.progress) * 0.9;
            scrollStateRef.current.horizonSweep = (1 - self.progress) * 0.2;
          }
        });
      }
    }, root);

    return () => {
      ctx.revert();
      scrollStateRef.current.totalProgress = 0;
      scrollStateRef.current.storyRecess = 0;
      scrollStateRef.current.horizonSweep = 0;
    };
  }, [scrollStateRef]);

  const scrollToFootprint = () => {
    sectionBRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nudgeMobileTimeline = (direction: -1 | 1) => {
    const el = timelineViewportRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(440, el.clientWidth * 0.82), behavior: 'smooth' });
  };

  return (
    <div ref={rootRef} className="relative z-10 pointer-events-none text-slate-100">
      {/* ===================================================================== */}
      {/* SECTION A — FULL-SCREEN DEEP SPACE MUSEUM ENTRANCE                    */}
      {/* ===================================================================== */}
      <section
        aria-label="Museum Entrance"
        className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between px-4 sm:px-8 pt-6 pb-8 sm:pt-9 sm:pb-10"
      >
        {/* Top subtle vignette ensures crisp contrast without hiding the 3D scene */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#04060a]/85 via-[#04060a]/45 to-transparent -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#04060a]/90 via-[#04060a]/45 to-transparent -z-10"
          aria-hidden="true"
        />

        {/* Editorial Headline & Mission Brief */}
        <div
          className={`max-w-3xl mx-auto text-center space-y-3 transition-all duration-500 ${
            enteringWorld ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-[11px] sm:text-xs tracking-[0.24em] text-cyan-300 font-medium uppercase">
            A DIGITAL MUSEUM OF HUMAN SPACE HERITAGE · 1958–2026
          </p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white [text-wrap:balance] leading-[1.06]">
            HUMANITY LEFT TRACES BEYOND EARTH.
          </h1>
          <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore the machines, instruments, landing sites and remnants of human missions across the Moon and Mars. Travel through interactive 3D environments, discover where these artifacts remain, and explore the photographs, mission records and scientific evidence documenting their journeys.
          </p>
        </div>

        {/* Open Center Window: 3D Moon & Mars occupy the hero unobstructed */}
        <div className="min-h-[200px] sm:min-h-[260px]" aria-hidden="true" />

        {/* Bottom Primary World Destinations & Scroll Cue */}
        <div
          className={`max-w-7xl w-full mx-auto space-y-5 transition-all duration-500 ${
            enteringWorld ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end">
            {/* THE MOON */}
            <div className="pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <div className="space-y-0.5">
                <div className="text-xs tracking-[0.2em] uppercase font-semibold text-white">
                  THE MOON
                </div>
                <div className="text-xs text-slate-300 font-mono-tabular">
                  {moonArtifactCount} Historical Surface Entries · 1959–2023
                </div>
              </div>
              <button
                type="button"
                onMouseEnter={() => onHoverWorld('Moon')}
                onMouseLeave={() => onHoverWorld(null)}
                onFocus={() => onHoverWorld('Moon')}
                onBlur={() => onHoverWorld(null)}
                onClick={() => onSelectWorld('Moon')}
                className={`group inline-flex items-center gap-3 px-6 py-3 rounded-md border text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  hoveredWorld === 'Moon'
                    ? 'border-cyan-400 bg-cyan-400/18 text-white shadow-[0_0_26px_rgba(34,211,238,0.22)]'
                    : 'border-white/25 bg-[#060a12]/90 text-slate-100 hover:border-cyan-400/80'
                }`}
              >
                <span>EXPLORE THE MOON</span>
                <ArrowRight
                  className="w-4 h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* MARS */}
            <div className="pointer-events-auto flex flex-col items-center md:items-end text-center md:text-right space-y-2">
              <div className="space-y-0.5">
                <div className="text-xs tracking-[0.2em] uppercase font-semibold text-white">
                  MARS
                </div>
                <div className="text-xs text-slate-300 font-mono-tabular">
                  {marsArtifactCount} Historical Surface Entries · 1971–2021
                </div>
              </div>
              <button
                type="button"
                onMouseEnter={() => onHoverWorld('Mars')}
                onMouseLeave={() => onHoverWorld(null)}
                onFocus={() => onHoverWorld('Mars')}
                onBlur={() => onHoverWorld(null)}
                onClick={() => onSelectWorld('Mars')}
                className={`group inline-flex items-center gap-3 px-6 py-3 rounded-md border text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  hoveredWorld === 'Mars'
                    ? 'border-cyan-400 bg-cyan-400/18 text-white shadow-[0_0_26px_rgba(34,211,238,0.22)]'
                    : 'border-white/25 bg-[#060a12]/90 text-slate-100 hover:border-cyan-400/80'
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

          <div className="flex justify-center">
            <button
              type="button"
              onClick={scrollToFootprint}
              className="pointer-events-auto inline-flex flex-col items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-slate-400 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <span>Scroll to enter gallery</span>
              <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION B — THE HUMAN FOOTPRINT (VERIFIED AGENCY PLATES)             */}
      {/* ===================================================================== */}
      <section
        ref={sectionBRef}
        aria-labelledby="section-footprint-title"
        className="relative py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-[#04060a]/30 via-[#05070b]/82 to-[#05070b]/88 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-10 pointer-events-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="text-[11px] tracking-[0.22em] uppercase text-cyan-300 font-medium">
                Exhibition Wing I · The Human Footprint
              </div>
              <h2
                id="section-footprint-title"
                className="font-display text-3xl sm:text-5xl font-semibold text-white [text-wrap:balance]"
              >
                Captured Directly on Another World
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Every photograph below is an authentic surface or orbital reconnaissance frame archived by NASA, the Soviet Space Program, CNSA, and ISRO—linking directly to the verified coordinates and hardware where history rests.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateView('archive')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/20 bg-[#0b101b] hover:border-cyan-400/60 text-xs font-semibold tracking-wider uppercase text-slate-100 transition-colors"
            >
              <span>Browse All {moonArtifactCount + marsArtifactCount} Artifacts</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlates.map((plate) => {
              const primaryLocId = plate.locationIds[0];
              const primaryArtId = plate.artifactIds[0];
              return (
                <div
                  key={plate.id}
                  data-reveal="plate"
                  className="flex flex-col space-y-2.5"
                >
                  <ArchivalImage
                    item={plate}
                    aspectClass="aspect-[16/10]"
                    onInspect={setInspectedMedia}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                    {primaryLocId && (
                      <button
                        type="button"
                        onClick={() => onOpenLocationById(plate.body, primaryLocId)}
                        className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Inspect Site on 3D {plate.body}</span>
                      </button>
                    )}
                    {primaryArtId && (
                      <button
                        type="button"
                        onClick={() => onOpenArtifactById(primaryArtId)}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
                      >
                        <span>Artifact Monograph</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION C — DECADES OF EXPLORATION (GSAP HORIZONTAL ERA GALLERY)      */}
      {/* ===================================================================== */}
      <section
        ref={sectionCRef}
        aria-labelledby="section-decades-title"
        className="relative py-16 sm:py-20 px-4 sm:px-8 bg-[#05070b]/82 border-t border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-8 pointer-events-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="text-[11px] tracking-[0.22em] uppercase text-cyan-300 font-medium">
                Exhibition Wing II · Decades of Exploration
              </div>
              <h2
                id="section-decades-title"
                className="font-display text-3xl sm:text-5xl font-semibold text-white [text-wrap:balance]"
              >
                Sixty-Seven Years of Surface History
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                From the earliest metallic impactors of 1959 to autonomous far-side landers and Martian rotorcraft, trace humanity’s expanding presence across five historical chapters.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex lg:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => nudgeMobileTimeline(-1)}
                  className="p-2 rounded-md border border-white/15 bg-[#0b101b] text-slate-200 hover:border-cyan-400/60"
                  aria-label="Scroll earlier eras"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => nudgeMobileTimeline(1)}
                  className="p-2 rounded-md border border-white/15 bg-[#0b101b] text-slate-200 hover:border-cyan-400/60"
                  aria-label="Scroll later eras"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onNavigateView('missions')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-[#0b101b] hover:border-cyan-400/60 text-xs font-medium text-slate-100 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                <span>Full Mission Timeline</span>
              </button>
            </div>
          </div>

          <div
            ref={timelineViewportRef}
            className="overflow-x-auto lg:overflow-hidden pb-2 snap-x snap-mandatory lg:snap-none"
          >
            <div
              ref={timelineTrackRef}
              className="flex flex-nowrap gap-6 w-max will-change-transform"
            >
              {ERA_CHAPTERS.map((era, index) => {
                const plate = mediaById[era.plateId];
                const eraMissions = era.missionIds
                  .map((id) => missionsById[id])
                  .filter((m): m is MissionRecord => Boolean(m));

                return (
                  <article
                    key={era.id}
                    className="snap-start shrink-0 w-[85vw] sm:w-[430px] lg:w-[460px] border border-white/12 bg-[#090d16]/94 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {plate && (
                        <div className="relative h-48 bg-[#05070b] overflow-hidden border-b border-white/10">
                          <img
                            src={plate.url}
                            alt={plate.alt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-gradient-to-t from-[#05070b] via-[#05070b]/80 to-transparent flex items-center justify-between text-[11px] font-mono-tabular text-slate-300">
                            <span>{plate.catalogId}</span>
                            <span>{plate.agency}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono-tabular text-cyan-300">
                          <span>Chapter {String(index + 1).padStart(2, '0')}</span>
                          <span>{era.span}</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                            {era.title}
                          </h3>
                          <p className="text-xs font-medium text-slate-400">{era.subtitle}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {era.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-white/10 space-y-2">
                      <div className="text-[11px] tracking-[0.16em] uppercase text-slate-400 font-medium">
                        Documented Missions in Chapter
                      </div>
                      <div className="space-y-1.5">
                        {eraMissions.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-md bg-[#0e1422] border border-white/8 text-xs"
                          >
                            <button
                              type="button"
                              onClick={() => onOpenMission(m.id)}
                              className="text-left text-slate-100 hover:text-cyan-300 font-medium truncate transition-colors"
                            >
                              {m.arrivalDate ?? m.year} · {m.name}
                            </button>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-mono-tabular text-slate-400">
                                {m.body}
                              </span>
                              {m.hasConfirmedCoordinates && m.locationId && (
                                <button
                                  type="button"
                                  onClick={() => onOpenLocationById(m.body, m.locationId!)}
                                  className="text-[11px] text-cyan-300 hover:text-cyan-200 whitespace-nowrap"
                                  aria-label={`Locate ${m.name} on 3D ${m.body} globe`}
                                >
                                  3D Site
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION D — CHOOSE YOUR WORLD & MUSEUM FOOTER                         */}
      {/* ===================================================================== */}
      <section
        ref={sectionDRef}
        aria-labelledby="section-choose-title"
        className="relative min-h-[78vh] flex flex-col justify-between pt-20 pb-8 px-4 sm:px-8 bg-gradient-to-b from-[#05070b]/85 via-transparent to-[#04060a]/92 border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4 pointer-events-auto">
          <div className="text-[11px] tracking-[0.24em] uppercase text-cyan-300 font-medium">
            Begin Interactive Surface Survey
          </div>
          <h2
            id="section-choose-title"
            className="font-display text-4xl sm:text-6xl font-semibold text-white [text-wrap:balance]"
          >
            Choose Your World
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Inspect verified surface coordinates on an interactive 3D globe, adjust solar lighting across craters and basins, or consult the complete verified catalog across both worlds.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onMouseEnter={() => onHoverWorld('Moon')}
              onMouseLeave={() => onHoverWorld(null)}
              onClick={() => onSelectWorld('Moon')}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-md border border-cyan-400/50 bg-[#070d18]/92 hover:border-cyan-300 hover:bg-cyan-400/15 text-sm font-semibold tracking-wider text-white transition-all"
            >
              <span>EXPLORE THE MOON</span>
              <span className="text-xs font-mono-tabular text-cyan-300">({moonArtifactCount})</span>
              <ArrowRight
                className="w-4 h-4 text-cyan-300 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onMouseEnter={() => onHoverWorld('Mars')}
              onMouseLeave={() => onHoverWorld(null)}
              onClick={() => onSelectWorld('Mars')}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-md border border-cyan-400/50 bg-[#070d18]/92 hover:border-cyan-300 hover:bg-cyan-400/15 text-sm font-semibold tracking-wider text-white transition-all"
            >
              <span>EXPLORE MARS</span>
              <span className="text-xs font-mono-tabular text-cyan-300">({marsArtifactCount})</span>
              <ArrowRight
                className="w-4 h-4 text-cyan-300 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => onNavigateView('archive')}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-md border border-white/20 bg-[#0a0f1a]/92 hover:border-white/40 text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              <Globe2 className="w-4 h-4 text-slate-300" aria-hidden="true" />
              <span>BROWSE GLOBAL ARCHIVE</span>
            </button>
          </div>
        </div>

        {/* Quiet Editorial Museum Footer */}
        <footer className="pointer-events-auto max-w-7xl w-full mx-auto mt-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span>
            RE:SPACE — Interactive Digital Museum of Human Space Heritage (1958–2026)
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigateView('sources')}
              className="hover:text-white transition-colors"
            >
              Sources &amp; Fact-Checks
            </button>
            <button
              type="button"
              onClick={() => onNavigateView('science')}
              className="hover:text-white transition-colors"
            >
              Science Guides
            </button>
            <button
              type="button"
              onClick={() => onNavigateView('missions')}
              className="hover:text-white transition-colors"
            >
              Mission Timeline
            </button>
            <button
              type="button"
              onClick={() => onNavigateView('archive')}
              className="hover:text-white transition-colors"
            >
              Global Archive
            </button>
          </div>
        </footer>
      </section>

      <ArchivalLightbox
        item={inspectedMedia}
        onClose={() => setInspectedMedia(null)}
      />
    </div>
  );
};
