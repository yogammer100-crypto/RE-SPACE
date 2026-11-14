import React from 'react';

interface MarkerLegendProps {
  compact?: boolean;
}

export const MarkerLegend: React.FC<MarkerLegendProps> = ({ compact = false }) => {
  const items = [
    {
      label: 'Rover',
      shape: 'rotate-45 bg-cyan-400',
      desc: 'Mobile surface rover'
    },
    {
      label: 'Lander / Stage',
      shape: 'bg-slate-200',
      desc: 'Soft-landed craft or descent stage'
    },
    {
      label: 'Instrument',
      shape: 'rounded-full bg-cyan-300',
      desc: 'Seismometer / retroreflector'
    },
    {
      label: 'Impact / Debris',
      shape: 'rounded-full border-2 border-amber-400 bg-transparent',
      desc: 'Deliberate impact or crash debris'
    }
  ];

  return (
    <div
      className={`flex flex-wrap items-center ${
        compact ? 'gap-x-4 gap-y-1.5 text-[11px]' : 'gap-x-5 gap-y-2 text-xs'
      } text-slate-300`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-2 whitespace-nowrap"
          title={item.desc}
        >
          <span
            className={`inline-block w-2.5 h-2.5 shrink-0 ${item.shape}`}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
