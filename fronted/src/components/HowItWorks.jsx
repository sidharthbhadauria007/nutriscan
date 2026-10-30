// frontend/src/components/HowItWorks.jsx
import React from 'react';
import { Camera, BarChart3, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Snap or scan',
      description: 'Point your camera at any plate. Recognizes mixed meals, street food, and home thalis instantly.',
      icon: <Camera className="w-6 h-6 text-emerald-600" />,
      detail: 'Optical neural engine segments multiple food items on a single plate.'
    },
    {
      step: '02',
      title: 'Get calories & macros',
      description: 'Extracts accurate nutrition facts and Bayesian 95% CI uncertainty ranges in 2.5s.',
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
      detail: 'Estimates calorie variance, protein density, and flags excess cooking oil.'
    },
    {
      step: '03',
      title: 'Hit your daily targets',
      description: 'Track progress against personalized body goals and receive actionable dietary balancing tips.',
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      detail: 'Daily feedback loops adjust recommendations based on your metabolic pace.'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Seamless Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How NutriScan Works
          </h2>
          <p className="text-base text-gray-500 mt-2">
            No barcode lookups, no manual ounce weighing. Just 3 effortless steps.
          </p>
        </div>

        {/* 3-Column Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl bg-gray-50/70 border border-gray-200/70 hover:border-emerald-300 hover:bg-white hover:shadow-clean-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Number Badge and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-clean-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black font-mono text-gray-300 group-hover:text-emerald-600 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Headline & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Extra Detail Tag */}
              <div className="pt-4 border-t border-gray-200/60 text-xs text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{item.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
