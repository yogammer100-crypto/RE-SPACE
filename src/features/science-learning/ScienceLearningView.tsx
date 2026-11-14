import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MissionRecord, ScienceTopic } from '../../types/space';

interface ScienceLearningViewProps {
  topics: ScienceTopic[];
  missionsById: Record<string, MissionRecord>;
  onOpenMission: (missionId: string) => void;
}

export const ScienceLearningView: React.FC<ScienceLearningViewProps> = ({
  topics,
  missionsById,
  onOpenMission
}) => {
  const [selectedId, setSelectedId] = useState(topics[0]?.id ?? '');
  const activeTopic = topics.find((t) => t.id === selectedId) ?? topics[0];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#05070b] text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        <header className="pb-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-cyan-300 font-medium">
            Science & Engineering Primer
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mt-2">
            How Humanity Explores Surface Worlds
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Explore the physics, engineering, and planetary geodesy behind the artifacts on the Moon and Mars. Each module strictly separates general scientific explanations from verified mission-specific records.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Topic Index */}
          <nav
            aria-label="Science Topics"
            className="lg:col-span-4 space-y-2"
          >
            {topics.map((topic, idx) => {
              const active = topic.id === activeTopic?.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedId(topic.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    active
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-white/10 bg-[#0b101b] hover:border-white/25'
                  }`}
                >
                  <div className="text-[11px] font-mono-tabular text-cyan-300">
                    0{idx + 1}. {topic.category}
                  </div>
                  <div className="text-sm font-semibold text-white mt-1 leading-snug">
                    {topic.title}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Topic Essay */}
          {activeTopic && (
            <article className="lg:col-span-8 border border-white/10 bg-[#0b101b] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-xs text-cyan-300 font-medium">
                  {activeTopic.category}
                </div>
                <h2 className="font-display text-3xl font-semibold text-white mt-1">
                  {activeTopic.title}
                </h2>
                <p className="text-base text-slate-200 mt-3 leading-relaxed max-w-prose">
                  {activeTopic.summary}
                </p>
              </div>

              <section className="pt-5 border-t border-white/10 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>General Scientific & Engineering Principles</span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-prose">
                  {activeTopic.generalPrinciple}
                </p>
              </section>

              <section className="pt-5 border-t border-white/10 space-y-2">
                <div className="text-xs uppercase tracking-wider text-cyan-300 font-medium">
                  Verified Mission-Specific Context (From Research Dataset)
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-prose">
                  {activeTopic.missionSpecificContext}
                </p>
              </section>

              <section className="pt-5 border-t border-white/10 space-y-3">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Referenced Surface Missions
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeTopic.relatedMissionIds.map((mid) => {
                    const m = missionsById[mid];
                    if (!m) return null;
                    return (
                      <button
                        key={mid}
                        type="button"
                        onClick={() => onOpenMission(mid)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/15 bg-[#111827] hover:border-cyan-400/60 text-xs text-slate-200 transition-colors"
                      >
                        <span>{m.name}</span>
                        <ArrowRight className="w-3 h-3 text-cyan-300" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </section>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
