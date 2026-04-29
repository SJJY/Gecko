import { comboMorphs } from '../data/comboMorphs.js';

/**
 * 判断某个基因状态是否达到了指定的最低表现要求
 */
function meetsMinState(actualState, minState, geneType) {
  if (geneType === "recessive") {
    // homo 才算表现
    if (minState === "homo") return actualState === "homo";
    return false;
  }
  if (geneType === "dominant") {
    if (minState === "present") return actualState === "present";
    return false;
  }
  if (geneType === "codominant") {
    // super > het > none
    const rank = { none: 0, het: 1, super: 2 };
    return (rank[actualState] || 0) >= (rank[minState] || 0);
  }
  // selective — 只要标记了就算
  if (minState === "present") return actualState === "present";
  return false;
}

/**
 * 给定子代的基因组合，匹配所有符合条件的复合品相名
 * @param {Object} genesObj - { [geneId]: { state, type, ... } }
 * @param {string[]} selectiveGenes - 该子代继承的选育基因 ID
 * @returns {Array<{id: string, name: string}>}
 */
export function matchComboMorphs(genesObj, selectiveGenes = []) {
  const matched = [];

  for (const combo of comboMorphs) {
    let allMet = true;

    for (const req of combo.requires) {
      const gene = genesObj[req.geneId];
      if (!gene) {
        // 检查选育基因
        if (selectiveGenes.includes(req.geneId)) {
          continue; // 选育基因有就算
        }
        allMet = false;
        break;
      }
      if (!meetsMinState(gene.state, req.minState, gene.type)) {
        allMet = false;
        break;
      }
    }

    if (allMet) {
      matched.push({ id: combo.id, name: combo.name });
    }
  }

  // 去掉被更高级 combo 包含的子集
  // 例如同时匹配了 RAPTOR 和 APTOR，APTOR 是 RAPTOR 的子集，只显示 RAPTOR
  return filterSubsets(matched);
}

function filterSubsets(matched) {
  if (matched.length <= 1) return matched;

  const comboMap = Object.fromEntries(comboMorphs.map(c => [c.id, c]));
  const result = [];

  for (const m of matched) {
    const mReqs = new Set(comboMap[m.id].requires.map(r => r.geneId));
    let isSubset = false;

    for (const other of matched) {
      if (other.id === m.id) continue;
      const otherReqs = new Set(comboMap[other.id].requires.map(r => r.geneId));
      // 如果 m 的需求是 other 的子集，且 other 更大，则 m 被包含
      if (mReqs.size < otherReqs.size && [...mReqs].every(r => otherReqs.has(r))) {
        isSubset = true;
        break;
      }
    }

    if (!isSubset) {
      result.push(m);
    }
  }

  return result;
}
