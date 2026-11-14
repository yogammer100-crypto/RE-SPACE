import React from 'react';
import { CheckCircle2, AlertTriangle, ExternalLink, FileText } from 'lucide-react';
import { FactCheckNote, SourceRecord } from '../../types/space';
import { RESEARCH_REPORT_URL } from '../../data/sources';

interface ResearchLibraryViewProps {
  sources: SourceRecord[];
  factChecks: FactCheckNote[];
}

export const ResearchLibraryView: React.FC<ResearchLibraryViewProps> = ({
  sources,
  factChecks
}) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#05070b] text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
        <header className="pb-6 border-b border-white/10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-cyan-300 font-medium">
              Research Library & Source Register
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mt-2">
              Evidence, Citations & Fact-Checks
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Every coordinate, mission outcome, and artifact status in RE:SPACE is grounded in primary agency catalogs and the compiled research dossier. External repositories open directly at their authoritative source.
            </p>
          </div>

          <a
            href={RESEARCH_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Open Primary Research Report PDF</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </header>

        {/* Source Register */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Verified Source Register ({sources.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src) => (
              <div
                key={src.id}
                className="border border-white/10 bg-[#0b101b] rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                    <span className="text-cyan-300 font-medium">{src.documentType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{src.relatedBody}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">
                      {src.publicationDate ?? 'Date Unknown'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {src.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {src.authorOrOrg} · <span className="font-mono-tabular">{src.citationTag}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {src.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 truncate">
                    Missions: {src.relatedMissions.slice(0, 3).join(', ')}
                    {src.relatedMissions.length > 3 ? '…' : ''}
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium whitespace-nowrap shrink-0"
                  >
                    <span>{src.isLocalAsset ? 'View Local PDF' : 'Open External Source'}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fact-Check & Flagged Uncertainty Audit */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Fact-Check & Uncertainty Audit
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Corrections and open coordinate/status flags documented in the RE:SPACE research report are surfaced explicitly rather than hidden or estimated.
            </p>
          </div>

          <div className="space-y-3">
            {factChecks.map((fc) => {
              const isFlag = fc.status === 'Flagged Uncertainty';
              return (
                <div
                  key={fc.id}
                  className="border border-white/10 bg-[#0b101b] rounded-xl p-5 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{fc.subject}</h3>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        isFlag ? 'text-amber-300' : 'text-cyan-300'
                      }`}
                    >
                      {isFlag ? (
                        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      <span>{fc.status}</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Claim / Question Reviewed: {fc.claimReviewed}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {fc.verifiedFinding}
                  </p>
                  <div className="text-[11px] font-mono-tabular text-slate-400">
                    Citation Reference: {fc.citationRef}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
