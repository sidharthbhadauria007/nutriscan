// frontend/src/components/Hero.jsx
import React from 'react';
import { Camera, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = ({ onStartScan }) => {
  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Subtext, and CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-clean-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Next-Gen Computer Vision Nutrition Intelligence</span>
            </div>

            {/* Big Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12]">
              AI Calorie Counter: <br />
              <span className="text-emerald-600">Snap a Food Photo,</span> Track Macros.
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Point your camera at any plate and NutriScan logs calories, protein, and carbs in seconds.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartScan}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-mint-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Your Food Instantly</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero manual typing required</span>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Sub-2.5s Optical Recognition</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>95% CI Bayesian Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Loved by 50,000+ Health Seekers</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Sleek Phone Mockup / Product Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              
              {/* Soft decorative ambient glow */}
              <div className="absolute -inset-4 bg-emerald-100/60 rounded-3xl blur-2xl -z-10" />

              {/* Phone Frame Card */}
              <div className="bg-white rounded-[32px] border border-gray-200/90 p-4 shadow-clean-float overflow-hidden">
                
                {/* Header of Phone */}
                <div className="flex items-center justify-between px-2 pt-1 pb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-gray-900">Live AI Vision</span>
                  </div>
                  <span className="font-mono text-[11px] text-gray-400">98.4% Confidence</span>
                </div>

                {/* Hero Meal Image in Viewport */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-clean-xs bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" 
                    alt="Nutritious Salad Bowl" 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Green Laser Line Animation */}
                  <div className="laser-beam-mint" />

                  {/* Corner Targeting Reticles */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />

                  {/* Floating Recognition Pill */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-clean-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">
                        Atlantic Salmon & Quinoa Bowl
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        Standard 360g Serving
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      520 kcal
                    </span>
                  </div>
                </div>

                {/* Live Macro Pills Preview */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">Protein</span>
                    <span className="text-sm font-extrabold text-emerald-800">38.0g</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Carbs</span>
                    <span className="text-sm font-extrabold text-gray-900">42.0g</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Fats</span>
                    <span className="text-sm font-extrabold text-gray-900">22.0g</span>
                  </div>
                </div>

                {/* Nutrition Score */}
                <div className="mt-3 p-2.5 rounded-xl bg-white border border-gray-100 shadow-clean-xs flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-medium">Nutrition Health Score:</span>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    94 / 100 • Grade A
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
