import React, { useCallback, useMemo } from 'react';
import GenePicker from './GenePicker.jsx';
import { getDisabledGenes } from '../engine/validator.js';

const defaultStates = {
  recessive:  'homo',
  dominant:   'present',
  codominant: 'het',
};

export default function ParentPanel({ label, icon, genes, selective, onGenesChange, onSelectiveChange }) {
  // genes: { [geneId]: state }
  // selective: string[]

  const disabledGenes = useMemo(
    () => getDisabledGenes(Object.keys(genes)),
    [genes]
  );

  const handleToggleGene = useCallback((gene) => {
    const newGenes = { ...genes };
    if (newGenes[gene.id]) {
      delete newGenes[gene.id];
    } else {
      newGenes[gene.id] = defaultStates[gene.type] || 'homo';
    }
    onGenesChange(newGenes);
  }, [genes, onGenesChange]);

  const handleChangeState = useCallback((geneId, state) => {
    onGenesChange({ ...genes, [geneId]: state });
  }, [genes, onGenesChange]);

  const handleToggleSelective = useCallback((geneId) => {
    const newSelective = selective.includes(geneId)
      ? selective.filter(id => id !== geneId)
      : [...selective, geneId];
    onSelectiveChange(newSelective);
  }, [selective, onSelectiveChange]);

  const selectedCount = Object.keys(genes).length + selective.length;

  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {label}
        </h3>
        {selectedCount > 0 && (
          <span className="text-xs bg-slate-600/50 px-2.5 py-1 rounded-full text-slate-300">
            已选 {selectedCount} 个基因
          </span>
        )}
      </div>

      <GenePicker
        selectedGenes={genes}
        selectiveGenes={selective}
        disabledGenes={disabledGenes}
        onToggleGene={handleToggleGene}
        onChangeState={handleChangeState}
        onToggleSelective={handleToggleSelective}
      />
    </div>
  );
}
