import { useMemo } from 'react';
import { geneMap } from '../data/genes.js';
import { calcSingleGene } from '../engine/punnett.js';
import { combineResults } from '../engine/combiner.js';
import { matchComboMorphs } from '../engine/comboMatcher.js';

/**
 * 核心 Hook：输入双亲基因配置 → 输出子代概率结果
 *
 * @param {Object} fatherGenes - { [geneId]: state }  例如 { tremper: "homo", macksnow: "het" }
 * @param {Object} motherGenes - { [geneId]: state }
 * @param {string[]} fatherSelective - 父本选育基因 ID 列表
 * @param {string[]} motherSelective - 母本选育基因 ID 列表
 * @returns {{ results: Array, selectiveTags: string[] }}
 */
export function useBreeding(fatherGenes, motherGenes, fatherSelective, motherSelective) {
  const results = useMemo(() => {
    // 收集所有参与计算的基因 ID（取两亲本的并集，排除 selective）
    const allGeneIds = new Set([
      ...Object.keys(fatherGenes),
      ...Object.keys(motherGenes),
    ]);

    if (allGeneIds.size === 0) return [];

    // 对每个基因独立计算 Punnett 结果
    const geneResults = [];
    for (const geneId of allGeneIds) {
      const gene = geneMap[geneId];
      if (!gene || gene.type === "selective") continue;

      const fState = fatherGenes[geneId] || getDefaultState(gene.type);
      const mState = motherGenes[geneId] || getDefaultState(gene.type);

      const outcomes = calcSingleGene(gene.type, fState, mState);
      if (outcomes.length > 0) {
        geneResults.push({
          geneId,
          geneName: gene.name,
          type: gene.type,
          outcomes,
        });
      }
    }

    // 笛卡尔积合并
    const combined = combineResults(geneResults);

    // 为每个组合匹配复合品相
    const selectiveTags = mergeSelectiveTags(fatherSelective, motherSelective);

    return combined.map(combo => ({
      ...combo,
      comboMorphs: matchComboMorphs(combo.genes, selectiveTags),
      selectiveTags,
    }));
  }, [fatherGenes, motherGenes, fatherSelective, motherSelective]);

  const selectiveTags = useMemo(
    () => mergeSelectiveTags(fatherSelective, motherSelective),
    [fatherSelective, motherSelective]
  );

  return { results, selectiveTags };
}

function getDefaultState(type) {
  switch (type) {
    case "recessive":   return "none";
    case "dominant":    return "absent";
    case "codominant":  return "none";
    default:            return "none";
  }
}

function mergeSelectiveTags(fatherSelective, motherSelective) {
  return [...new Set([...fatherSelective, ...motherSelective])];
}
