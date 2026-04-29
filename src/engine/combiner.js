/**
 * 多基因笛卡尔积合并器
 * 将每个独立基因的 Punnett 结果做笛卡尔积，概率相乘
 */

/**
 * @param {Array<{geneId: string, geneName: string, type: string, outcomes: Array<{state: string, probability: number, label: string}>}>} geneResults
 * @returns {Array<{genes: Object, probability: number}>}
 *   genes: { [geneId]: { state, label, geneName, type } }
 */
export function combineResults(geneResults) {
  if (geneResults.length === 0) return [];

  // 从第一个基因开始，逐步笛卡尔积
  let combos = [{ genes: {}, probability: 1 }];

  for (const { geneId, geneName, type, outcomes } of geneResults) {
    const newCombos = [];
    for (const combo of combos) {
      for (const outcome of outcomes) {
        newCombos.push({
          genes: {
            ...combo.genes,
            [geneId]: {
              state: outcome.state,
              label: outcome.label,
              geneName,
              type,
            },
          },
          probability: combo.probability * outcome.probability,
        });
      }
    }
    combos = newCombos;
  }

  // 过滤概率为 0 的，按概率降序排列
  return combos
    .filter(c => c.probability > 0)
    .sort((a, b) => b.probability - a.probability);
}
