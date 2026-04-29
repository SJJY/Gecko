/**
 * 复合品相命名映射表
 * 当子代同时表现 requires 中的所有基因时，自动匹配并显示 combo 名称
 * state 指定需要达到的最低表现状态：
 *   - 隐性: "homo" (纯合表现)
 *   - 共显性: "het" (杂合即表现) 或 "super" (需要纯合)
 *   - 显性: "present"
 */
export const comboMorphs = [
  // ── 川普系 ──
  { id: "raptor",       name: "猛禽 RAPTOR",      requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "patternless", minState: "homo" }] },
  { id: "aptor",        name: "暗黑猛禽 APTOR",   requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "hybino",       name: "海白诺 Hybino",    requires: [{ geneId: "hypo",    minState: "het"  }, { geneId: "tremper", minState: "homo" }] },
  { id: "sunglow",      name: "日辉 Sunglow",     requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "tangerine", minState: "present" }] },
  { id: "tremper_bliz", name: "川普暴风雪",       requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "blizzard", minState: "homo" }] },
  { id: "super_tremper_bliz", name: "超级川普暴风雪", requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "blizzard", minState: "homo" }, { geneId: "hypo", minState: "super" }] },
  { id: "diablo_blanco", name: "恶魔白酒",        requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "blizzard", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "ash",          name: "灰烬",             requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "patternless", minState: "homo" }] },
  { id: "red_eye_raptor", name: "红眼暴龙",      requires: [{ geneId: "tremper", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },

  // ── 贝尔系 ──
  { id: "bell_bliz",    name: "贝尔暴风雪",       requires: [{ geneId: "bell", minState: "homo" }, { geneId: "blizzard", minState: "homo" }] },
  { id: "white_knight", name: "白骑士",           requires: [{ geneId: "bell", minState: "homo" }, { geneId: "blizzard", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "raider",       name: "掠夺者",           requires: [{ geneId: "bell", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "patternless", minState: "homo" }] },
  { id: "radar",        name: "雷达",             requires: [{ geneId: "bell", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "aurora",       name: "极光",             requires: [{ geneId: "whiteyellow", minState: "present" }, { geneId: "bell", minState: "homo" }] },
  { id: "bell_dalmatian", name: "贝尔斑点狗",     requires: [{ geneId: "macksnow", minState: "super" }, { geneId: "bell", minState: "homo" }, { geneId: "enigma", minState: "present" }] },

  // ── 雨水系 ──
  { id: "rw_bliz",      name: "雨水暴风雪",       requires: [{ geneId: "rainwater", minState: "homo" }, { geneId: "blizzard", minState: "homo" }] },
  { id: "cyclone",      name: "旋风",             requires: [{ geneId: "rainwater", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "patternless", minState: "homo" }] },
  { id: "typhoon",      name: "台风",             requires: [{ geneId: "rainwater", minState: "homo" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "crystal",      name: "水晶",             requires: [{ geneId: "macksnow", minState: "het" }, { geneId: "rainwater", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "enigma", minState: "present" }] },

  // ── 雪花系 ──
  { id: "snowgiant",    name: "雪花巨人",         requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "giant", minState: "present" }] },
  { id: "super_snowgiant", name: "超级雪花巨人",  requires: [{ geneId: "macksnow", minState: "super" }, { geneId: "giant", minState: "present" }] },
  { id: "super_platinum", name: "超级白金",       requires: [{ geneId: "macksnow", minState: "super" }, { geneId: "patternless", minState: "homo" }] },
  { id: "universe",     name: "宇宙",             requires: [{ geneId: "macksnow", minState: "super" }, { geneId: "whiteyellow", minState: "present" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "galaxy",       name: "银河",             requires: [{ geneId: "macksnow", minState: "super" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "shadow",       name: "影",              requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "whiteyellow", minState: "present" }, { geneId: "eclipse", minState: "homo" }] },
  { id: "black_hole",   name: "黑洞",             requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "eclipse", minState: "homo" }, { geneId: "enigma", minState: "present" }] },
  { id: "donut",        name: "甜甜圈",           requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "tremper", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "enigma", minState: "present" }] },
  { id: "calcite",      name: "方解石",           requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "whiteyellow", minState: "present" }, { geneId: "bell", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "enigma", minState: "present" }] },
  { id: "sneaker",      name: "潜行",             requires: [{ geneId: "macksnow", minState: "het" },   { geneId: "bell", minState: "homo" }, { geneId: "eclipse", minState: "homo" }, { geneId: "enigma", minState: "present" }] },

  // ── 暴风雪系 ──
  { id: "banana_bliz",  name: "香蕉暴风雪",       requires: [{ geneId: "blizzard", minState: "homo" }, { geneId: "patternless", minState: "homo" }] },
];
