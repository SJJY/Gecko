import React from 'react';
import { genesByType } from '../data/genes.js';
import { geneTypeMap } from '../data/rules.js';
import GeneChip from './GeneChip.jsx';
import StatusSelector from './StatusSelector.jsx';

const typeOrder = ['recessive', 'dominant', 'codominant', 'selective'];

const typeBadgeColors = {
  recessive:  'text-violet-300',
  dominant:   'text-amber-300',
  codominant: 'text-emerald-300',
  selective:  'text-sky-300',
};

export default function GenePicker({
  selectedGenes,   // { [geneId]: state }
  selectiveGenes,  // string[]
  disabledGenes,   // Set<string>
  onToggleGene,
  onChangeState,
  onToggleSelective,
}) {
  return (
    <div className="space-y-4">
      {typeOrder.map(type => {
        const genes = genesByType[type];
        if (!genes || genes.length === 0) return null;

        return (
          <div key={type}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${typeBadgeColors[type]}`}>
              {geneTypeMap[type]}
            </h4>

            <div className="flex flex-wrap gap-2">
              {genes.map(gene => {
                const isSelective = type === 'selective';
                const selected = isSelective
                  ? selectiveGenes.includes(gene.id)
                  : !!selectedGenes[gene.id];
                const disabled = disabledGenes.has(gene.id);

                return (
                  <div key={gene.id} className="flex flex-col items-start">
                    <GeneChip
                      gene={gene}
                      selected={selected}
                      disabled={disabled}
                      onClick={() => {
                        if (isSelective) {
                          onToggleSelective(gene.id);
                        } else {
                          onToggleGene(gene);
                        }
                      }}
                    />
                    {selected && !isSelective && (
                      <StatusSelector
                        gene={gene}
                        currentState={selectedGenes[gene.id]}
                        onChange={onChangeState}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
