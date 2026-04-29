/**
 * 单基因 Punnett Square 概率计算
 *
 * 隐性 recessive 状态值: "homo"(nn) / "het"(Nn) / "none"(NN)
 * 显性 dominant 状态值:   "present" / "absent"
 * 共显性 codominant 状态值: "super"(纯合) / "het"(杂合) / "none"
 */

/**
 * 隐性遗传计算
 * @param {string} f - 父本状态 "homo"|"het"|"none"
 * @param {string} m - 母本状态 "homo"|"het"|"none"
 * @returns {Array<{state: string, probability: number, label: string}>}
 */
function calcRecessive(f, m) {
  const alleleCount = (s) => (s === "homo" ? 2 : s === "het" ? 1 : 0);
  const fa = alleleCount(f);
  const ma = alleleCount(m);

  // 父本产生突变等位基因(n)的概率
  const fProb = fa / 2; // 0, 0.5, 1
  const mProb = ma / 2;

  // nn, Nn, NN 概率
  const pHomo = fProb * mProb;
  const pNone = (1 - fProb) * (1 - mProb);
  const pHet  = 1 - pHomo - pNone;

  const results = [];
  if (pHomo > 0) results.push({ state: "homo", probability: pHomo, label: "纯合表现" });
  if (pHet  > 0) results.push({ state: "het",  probability: pHet,  label: "Het携带" });
  if (pNone > 0) results.push({ state: "none", probability: pNone, label: "不携带" });
  return results;
}

/**
 * 显性遗传计算
 * 简化模型：只要亲本有该基因，50%几率传给后代
 * 若双亲都有，则子代100%有
 * @param {string} f - "present"|"absent"
 * @param {string} m - "present"|"absent"
 */
function calcDominant(f, m) {
  const fp = f === "present" ? 0.5 : 0;
  const mp = m === "present" ? 0.5 : 0;

  // 不携带概率
  const pAbsent = (1 - fp) * (1 - mp);
  const pPresent = 1 - pAbsent;

  const results = [];
  if (pPresent > 0) results.push({ state: "present", probability: pPresent, label: "表现" });
  if (pAbsent  > 0) results.push({ state: "absent",  probability: pAbsent,  label: "不表现" });
  return results;
}

/**
 * 共显性遗传计算
 * @param {string} f - "super"|"het"|"none"
 * @param {string} m - "super"|"het"|"none"
 */
function calcCodominant(f, m) {
  const alleleCount = (s) => (s === "super" ? 2 : s === "het" ? 1 : 0);
  const fa = alleleCount(f);
  const ma = alleleCount(m);

  const fProb = fa / 2;
  const mProb = ma / 2;

  const pSuper = fProb * mProb;
  const pNone  = (1 - fProb) * (1 - mProb);
  const pHet   = 1 - pSuper - pNone;

  const results = [];
  if (pSuper > 0) results.push({ state: "super", probability: pSuper, label: "超级体" });
  if (pHet   > 0) results.push({ state: "het",   probability: pHet,   label: "杂合表现" });
  if (pNone  > 0) results.push({ state: "none",  probability: pNone,  label: "不携带" });
  return results;
}

/**
 * 统一入口：根据基因类型分发计算
 * @param {string} type - "recessive"|"dominant"|"codominant"
 * @param {string} fatherState
 * @param {string} motherState
 * @returns {Array<{state: string, probability: number, label: string}>}
 */
export function calcSingleGene(type, fatherState, motherState) {
  switch (type) {
    case "recessive":   return calcRecessive(fatherState, motherState);
    case "dominant":    return calcDominant(fatherState, motherState);
    case "codominant":  return calcCodominant(fatherState, motherState);
    default:            return [];
  }
}
