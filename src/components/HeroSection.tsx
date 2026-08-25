import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO, ASSETS } from '../data/logisticsData';
import heroShipBg from '../assets/wmremove-transformed.png';
import { ArrowRight, ArrowLeft, Star, MapPin, Clock, Shield, CheckCircle2, Phone, Calculator, Ship, Warehouse, Truck } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onOpenQuote: () => void;
  onOpenTrackingWithCode?: (code: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenQuote,
}) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden bg-neutral-950">
      
      {/* Background Image: Aerial Drone Container Ship on Ocean Water */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroShipBg || `${import.meta.env.BASE_URL}images/wmremove-transformed.png`}
          onError={(e) => {
            // Fallback to high-res aerial ocean vessel asset if local file is not present
            (e.target as HTMLImageElement).src = ASSETS.heroShip;
          }}
          alt="Aerial view of container cargo ship"
          className="w-full h-full object-cover object-center opacity-90 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Gradient Overlays for High Contrast & Text Legibility without obscuring the ship */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-neutral-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Content Section - Pure and transparent to reveal the vessel background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Main Text Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-white">
              
              {/* Brand & Location Indicator Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white/90 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>
                  {isRtl
                    ? 'هيكل الريادة للخدمات اللوجستية · جدة المحجر'
                    : 'HRC Logistics · Al Mahjar, Jeddah'}
                </span>
              </div>

              {/* Primary Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
                {isRtl ? (
                  <>
                    لنقود أعمالك <br />
                    <span className="text-emerald-400">نحو الريادة اللوجستية</span>
                  </>
                ) : (
                  <>
                    Let's Move Your <br />
                    <span className="text-emerald-400">Business Forward</span>
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                {isRtl
                  ? 'نوفر حلول شحن وتخزين متكاملة وموثوقة أينما كنت بالمملكة وخارجها. معنا تنال الدقة، السرعة، والاطمئنان في كل خطوة من الميناء إلى الباب.'
                  : 'We provide reliable, end-to-end freight and modern warehousing across Saudi Arabia. Experience precision, speed, and peace of mind from port to door.'}
              </p>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                {/* Google Reviews Pill */}
                <a
                  href="#reviews"
                  className="flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 text-white transition-colors shadow-md"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{COMPANY_INFO.rating}</span>
                  <span className="text-white/80">
                    ({COMPANY_INFO.reviewCount} {isRtl ? 'تقييمات Google' : 'Google Reviews'})
                  </span>
                </a>

                {/* Location Pill */}
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 text-white transition-colors shadow-md group"
                  title={isRtl ? 'فتح الموقع في خرائط Google' : 'Open in Google Maps'}
                >
                  <MapPin className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline">{isRtl ? 'حي المحجر، جدة' : 'Al Mahjar, Jeddah 26411'}</span>
                </a>

                {/* Operating Hours Pill */}
                <div className="flex items-center gap-1.5 bg-emerald-950/70 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-300 shadow-md">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{isRtl ? COMPANY_INFO.hoursAr : COMPANY_INFO.hoursEn}</span>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  id="hero-get-quote-btn"
                  onClick={onOpenQuote}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 text-sm font-black transition-all cursor-pointer shadow-xl active:scale-95"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{isRtl ? 'طلب تسعيرة فورية' : 'Get Instant Quote'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <a
                  id="hero-call-btn"
                  href={`tel:${COMPANY_INFO.phoneDigits}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white text-sm font-bold transition-colors border border-white/30 shadow-xl"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{isRtl ? 'اتصل بنا مباشرة' : 'Contact Dispatch'}</span>
                </a>
              </div>

            </div>

            {/* Right Highlights Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Feature Box 1: Storage Capacity */}
              <div className="bg-black/60 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-white space-y-1 shadow-lg hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-white/70">
                    {isRtl ? 'الطاقة الاستيعابية المركزية' : 'Storage Capacity'}
                  </span>
                  <Warehouse className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  18,500 م² <span className="text-xs font-normal text-white/80">/ 14,200 {isRtl ? 'طبلية' : 'Pallets'}</span>
                </div>
                <p className="text-xs text-white/80">
                  {isRtl ? 'مستودعات مجهزة ومكيّفة بحي المحجر بجدة وقرب الميناء' : 'Climate-controlled facility at Al Mahjar near Jeddah Islamic Port'}
                </p>
              </div>

              {/* Feature Box 2: Sea Freight & Transit */}
              <div className="bg-black/60 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-white space-y-1 shadow-lg hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-white/70">
                    {isRtl ? 'الممر الملاحي والبري' : 'Sea & Land Transit'}
                  </span>
                  <Ship className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {isRtl ? 'تخليص ونقل فوري' : 'Direct Port Clearance & Dispatch'}
                </div>
                <p className="text-xs text-white/80">
                  {isRtl ? 'ربط مباشر بمنصة فسح وتوجيه الشحنات لجميع مدن المملكة' : 'Direct FASAH portal integration & Kingdom-wide distribution'}
                </p>
              </div>

              {/* Feature Box 3: Fleet Network */}
              <div className="bg-black/60 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-white space-y-1 shadow-lg hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-white/70">
                    {isRtl ? 'أسطول التوزيع السريع' : 'Dedicated Fleet'}
                  </span>
                  <Truck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  45+ {isRtl ? 'شاحنة ومركبة نقل' : 'Modern Fleet Units'}
                </div>
                <p className="text-xs text-white/80">
                  {isRtl ? 'توصيل يومي إلى الرياض، الدمام، ينبع، ومختلف المناطق' : 'Daily scheduled runs to Riyadh, Dammam, Yanbu & industrial zones'}
                </p>
              </div>

            </div>

        </div>

      </div>
    </section>
  );
};
