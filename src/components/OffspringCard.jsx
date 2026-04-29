import React from 'react';
import { geneMap } from '../data/genes.js';

const stateDisplay = {
  // 隐性
  homo: { text: '纯合', badge: 'bg-violet-500/80 text-white' },
  het:  { text: 'Het',  badge: 'bg-violet-400/40 text-violet-200' },
  none: { text: '',     badge: '' },
  // 共显性
  super: { text: 'Super', badge: 'bg-yellow-500/80 text-white' },
  // 显性
  present: { text: '表现', badge: 'bg-amber-500/80 text-white' },
  absent:  { text: '',     badge: '' },
};

/** 根据基因类型和状态生成合适的显示文本 */
function getDisplayText(g) {
  if (g.type === 'codominant') {
    if (g.state === 'super') return `超级${g.geneName}`;
    if (g.state === 'het')   return g.geneName;
    return null;
  }
  if (g.type === 'recessive') {
    if (g.state === 'homo') return g.geneName;
    if (g.state === 'het')  return `het ${g.geneName}`;
    return null;
  }
  if (g.type === 'dominant') {
    if (g.state === 'present') return g.geneName;
    return null;
  }
  return null;
}

function formatPercent(p) {
  const pct = p * 100;
  if (pct === 100) return '100%';
  if (pct >= 1) return pct.toFixed(1).replace(/\.0$/, '') + '%';
  return pct.toFixed(2) + '%';
}

export default function OffspringCard({ combo }) {
  const { genes, probability, comboMorphs, selectiveTags } = combo;

  // 分类基因状态
  const expressed = [];  // 表现出来的
  const hetCarried = []; // Het 携带的

  for (const [geneId, info] of Object.entries(genes)) {
    if (info.state === 'none' || info.state === 'absent') continue;
    if (info.state === 'het' && info.type === 'recessive') {
      hetCarried.push({ geneId, ...info });
    } else {
      expressed.push({ geneId, ...info });
    }
  }

  const hasContent = expressed.length > 0 || hetCarried.length > 0 || selectiveTags.length > 0;

  return (
    <div className="bg-slate-800/80 rounded-xl border border-slate-700/40 p-4 hover:border-slate-600/60 transition-all">
      {/* 概率 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xl font-bold text-emerald-400">
          {formatPercent(probability)}
        </span>
        {comboMorphs.length > 0 && (
          <div className="flex gap-1.5">
            {comboMorphs.map(cm => (
              <span key={cm.id} className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-bold text-white">
                ⭐ {cm.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {!hasContent ? (
        <p className="text-slate-500 text-sm">原色 / 野生型</p>
      ) : (
        <div className="space-y-2">
          {/* 表现基因 */}
          {expressed.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {expressed.map(g => {
                const display = stateDisplay[g.state] || {};
                const text = getDisplayText(g);
                if (!text) return null;
                return (
                  <span key={g.geneId} className={`px-2 py-0.5 rounded-full text-xs font-medium ${display.badge}`}>
                    {text}
                  </span>
                );
              })}
            </div>
          )}

          {/* Het 携带 */}
          {hetCarried.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {hetCarried.map(g => (
                <span key={g.geneId} className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-600/60 text-slate-300">
                  het {g.geneName}
                </span>
              ))}
            </div>
          )}

          {/* 选育标签 */}
          {selectiveTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-700/30">
              {selectiveTags.map(id => {
                const gene = geneMap[id];
                return (
                  <span key={id} className="px-2 py-0.5 rounded-full text-xs font-medium bg-sky-500/30 text-sky-300">
                    {gene ? gene.name : id}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
