import React, { useEffect, useState } from 'react';
import { ExternalLink, ImageOff, Maximize2, X } from 'lucide-react';
import { MediaItem } from '../types/space';

interface ArchivalImageProps {
  item: MediaItem;
  aspectClass?: string;
  compact?: boolean;
  onInspect?: (item: MediaItem) => void;
}

export const ArchivalImage: React.FC<ArchivalImageProps> = ({
  item,
  aspectClass = 'aspect-[16/10]',
  compact = false,
  onInspect
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const isActualSurfaceOrOrbital =
    item.mediaClass === 'Surface Photograph' || item.mediaClass === 'Orbital Reconnaissance';

  const classLabelColor = isActualSurfaceOrOrbital
    ? 'text-cyan-300'
    : item.mediaClass === 'Spacecraft Photograph'
      ? 'text-slate-200'
      : 'text-amber-300';

  return (
    <figure className="group border border-white/10 bg-[#090d16] rounded-xl overflow-hidden flex flex-col">
      <div className={`relative w-full ${aspectClass} bg-[#060910] overflow-hidden`}>
        {errored ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center space-y-2.5 bg-[#080c14]">
            <ImageOff className="w-6 h-6 text-slate-500" aria-hidden="true" />
            <div className="text-xs font-medium text-slate-300">
              Archival image stream unavailable ({item.catalogId})
            </div>
            <a
              href={item.sourcePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200"
            >
              <span>Consult {item.agency} record</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            {!loaded && (
              <div className="absolute inset-0 bg-[#0b101b] animate-pulse" aria-hidden="true" />
            )}
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'
              } ${onInspect ? 'group-hover:scale-[1.02]' : ''}`}
            />
            {onInspect && (
              <button
                type="button"
                onClick={() => onInspect(item)}
                aria-label={`Inspect ${item.title} in full-resolution viewer`}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/20 bg-[#05070b]/90 text-[11px] font-medium text-slate-100 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 transition-opacity hover:border-cyan-400/70"
              >
                <Maximize2 className="w-3 h-3 text-cyan-300" aria-hidden="true" />
                <span>Inspect Plate</span>
              </button>
            )}
          </>
        )}
      </div>

      <figcaption className={`${compact ? 'p-3.5' : 'p-4 sm:p-5'} space-y-2 flex-1 flex flex-col justify-between`}>
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono-tabular flex flex-wrap items-center gap-x-2 gap-y-0.5 text-slate-400">
            <span className={`font-sans font-semibold uppercase tracking-wider ${classLabelColor}`}>
              {item.mediaClass}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.catalogId}</span>
            {item.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>{item.date}</span>
              </>
            )}
          </div>

          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-white leading-snug`}>
            {item.title}
          </h3>

          {!compact && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.caption}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-[11px] text-slate-400">
          <span className="truncate">{item.agency}</span>
          <a
            href={item.sourcePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 whitespace-nowrap shrink-0"
          >
            <span>Source</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </figcaption>
    </figure>
  );
};

interface ArchivalLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const ArchivalLightbox: React.FC<ArchivalLightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-plate-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] flex flex-col border border-white/15 bg-[#080c14] rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-mono-tabular text-cyan-300 uppercase tracking-wider">
              {item.mediaClass} · {item.catalogId} {item.date ? `· ${item.date}` : ''}
            </div>
            <h2
              id="lightbox-plate-title"
              className="text-sm sm:text-base font-semibold text-white truncate mt-0.5"
            >
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
            aria-label="Close photograph inspection viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 bg-[#04060a] flex items-center justify-center overflow-auto p-3 sm:p-6">
          <img
            src={item.url}
            alt={item.alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[64vh] object-contain rounded"
          />
        </div>

        <div className="px-5 py-4 border-t border-white/10 bg-[#0b101b] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="space-y-1 max-w-3xl">
            <p className="text-slate-200 leading-relaxed">{item.caption}</p>
            <div className="text-[11px] text-slate-400">{item.agency}</div>
          </div>
          <a
            href={item.sourcePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-200 font-medium whitespace-nowrap shrink-0"
          >
            <span>Open Agency Record</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
