import { conflictGroups } from '../data/rules.js';
import { geneMap } from '../data/genes.js';

const validStates = {
  recessive:   new Set(['homo', 'het', 'none']),
  dominant:    new Set(['present', 'absent']),
  codominant:  new Set(['super', 'het', 'none']),
  selective:   new Set(['present']),
};

/**
 * 校验一组选中的基因 ID 是否存在互斥冲突
 * @param {string[]} selectedGeneIds - 当前选中的基因 ID 列表
 * @returns {Array<{genes: string[], message: string}>} 冲突列表
 */
export function validateConflicts(selectedGeneIds) {
  const conflicts = [];
  const idSet = new Set(selectedGeneIds);

  for (const group of conflictGroups) {
    const present = group.filter(id => idSet.has(id));
    if (present.length >= 2) {
      conflicts.push({
        genes: present,
        message: `${present.join(' 与 ')} 互斥，不能同时存在（白化三系互斥）`,
      });
    }
  }

  return conflicts;
}

/**
 * 校验某个基因的状态是否合法
 * @param {string} geneId
 * @param {string} state
 * @returns {boolean}
 */
export function isValidState(geneId, state) {
  const gene = geneMap[geneId];
  if (!gene) return false;
  const allowed = validStates[gene.type];
  if (!allowed) return false;
  return allowed.has(state);
}

/**
 * 给定当前已选基因，返回应被禁用的基因 ID 集合
 * @param {string[]} selectedGeneIds
 * @returns {Set<string>}
 */
export function getDisabledGenes(selectedGeneIds) {
  const disabled = new Set();
  const idSet = new Set(selectedGeneIds);

  for (const group of conflictGroups) {
    const present = group.filter(id => idSet.has(id));
    if (present.length > 0) {
      // 禁用组内其他未选中的基因
      for (const id of group) {
        if (!idSet.has(id)) {
          disabled.add(id);
        }
      }
    }
  }

  return disabled;
}
