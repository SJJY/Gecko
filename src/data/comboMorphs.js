/**
 * 复合品相命名映射表
 * 当子代同时表现 requires 中的所有基因时，自动匹配并显示 combo 名称
 * state 指定需要达到的最低表现状态：
 *   - 隐性: "homo" (纯合表现)
 *   - 共显性: "het" (杂合即表现) 或 "super" (需要纯合)
 *   - 显性: "present"
 */
export const comboMorphs = [
  {
    id: "raptor",
    name: "猛禽 RAPTOR",
    requires: [
      { geneId: "tremper",     minState: "homo" },
      { geneId: "eclipse",     minState: "homo" },
      { geneId: "patternless", minState: "homo" },
    ],
  },
  {
    id: "aptor",
    name: "暗黑猛禽 APTOR",
    requires: [
      { geneId: "tremper",  minState: "homo" },
      { geneId: "eclipse",  minState: "homo" },
    ],
  },
  {
    id: "hybino",
    name: "海白诺 Hybino",
    requires: [
      { geneId: "hypo",    minState: "het" },
      { geneId: "tremper", minState: "homo" },
    ],
  },
  {
    id: "sunglow",
    name: "日辉 Sunglow",
    requires: [
      { geneId: "tremper",   minState: "homo" },
      { geneId: "tangerine", minState: "present" },
    ],
  },
  {
    id: "tremper_bliz",
    name: "川普暴风雪",
    requires: [
      { geneId: "tremper",  minState: "homo" },
      { geneId: "blizzard", minState: "homo" },
    ],
  },
  {
    id: "bell_bliz",
    name: "贝尔暴风雪",
    requires: [
      { geneId: "bell",     minState: "homo" },
      { geneId: "blizzard", minState: "homo" },
    ],
  },
  {
    id: "rw_bliz",
    name: "雨水暴风雪",
    requires: [
      { geneId: "rainwater", minState: "homo" },
      { geneId: "blizzard",  minState: "homo" },
    ],
  },
  {
    id: "snowgiant",
    name: "雪花巨人",
    requires: [
      { geneId: "macksnow", minState: "het" },
      { geneId: "giant",    minState: "present" },
    ],
  },
  {
    id: "super_snowgiant",
    name: "超级雪花巨人",
    requires: [
      { geneId: "macksnow", minState: "super" },
      { geneId: "giant",    minState: "present" },
    ],
  },
];
