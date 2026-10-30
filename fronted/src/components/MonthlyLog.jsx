// frontend/src/components/MonthlyLog.jsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Trash2, 
  ShieldAlert, 
  Download, 
  Clock, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export const MonthlyLog = ({ onNavigateToChat }) => {
  const [meals, setMeals] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const [mealsRes, summaryRes] = await Promise.all([
        fetch('/api/meals'),
        fetch('/api/monthly-summary')
      ]);
      const mealsData = await mealsRes.json();
      const summaryData = await summaryRes.json();

      if (mealsData.success) {
        setMeals(mealsData.meals || []);
      }
      if (summaryData.success) {
        setSummary(summaryData.summary);
      }
    } catch (err) {
      console.warn('Backend unavailable, using client fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMeals(prev => prev.filter(m => m.id !== id));
        fetchLogs();
      }
    } catch (err) {
      setMeals(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMeals = meals.filter(m => {
    if (selectedFilter === 'all') return true;
    return m.category === selectedFilter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-5xl mx-auto space-y-6"
    >
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-clean-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Nutritional Retrospective
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Monthly History & Intake Summary
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Synthesizes daily macro density, flags missing nutrients, and monitors excess cooking oils.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(meals, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `nutriscan-monthly-history-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Monthly Intake Metrics */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-clean-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Daily Avg Calories</span>
            <span className="text-2xl font-black text-gray-900 mt-1 block">
              {summary.avgCalories} <span className="text-xs font-normal text-gray-500">kcal</span>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Target: 2,000 kcal</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-clean-xs">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Daily Avg Protein</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">
              {summary.avgProtein}g
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold mt-0.5 block">Target: 100g/day</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-clean-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Daily Avg Carbs</span>
            <span className="text-2xl font-black text-gray-900 mt-1 block">
              {summary.avgCarbs}g
            </span>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">Complex starches</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-clean-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Diet Health Score</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {summary.dietScore}/100
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">Grade A- Consistency</span>
          </div>
        </div>
      )}

      {/* Dedicated Alerts Section (Highlighting Missing Macros & Excess Oil/Sugar) */}
      {summary?.alerts && summary.alerts.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-clean-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-gray-900">
                Nutritional Balance Alerts & Deficit Signals
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {summary.alerts.length} Action Items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {summary.alerts.map((alert, idx) => {
              const isOil = alert.type === 'excess_oil';
              const isSugar = alert.type === 'excess_sugar';
              const isMissing = alert.type === 'missing_macro';

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isOil 
                      ? 'bg-amber-50/80 border-amber-200 text-amber-900' 
                      : isSugar
                        ? 'bg-orange-50/80 border-orange-200 text-orange-900'
                        : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {alert.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 border border-gray-200">
                      {isOil ? 'Excess Fat' : isSugar ? 'Sugar Spike' : 'Macro Shortfall'}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-700">
                    {alert.message}
                  </p>

                  {isMissing && (
                    <button
                      onClick={onNavigateToChat}
                      className="mt-3 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                    >
                      <span>Ask AI Advisor for protein booster tips</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chronological Meal Timeline */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-clean-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Chronological Meal Logs ({meals.length} Logged Meals)
            </h3>
            <p className="text-xs text-gray-500">
              Verified food snapshots with individual macro contributions
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedFilter === cat 
                    ? 'bg-emerald-600 text-white font-bold shadow-clean-xs' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Cards List */}
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-xs font-mono">
            Loading monthly intake logs...
          </div>
        ) : filteredMeals.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-gray-50 border border-gray-100">
            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No meals logged for this category</p>
            <p className="text-xs text-gray-500 mt-0.5">Scan a meal to start tracking your nutritional balance.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMeals.map((meal) => (
              <div 
                key={meal.id}
                className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group shadow-clean-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                    <img 
                      src={meal.image} 
                      alt={meal.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {meal.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{meal.date}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {meal.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {meal.portion}
                    </p>
                  </div>
                </div>

                {/* Macro breakdown */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="text-[9px] text-gray-500 block">KCAL</span>
                      <span className="font-bold text-gray-900">{meal.calories}</span>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-emerald-50/70 border border-emerald-100">
                      <span className="text-[9px] text-emerald-700 block">PRO</span>
                      <span className="font-bold text-emerald-700">{meal.protein}g</span>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="text-[9px] text-gray-500 block">CARB</span>
                      <span className="font-bold text-gray-900">{meal.carbs}g</span>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="text-[9px] text-gray-500 block">FAT</span>
                      <span className="font-bold text-gray-900">{meal.fats}g</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Meal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </motion.div>
  );
};
