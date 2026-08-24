import React, { useState } from 'react';
import { Language, SolutionItem } from '../types';
import { SOLUTIONS_DATA } from '../data/logisticsData';
import { ArrowUpRight, CheckCircle2, X, Calculator, ShieldCheck } from 'lucide-react';

interface SolutionsSectionProps {
  lang: Language;
  onOpenQuote: (serviceName?: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ lang, onOpenQuote }) => {
  const isRtl = lang === 'ar';
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {isRtl ? '/حلولنا وخدماتنا' : '/SOLUTIONS'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1b1b] tracking-tight">
              {isRtl ? 'حلول لوجستية متكاملة' : 'Logistics Solutions'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-neutral-600 max-w-xs leading-relaxed">
              {isRtl
                ? 'حلول مرنة ومصممة لتلبية متطلبات مختلف القطاعات التجارية والصناعية بالمملكة.'
                : 'Tailored to meet the diverse needs of modern businesses and supply chains.'}
            </p>
            <button
              onClick={() => onOpenQuote()}
              className="px-6 py-2.5 rounded-full bg-[#1c1b1b] text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              {isRtl ? 'طلب استشارة أو تسعيرة' : 'See All / Get Quote'}
            </button>
          </div>
        </div>

        {/* 5 Cards Grid matching Screenshot 4 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {SOLUTIONS_DATA.map((item, index) => {
            // Span configuration: first 2 items take 3 cols each (50% each), next 3 take 2 cols each (33% each) on large screens
            const isTopRow = index < 2;
            const colSpanClass = isTopRow
              ? 'lg:col-span-3 h-80 sm:h-96'
              : 'lg:col-span-2 h-80 sm:h-96';

            return (
              <div
                key={item.id}
                id={`solution-card-${item.id}`}
                onClick={() => setSelectedSolution(item)}
                className={`relative rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-neutral-200/80 bg-neutral-900 ${colSpanClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Photographic Background */}
                <img
                  src={item.image}
                  alt={isRtl ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white/90 border border-white/20">
                    {isRtl ? item.badgeAr : item.badgeEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Dark Frosted Blur Caption Overlay matching Screenshot 4 */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/75 to-transparent backdrop-blur-[2px] p-6 text-white transition-all duration-300">
                  <h3 className="text-xl font-bold mb-1.5 group-hover:text-amber-300 transition-colors">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed font-light">
                    {isRtl ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Solution Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200">
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-56 bg-neutral-900">
              <img
                src={selectedSolution.image}
                alt={isRtl ? selectedSolution.titleAr : selectedSolution.titleEn}
                className="w-full h-full object-cover brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md mb-2 inline-block">
                  {isRtl ? selectedSolution.badgeAr : selectedSolution.badgeEn}
                </span>
                <h3 className="text-2xl font-black">
                  {isRtl ? selectedSolution.titleAr : selectedSolution.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {isRtl ? selectedSolution.descriptionAr : selectedSolution.descriptionEn}
              </p>

              {/* Feature Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  {isRtl ? 'المزايا والإمكانيات التشغيلية' : 'Key Capabilities'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isRtl ? selectedSolution.featuresAr : selectedSolution.featuresEn).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-neutral-800 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  {isRtl ? 'إغلاق' : 'Close'}
                </button>

                <button
                  onClick={() => {
                    const title = isRtl ? selectedSolution.titleAr : selectedSolution.titleEn;
                    setSelectedSolution(null);
                    onOpenQuote(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1c1b1b] text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'طلب تسعيرة لهذه الخدمة' : 'Request Quote For This Service'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
