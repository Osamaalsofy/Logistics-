import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO, SOLUTIONS_DATA } from '../data/logisticsData';
import { MapPin, Phone, Mail, Clock, Shield, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenQuote: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onToggleLang,
  onOpenQuote,
  onOpenTracking,
}) => {
  const isRtl = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#11161f] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-lg">
                HRC
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white">
                  {isRtl ? COMPANY_INFO.nameAr : COMPANY_INFO.nameEn}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  LOGISTICS & SUPPLY CHAIN MANAGEMENT
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {isRtl ? COMPANY_INFO.taglineAr : COMPANY_INFO.taglineEn}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenQuote}
                className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {isRtl ? 'طلب تسعيرة' : 'Get Quote'}
              </button>
              <button
                onClick={onOpenTracking}
                className="px-4 py-2 rounded-full bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer"
              >
                {isRtl ? 'تتبع شحنة' : 'Track Cargo'}
              </button>
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {isRtl ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {isRtl ? 'من نحن' : 'About Us'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {isRtl ? 'الخدمات والحلول' : 'Solutions'}
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  {isRtl ? 'التقنية والابتكار' : 'Technology'}
                </a>
              </li>
              <li>
                <a href="#saudi-hubs" className="hover:text-white transition-colors">
                  {isRtl ? 'المستودعات والمراكز' : 'Storage & Hubs'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {isRtl ? 'آراء العملاء' : 'Client Reviews'}
                </a>
              </li>
            </ul>
          </div>

          {/* Logistics Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {isRtl ? 'خدماتنا اللوجستية' : 'Logistics Services'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              {SOLUTIONS_DATA.map((sol) => (
                <li key={sol.id}>
                  <a href="#services" className="hover:text-white transition-colors block">
                    {isRtl ? sol.titleAr : sol.titleEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Saudi Info (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {isRtl ? 'المقر والتواصل' : 'Location & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{isRtl ? COMPANY_INFO.addressAr : COMPANY_INFO.addressEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRtl ? COMPANY_INFO.hoursAr : COMPANY_INFO.hoursEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneDigits}`} className="hover:underline font-mono" dir="ltr">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {isRtl ? COMPANY_INFO.nameAr : COMPANY_INFO.nameEn}. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isRtl ? 'English Version' : 'النسخة العربية'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
