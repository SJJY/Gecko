import React, { useState, useCallback } from 'react';
import ParentPanel from './components/ParentPanel.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { useBreeding } from './hooks/useBreeding.js';
import { validateConflicts } from './engine/validator.js';

export default function App() {
  const [fatherGenes, setFatherGenes] = useState({});
  const [motherGenes, setMotherGenes] = useState({});
  const [fatherSelective, setFatherSelective] = useState([]);
  const [motherSelective, setMotherSelective] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { results, selectiveTags } = useBreeding(
    showResults ? fatherGenes : {},
    showResults ? motherGenes : {},
    showResults ? fatherSelective : [],
    showResults ? motherSelective : [],
  );

  // 冲突检测
  const fatherConflicts = validateConflicts(Object.keys(fatherGenes));
  const motherConflicts = validateConflicts(Object.keys(motherGenes));
  const hasConflicts = fatherConflicts.length > 0 || motherConflicts.length > 0;

  const hasSelection = Object.keys(fatherGenes).length > 0 || Object.keys(motherGenes).length > 0
    || fatherSelective.length > 0 || motherSelective.length > 0;

  const handleCalculate = useCallback(() => {
    if (hasConflicts) return;
    setShowResults(true);
  }, [hasConflicts]);

  const handleReset = useCallback(() => {
    setFatherGenes({});
    setMotherGenes({});
    setFatherSelective([]);
    setMotherSelective([]);
    setShowResults(false);
  }, []);

  // 当基因选择改变时，清空上次计算结果
  const wrapSetFatherGenes = useCallback((g) => { setShowResults(false); setFatherGenes(g); }, []);
  const wrapSetMotherGenes = useCallback((g) => { setShowResults(false); setMotherGenes(g); }, []);
  const wrapSetFatherSelective = useCallback((s) => { setShowResults(false); setFatherSelective(s); }, []);
  const wrapSetMotherSelective = useCallback((s) => { setShowResults(false); setMotherSelective(s); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦎</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                守宫基因配对器
              </h1>
              <p className="text-xs text-slate-500">Leopard Gecko Gene Matcher</p>
            </div>
          </div>
          {hasSelection && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              清空重置
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 双亲面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParentPanel
            label="父本 ♂"
            icon="♂"
            genes={fatherGenes}
            selective={fatherSelective}
            onGenesChange={wrapSetFatherGenes}
            onSelectiveChange={wrapSetFatherSelective}
          />
          <ParentPanel
            label="母本 ♀"
            icon="♀"
            genes={motherGenes}
            selective={motherSelective}
            onGenesChange={wrapSetMotherGenes}
            onSelectiveChange={wrapSetMotherSelective}
          />
        </div>

        {/* 冲突警告 */}
        {hasConflicts && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
            <p className="text-red-400 font-medium text-sm">⚠️ 基因冲突</p>
            {[...fatherConflicts, ...motherConflicts].map((c, i) => (
              <p key={i} className="text-red-300/80 text-sm mt-1">{c.message}</p>
            ))}
          </div>
        )}

        {/* 配对按钮 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCalculate}
            disabled={!hasSelection || hasConflicts}
            className={`
              px-8 py-3 rounded-xl font-bold text-lg transition-all
              ${!hasSelection || hasConflicts
                ? 'bg-slate-700/40 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95'}
            `}
          >
            🧬 开始配对
          </button>
        </div>

        {/* 结果面板 */}
        {showResults && (
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/30 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🐣</span> 子代概率结果
            </h2>
            <ResultsPanel results={results} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/30 mt-12 py-6 text-center text-slate-600 text-xs">
        守宫基因配对器 · 基于孟德尔遗传定律 · 数据参考守宫城市
      </footer>
    </div>
  );
}
