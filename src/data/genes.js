/**
 * 清洗后的独立基因库
 * - 移除了 het_mark 条目（het 是隐性基因的状态，不是独立基因）
 * - 移除了复合品相（raptor/aptor/hybino 等，见 comboMorphs.js）
 * - hypo 改为共显性（杂合=少点，纯合=超少点）
 */
export const genes = [
  // ── 隐性 recessive ──
  { id: "tremper",     name: "川普白化",    type: "recessive",   hasSuper: false },
  { id: "bell",        name: "贝尔白化",    type: "recessive",   hasSuper: false },
  { id: "rainwater",   name: "雨水白化",    type: "recessive",   hasSuper: false },
  { id: "blizzard",    name: "暴风雪",      type: "recessive",   hasSuper: false },
  { id: "patternless", name: "墨菲无纹",    type: "recessive",   hasSuper: false },
  { id: "eclipse",     name: "日蚀眼",      type: "recessive",   hasSuper: false },
  { id: "marble_eye",  name: "大理石眼",   type: "recessive",   hasSuper: false },
  { id: "noir_desir",  name: "欲望黑眼",   type: "recessive",   hasSuper: false },

  // ── 显性 dominant ──
  { id: "enigma",      name: "谜",          type: "dominant",    hasSuper: false },
  { id: "whiteyellow", name: "白黄",        type: "dominant",    hasSuper: false },
  { id: "giant",       name: "巨人",        type: "dominant",    hasSuper: false },
  { id: "blacknight",  name: "黑夜",        type: "dominant",    hasSuper: false },
  { id: "emerald",     name: "翡翠",        type: "dominant",    hasSuper: false },
  { id: "radioactive", name: "辐射",        type: "dominant",    hasSuper: false },
  { id: "pastel",      name: "蜡笔",        type: "dominant",    hasSuper: false },

  // ── 共显性 codominant ──
  { id: "macksnow",    name: "马克雪花",    type: "codominant",  hasSuper: true },
  { id: "lemonfrost",  name: "柠檬霜",      type: "codominant",  hasSuper: true },
  { id: "ghost",       name: "幽灵",        type: "codominant",  hasSuper: true },
  { id: "granite",     name: "花岗岩",      type: "codominant",  hasSuper: true },
  { id: "purplehead",  name: "紫头",        type: "codominant",  hasSuper: true },
  { id: "wraith",      name: "幽灵纹路",    type: "codominant",  hasSuper: true },
  { id: "hypo",        name: "少点",        type: "codominant",  hasSuper: true },

  // ── 选育 selective ──
  { id: "tangelo",       name: "橘柚",        type: "selective",  hasSuper: false },
  { id: "tangerine",     name: "橘化",        type: "selective",  hasSuper: false },
  { id: "carrottail",    name: "萝卜尾",      type: "selective",  hasSuper: false },
  { id: "striped",       name: "直线",        type: "selective",  hasSuper: false },
  { id: "bold",          name: "粗纹",        type: "selective",  hasSuper: false },
  { id: "highcolor",     name: "高色",        type: "selective",  hasSuper: false },
  { id: "lavender",      name: "淡紫/薰衣草",  type: "selective",  hasSuper: false },
  { id: "reverse_stripe",name: "反直线",      type: "selective",  hasSuper: false },
  { id: "jungle",        name: "丛林",        type: "selective",  hasSuper: false },
  { id: "bandit",        name: "强盗纹路",    type: "selective",  hasSuper: false },
  { id: "mosaic",        name: "马赛克",      type: "selective",  hasSuper: false },
  { id: "calico",        name: "卡利科",      type: "selective",  hasSuper: false },
  { id: "orange_ghost",  name: "橙幽灵",      type: "selective",  hasSuper: false },
  { id: "yellow_ghost",  name: "黄幽灵",      type: "selective",  hasSuper: false },
  { id: "blackpearl",    name: "黑珍珠",      type: "selective",  hasSuper: false },
  { id: "copper",        name: "铜色",        type: "selective",  hasSuper: false },
  { id: "saffron",       name: "藏红花",      type: "selective",  hasSuper: false },
  { id: "mandarin",      name: "橘子",        type: "selective",  hasSuper: false },
  { id: "red_ridge",     name: "红脊",        type: "selective",  hasSuper: false },
  { id: "cream",         name: "奶油",        type: "selective",  hasSuper: false },
  { id: "mocha",         name: "摩卡",        type: "selective",  hasSuper: false },
  { id: "chocolate",     name: "巧克力",      type: "selective",  hasSuper: false },
  { id: "charcoal",      name: "炭黑",        type: "selective",  hasSuper: false },
  { id: "ash",           name: "烟灰",        type: "selective",  hasSuper: false },
  { id: "midnight",      name: "午夜",        type: "selective",  hasSuper: false },
  { id: "smoky",         name: "烟熏",        type: "selective",  hasSuper: false },
  { id: "pastel",        name: "粉彩",        type: "selective",  hasSuper: false },
  { id: "cinnamon",      name: "肉桂",        type: "selective",  hasSuper: false },
  { id: "rust",          name: "铁锈",        type: "selective",  hasSuper: false },
  { id: "sand",          name: "沙色",        type: "selective",  hasSuper: false },
  { id: "desert",        name: "沙漠",        type: "selective",  hasSuper: false },
  { id: "stone",         name: "石纹",        type: "selective",  hasSuper: false },
  { id: "earth",         name: "大地色",      type: "selective",  hasSuper: false },
];

export const geneMap = Object.fromEntries(genes.map(g => [g.id, g]));

export const genesByType = {
  recessive:   genes.filter(g => g.type === "recessive"),
  dominant:    genes.filter(g => g.type === "dominant"),
  codominant:  genes.filter(g => g.type === "codominant"),
  selective:   genes.filter(g => g.type === "selective"),
};
