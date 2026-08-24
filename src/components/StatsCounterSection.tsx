import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';

interface StatsCounterSectionProps {
  lang: Language;
}

interface StatItem {
  id: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  isSpecial?: string; // for cases like '24/7'
  labelAr: string;
  labelEn: string;
  subLabelAr?: string;
  subLabelEn?: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'accuracy',
    targetValue: 98,
    suffix: '%',
    labelAr: 'دقة الالتزام بالتسليم',
    labelEn: 'On-Time Delivery Rate',
  },
  {
    id: 'support',
    targetValue: 24,
    isSpecial: '24/7',
    labelAr: 'متابعة تشغيلية على مدار الساعة',
    labelEn: '24/7 Operations Monitoring',
  },
  {
    id: 'storage',
    targetValue: 150000,
    suffix: 'm²',
    labelAr: 'مساحة تخزينية تشغيلية',
    labelEn: 'Operational Warehousing Area',
  },
  {
    id: 'fleet',
    targetValue: 8000,
    prefix: '+',
    labelAr: 'شاحنة في أسطولنا',
    labelEn: 'Trucks in Logistics Network',
  },
];

// Helper easing function for smooth progression with gentle deceleration
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

const AnimatedStatCard: React.FC<{
  stat: StatItem;
  index: number;
  isRtl: boolean;
  isInView: boolean;
}> = ({ stat, index, isRtl, isInView }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCurrentValue(0);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 3400; // 3.4 seconds for comfortable, visible number-by-number progression
    const delay = index * 120; // gentle cascading stagger

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = Math.max(0, timestamp - startTimestamp - delay);
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const nextValue = Math.floor(easedProgress * stat.targetValue);
      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentValue(stat.targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, stat.targetValue, index]);

  // Format numbers nicely (e.g., 150,000 or 8,000)
  const formattedNumber = currentValue.toLocaleString('en-US');

  return (
    <div
      className="bg-[#111317] hover:bg-[#151922] border border-neutral-800/80 hover:border-cyan-500/50 rounded-xl sm:rounded-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-6 lg:py-10 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-xl group relative w-full"
    >
      {/* Subtle glowing accent background on hover */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl sm:rounded-2xl" />

      {/* Number Display with Dynamic Rapid Roll and Slow Motion Landing - strictly nowrap and responsive sizing */}
      <div className="w-full flex items-baseline justify-center whitespace-nowrap font-black text-white tracking-tight font-sans mb-3 sm:mb-4 select-none">
        {stat.id === 'support' ? (
          <div className="flex items-baseline text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black">
            <span className="tabular-nums tracking-normal">{currentValue}</span>
            <span className="text-neutral-400 font-bold ml-0.5">/7</span>
          </div>
        ) : (
          <div className="flex items-baseline justify-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black">
            {stat.prefix && (
              <span className="text-white font-bold mr-0.5 inline-block shrink-0">{stat.prefix}</span>
            )}
            <span className="tabular-nums tracking-normal text-white">
              {formattedNumber}
            </span>
            {stat.suffix === 'm²' ? (
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white font-bold ml-1 inline-flex items-baseline shrink-0">
                m<sup className="text-xs sm:text-sm md:text-base font-bold -top-2">2</sup>
              </span>
            ) : stat.suffix ? (
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white font-bold ml-0.5 inline-block shrink-0">
                {stat.suffix}
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Label Text below number matching screenshot */}
      <p className="text-xs sm:text-sm md:text-base font-normal text-neutral-300 group-hover:text-white transition-colors w-full max-w-[260px] leading-relaxed">
        {isRtl ? stat.labelAr : stat.labelEn}
      </p>
    </div>
  );
};

export const StatsCounterSection: React.FC<StatsCounterSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="stats-metrics"
      ref={sectionRef}
      className="bg-[#080b11] py-12 sm:py-16 lg:py-20 border-y border-neutral-900 relative overflow-hidden"
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 4-Card Statistics Grid matching uploaded image screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((stat, idx) => (
            <AnimatedStatCard
              key={stat.id}
              stat={stat}
              index={idx}
              isRtl={isRtl}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
