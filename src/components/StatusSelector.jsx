import React from 'react';

const recessiveOptions = [
  { value: 'homo', label: '纯合 (nn)', desc: '完全表现' },
  { value: 'het',  label: 'Het (Nn)', desc: '携带不表现' },
];

const codominantOptions = [
  { value: 'super', label: '超级体', desc: '纯合 Super' },
  { value: 'het',   label: '杂合',   desc: '单拷贝表现' },
];

export default function StatusSelector({ gene, currentState, onChange }) {
  const options = gene.type === 'recessive' ? recessiveOptions
    : gene.type === 'codominant' ? codominantOptions
    : [];

  if (options.length === 0) return null;

  return (
    <div className="flex gap-1.5 mt-1">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`
            px-2.5 py-1 rounded text-xs font-medium border transition-all
            ${currentState === opt.value
              ? 'bg-white/20 border-white/40 text-white'
              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'}
          `}
          onClick={() => onChange(gene.id, opt.value)}
          title={opt.desc}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
