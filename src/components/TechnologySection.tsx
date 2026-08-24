import React, { useState } from 'react';
import { Language, TechFeature } from '../types';
import { TECH_FEATURES_DATA, ASSETS } from '../data/logisticsData';
import { ArrowRight, ArrowLeft, Radar, BarChart3, BellRing, ShieldCheck, CheckCircle, X } from 'lucide-react';

interface TechnologySectionProps {
  lang: Language;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [selectedFeature, setSelectedFeature] = useState<TechFeature | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radar':
        return <Radar className="w-5 h-5 text-neutral-800" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-neutral-800" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5 text-neutral-800" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-neutral-800" />;
      default:
        return <Radar className="w-5 h-5 text-neutral-800" />;
    }
  };

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#f8f9fa] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16">
          <div className="space-y-3">
            {/* Tag */}
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {isRtl ? '/التقنية والابتكار اللوجستي' : '/TECHNOLOGY'}
            </div>
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1b1b] tracking-tight">
              {isRtl ? 'ابتكار يدفع أعمالك للأمام' : 'Innovation that Moves Your Business'}
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base text-neutral-600 leading-relaxed">
              {isRtl
                ? 'نستثمر أحدث الحلول الرقمية وأجهزة التتبع الذكية للارتقاء بطريقة إدارة شحناتك وتأمين تدفق البضائع بدقة وسلاسة.'
                : 'We leverage the latest technology to improve the way we manage your shipments.'}
            </p>
          </div>
        </div>

        {/* 2-Column Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Container Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-4/5 bg-neutral-900 group border border-neutral-200">
              <img
                src={ASSETS.techContainer}
                alt="HRC Smart Secure Container Fleet"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono">
                  IOT FLEET TELEMETRY
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
                    <Radar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {isRtl ? 'حاويات وأسطول ذكي متصل' : 'Connected Smart Cargo Fleet'}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {isRtl ? 'مراقبة فورية للحرارة والأقفال عبر الأقمار الصناعية' : 'GPS, temperature & electronic seals'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Tech Features in 2x2 layout matching Screenshot 3 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {TECH_FEATURES_DATA.map((feature) => (
                <div
                  key={feature.id}
                  id={`tech-feature-${feature.id}`}
                  className="space-y-3 p-5 rounded-2xl hover:bg-white transition-all duration-200 border border-transparent hover:border-neutral-200 hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      {getIcon(feature.iconName)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black">
                    {isRtl ? feature.titleAr : feature.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {isRtl ? feature.descriptionAr : feature.descriptionEn}
                  </p>

                  {/* Learn More Button */}
                  <button
                    onClick={() => setSelectedFeature(feature)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-black pt-1 group-hover:underline cursor-pointer"
                  >
                    <span>{isRtl ? 'اعرف المزيد' : 'Learn More'}</span>
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                      <ArrowIcon className="w-3 h-3" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              {getIcon(selectedFeature.iconName)}
            </div>

            <h3 className="text-2xl font-black text-neutral-900 mb-2">
              {isRtl ? selectedFeature.titleAr : selectedFeature.titleEn}
            </h3>

            <p className="text-sm font-medium text-neutral-600 mb-4">
              {isRtl ? selectedFeature.descriptionAr : selectedFeature.descriptionEn}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-700 leading-relaxed mb-6">
              {isRtl ? selectedFeature.detailsAr : selectedFeature.detailsEn}
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-6 py-2.5 rounded-full bg-[#1c1b1b] text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
