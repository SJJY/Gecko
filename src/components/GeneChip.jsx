import React from 'react';

const typeColors = {
  recessive:  'bg-violet-600/80 border-violet-400',
  dominant:   'bg-amber-600/80 border-amber-400',
  codominant: 'bg-emerald-600/80 border-emerald-400',
  selective:  'bg-sky-600/80 border-sky-400',
};

const typeColorsSelected = {
  recessive:  'bg-violet-500 border-violet-300 ring-2 ring-violet-400/50',
  dominant:   'bg-amber-500 border-amber-300 ring-2 ring-amber-400/50',
  codominant: 'bg-emerald-500 border-emerald-300 ring-2 ring-emerald-400/50',
  selective:  'bg-sky-500 border-sky-300 ring-2 ring-sky-400/50',
};

export default function GeneChip({ gene, selected, disabled, onClick }) {
  const base = 'px-3 py-1.5 rounded-full border text-sm font-medium transition-all cursor-pointer select-none';
  const disabledStyle = 'opacity-30 cursor-not-allowed';

  let colorClass = selected
    ? typeColorsSelected[gene.type] || typeColorsSelected.recessive
    : typeColors[gene.type] || typeColors.recessive;

  return (
    <button
      type="button"
      className={`${base} ${colorClass} ${disabled ? disabledStyle : 'hover:scale-105'}`}
      onClick={() => !disabled && onClick(gene)}
      disabled={disabled}
      title={disabled ? '与已选基因互斥' : gene.name}
    >
      {gene.name}
    </button>
  );
}
