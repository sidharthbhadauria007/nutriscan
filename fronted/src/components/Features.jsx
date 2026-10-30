// frontend/src/components/Features.jsx
import React from 'react';
import { 
  Scan, 
  Barcode, 
  MessageSquare, 
  UtensilsCrossed, 
  Droplet, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Features = ({ onFeatureClick }) => {
  const featuresList = [
    {
      id: 'food_scan',
      title: 'AI Food Scan',
      description: 'Photograph complex multi-dish meals for instant calorie, protein, carb, and fat quantification.',
      icon: <Scan className="w-6 h-6 text-emerald-600" />,
      tag: 'Core Vision'
    },
    {
      id: 'barcode_scanner',
      title: 'Barcode Scanner',
      description: 'Scan packaged snacks and pantry goods instantly with our verified global 2M+ product database.',
      icon: <Barcode className="w-6 h-6 text-teal-600" />,
      tag: 'Instant Barcode'
    },
    {
      id: 'ai_coach',
      title: 'AI Nutrition Coach',
      description: 'Ask anything in plain language. Get actionable advice tailored to your 30-day eating history.',
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      tag: 'Advisor'
    },
    {
      id: 'meal_plans',
      title: 'Personalized Meal Plans',
      description: 'Daily recipe blueprints built around your medical allergies, lactose guardrails, and budget targets.',
      icon: <UtensilsCrossed className="w-6 h-6 text-emerald-600" />,
      tag: 'Custom Diets'
    },
    {
      id: 'water_weight',
      title: 'Water, Weight & Body',
      description: 'Log daily hydration volumes and watch your body composition trends adjust across weekly cycles.',
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
      tag: 'Hydration'
    },
    {
      id: 'health_sync',
      title: 'Apple Health Sync',
      description: 'Sync daily active energy, dietary calories, and macro grams seamlessly into Apple Health & Google Fit.',
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      tag: 'HealthKit'
    }
  ];

  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Comprehensive Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            More Than A Calorie Counter
          </h2>
          <p className="text-base text-gray-500 mt-2">
            All the tools you need to build long-term metabolic health and reach your body goals.
          </p>
        </div>

        {/* 6-Card Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-clean-sm hover:shadow-clean-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Explore capability</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
