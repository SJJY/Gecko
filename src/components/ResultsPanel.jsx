import React, { useState } from 'react';
import OffspringCard from './OffspringCard.jsx';

export default function ResultsPanel({ results }) {
  const [showAll, setShowAll] = useState(false);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <div className="text-5xl mb-4">🧬</div>
        <p className="text-lg">选择双亲基因后，点击「开始配对」查看结果</p>
      </div>
    );
  }

  const displayResults = showAll ? results : results.slice(0, 20);
  const hasMore = results.length > 20;

  // 统计
  const totalCombos = results.length;
  const comboMorphCount = results.filter(r => r.comboMorphs.length > 0).length;

  return (
    <div>
      {/* 统计栏 */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="text-slate-400">
          共 <span className="text-white font-bold">{totalCombos}</span> 种子代组合
        </span>
        {comboMorphCount > 0 && (
          <span className="text-orange-400">
            其中 <span className="font-bold">{comboMorphCount}</span> 种匹配复合品相
          </span>
        )}
      </div>

      {/* 结果网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayResults.map((combo, i) => (
          <OffspringCard key={i} combo={combo} />
        ))}
      </div>

      {/* 展开更多 */}
      {hasMore && !showAll && (
        <div className="text-center mt-4">
          <button
            className="px-6 py-2 bg-slate-700/60 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            onClick={() => setShowAll(true)}
          >
            显示全部 {totalCombos} 种 ↓
          </button>
        </div>
      )}
    </div>
  );
}
