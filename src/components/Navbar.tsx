import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/logisticsData';
import { Globe, Phone, Search, Calculator, Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenTracking?: () => void;
  onOpenQuote: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenTracking,
  onOpenQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', labelEn: 'About Us', labelAr: 'من نحن' },
    { href: '#services', labelEn: 'Services', labelAr: 'خدماتنا' },
    { href: '#technology', labelEn: 'Technology', labelAr: 'التقنية' },
    { href: '#saudi-hubs', labelEn: 'Storage & Hubs', labelAr: 'المستودعات والمراكز' },
    { href: '#reviews', labelEn: 'Reviews', labelAr: 'آراء العملاء' },
    { href: '#contact', labelEn: 'Contact', labelAr: 'اتصل بنا' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-neutral-200/80'
          : 'bg-white/90 backdrop-blur-xs py-3.5 border-b border-neutral-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Logo & Identity */}
          <a
            id="brand-logo"
            href="#"
            className="flex items-center gap-3 shrink-0 focus:outline-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1c1b1b] flex items-center justify-center text-white font-extrabold text-lg tracking-wider group-hover:bg-neutral-800 transition-colors shadow-xs">
              HRC
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg font-black tracking-tight text-[#1c1b1b] leading-tight">
                HRC LOGISTICS
              </div>
              <span className="text-[11px] text-neutral-500 font-medium">
                {lang === 'ar' ? 'هيكل الريادة للخدمات اللوجستية' : 'Haikaal Al Reyadah'}
              </span>
            </div>
          </a>

          {/* 2. Center: Clean Spaced Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-black transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all after:duration-200"
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>

          {/* 3. Right: Organized Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Direct Phone Call Button */}
            <a
              id="quick-phone-nav-btn"
              href={`tel:${COMPANY_INFO.phoneDigits}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200/80"
              title={lang === 'ar' ? 'اتصال مباشر بفريق العمليات' : 'Call Operations Dispatch'}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span dir="ltr" className="font-mono font-bold tracking-tight">{COMPANY_INFO.phone}</span>
            </a>

            {/* Language Switch Toggle */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer border border-neutral-200"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Request Quote Button */}
            <button
              id="quote-nav-btn"
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#1c1b1b] hover:bg-neutral-800 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'طلب تسعيرة' : 'Get Quote'}</span>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold border border-neutral-200"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1c1b1b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طلب تسعيرة شحن وتخزين' : 'Request Freight & Storage Quote'}</span>
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneDigits}`}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ar' ? `اتصال مباشر: ${COMPANY_INFO.phone}` : `Call Now: ${COMPANY_INFO.phone}`}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
