// frontend/src/App.jsx
import React, { useState } from 'react';
import { Hero } from './components/Hero.jsx';
import { HowItWorks } from './components/HowItWorks.jsx';
import { Features } from './components/Features.jsx';
import { Scanner } from './components/Scanner.jsx';
import { MonthlyLog } from './components/MonthlyLog.jsx';
import { AIChatbox } from './components/AIChatbox.jsx';
import { 
  Scan, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Home,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'scanner' | 'history' | 'advisor'
  const [savedToast, setSavedToast] = useState(null);

  const handleMealSaved = (meal) => {
    setSavedToast(`"${meal.name || 'Meal'}" successfully saved to Monthly Log!`);
    setTimeout(() => setSavedToast(null), 3500);
  };

  const startScanner = () => {
    setActiveTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      
      {/* Sleek Modern Light Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-clean-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Editorial Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-clean-sm group-hover:bg-emerald-700 transition-colors">
              <Scan className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-gray-900 tracking-tight">
                  NutriScan
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider hidden sm:block uppercase">
                B2C Nutrition Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-gray-50 p-1 rounded-full border border-gray-200/80 shadow-clean-xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-emerald-700 shadow-clean-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'scanner'
                  ? 'bg-white text-emerald-700 shadow-clean-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Food</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-700 shadow-clean-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Monthly Log</span>
            </button>

            <button
              onClick={() => setActiveTab('advisor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'advisor'
                  ? 'bg-white text-emerald-700 shadow-clean-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor</span>
            </button>
          </nav>

          {/* Primary Top CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={startScanner}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-mint-glow hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snap Your Food</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* HOME LANDING VIEW: Hero -> How It Works (Strict 3-Step) -> Features (6-Card Grid) */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onStartScan={startScanner} />
              <HowItWorks />
              <Features onFeatureClick={startScanner} />
            </motion.div>
          )}

          {/* SCANNER VIEW: Distraction-free clean upload/camera zone -> green laser scan -> result card */}
          {activeTab === 'scanner' && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <Scanner 
                onMealSaved={handleMealSaved} 
                onBackToHome={() => setActiveTab('home')} 
              />
            </motion.div>
          )}

          {/* MONTHLY LOG VIEW */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <MonthlyLog onNavigateToChat={() => setActiveTab('advisor')} />
            </motion.div>
          )}

          {/* AI ADVISOR VIEW */}
          {activeTab === 'advisor' && (
            <motion.div
              key="advisor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <AIChatbox />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Modern Clean Light Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 px-4 sm:px-8 mt-16 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-gray-900 text-sm">NutriScan AI</span>
            <span>•</span>
            <span>Premium B2C Nutrition Platform (Foodify Aesthetic)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>Light & Mint Green Theme</span>
            <span>•</span>
            <span>Zero-Hallucination Vision</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Production Certified</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification Pill */}
      <AnimatePresence>
        {savedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gray-900 text-white text-xs font-semibold shadow-clean-float"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
