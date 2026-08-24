/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCounterSection } from './components/StatsCounterSection';
import { TechnologySection } from './components/TechnologySection';
import { SolutionsSection } from './components/SolutionsSection';
import { SaudiTacticalMapSection } from './components/SaudiTacticalMapSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { Footer } from './components/Footer';
import { TrackingModal } from './components/TrackingModal';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string | undefined>(undefined);
  const [activeTrackingCode, setActiveTrackingCode] = useState<string>('HRC-8492-SA');

  // Synchronize document direction and language on lang state changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedQuoteService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleOpenTrackingWithCode = (code: string) => {
    setActiveTrackingCode(code);
    setIsTrackingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-[#f8f9fa] text-[#1c1b1b] flex flex-col font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Top Fixed Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
        activeSection="hero"
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Container Ship Backdrop and Clean Call-to-Actions (Screenshots 1 & 2) */}
        <HeroSection
          lang={lang}
          onOpenQuote={() => handleOpenQuote()}
          onOpenTrackingWithCode={handleOpenTrackingWithCode}
        />

        {/* Dynamic Rolling Stats Counter Section */}
        <StatsCounterSection
          lang={lang}
        />

        {/* 2. Solutions Showcase (Screenshot 4) */}
        <SolutionsSection
          lang={lang}
          onOpenQuote={handleOpenQuote}
        />

        {/* 3. Technology & Innovation (Screenshot 3) */}
        <TechnologySection
          lang={lang}
        />

        {/* 4. Cinematic Saudi Arabia Hubs & Tactical Radar Map (Screenshot 5) */}
        <SaudiTacticalMapSection
          lang={lang}
        />

        {/* 5. Verified Google Profile & Customer Reviews (From provided HRC Google Maps data) */}
        <GoogleReviewsSection
          lang={lang}
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Interactive Modals */}
      <TrackingModal
        lang={lang}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialCode={activeTrackingCode}
      />

      <QuoteModal
        lang={lang}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={selectedQuoteService}
      />
    </div>
  );
}

