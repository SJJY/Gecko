/**
 * 全局规则（写死在代码里）
 */

export const geneTypeMap = {
  recessive:  "隐性",
  dominant:   "显性",
  codominant: "共显性",
  selective:  "多基因选育",
};

// 互斥黑名单：不能同时存在（白化三系互斥）
export const conflictGroups = [
  ["tremper", "bell"],
  ["tremper", "rainwater"],
  ["bell", "rainwater"],
];

// 共显性超级体列表
export const superGeneList = [
  "macksnow", "lemonfrost", "ghost", "granite", "purplehead", "wraith", "hypo"
];

// 选育基因（不参与孟德尔概率计算）
export const selectiveGeneList = [
  "tangelo", "tangerine", "carrottail", "striped", "bold", "highcolor", "lavender",
  "reverse_stripe", "jungle", "bandit", "mosaic", "calico",
  "orange_ghost", "yellow_ghost", "blackpearl", "copper", "saffron",
  "mandarin", "red_ridge", "cream", "mocha", "chocolate", "charcoal",
  "ash", "midnight", "smoky", "cinnamon", "rust",
  "sand", "desert", "stone", "earth",
];
