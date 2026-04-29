/**
 * 多基因笛卡尔积合并器
 * 将每个独立基因的 Punnett 结果做笛卡尔积，概率相乘
 * 优化：
 *   - 浮点精度截断（避免 0.1250000000002 这类值）
 *   - 合并相同基因型的结果，概率相加
 *   - 过滤极小概率结果
 */

const EPSILON = 1e-10;

/** 截断浮点精度到最多 12 位有效数字 */
function trimFloat(n) {
  if (n === 0 || n === 1) return n;
  return parseFloat(n.toPrecision(12));
}

/** 生成基因组合的唯一键，用于合并相同基因型 */
function makeGeneKey(genesObj) {
  const pairs = Object.entries(genesObj)
    .map(([id, info]) => `${id}:${info.state}`)
    .sort();
  return pairs.join('|');
}

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
          probability: trimFloat(combo.probability * outcome.probability),
        });
      }
    }
    combos = newCombos;
  }

  // 合并相同基因型 — 概率相加
  const merged = new Map();
  for (const combo of combos) {
    if (combo.probability <= EPSILON) continue;
    const key = makeGeneKey(combo.genes);
    if (merged.has(key)) {
      merged.get(key).probability = trimFloat(
        merged.get(key).probability + combo.probability
      );
    } else {
      merged.set(key, { genes: combo.genes, probability: combo.probability });
    }
  }

  const result = Array.from(merged.values());

  // 概率归一化（防止浮点累积误差导致总和不为1）
  const total = result.reduce((sum, c) => sum + c.probability, 0);
  if (total > 0 && Math.abs(total - 1) > EPSILON) {
    for (const c of result) {
      c.probability = trimFloat(c.probability / total);
    }
  }

  // 按概率降序排列
  return result.sort((a, b) => b.probability - a.probability);
}
