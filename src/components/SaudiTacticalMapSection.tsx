import React, { useState } from 'react';
import { Language, LogisticsHub } from '../types';
import { SAUDI_HUBS_DATA, COMPANY_INFO, ASSETS } from '../data/logisticsData';
import { 
  MapPin, 
  Warehouse, 
  Truck, 
  Thermometer, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Radio, 
  Layers, 
  Clock,
  Shield,
  Activity,
  Send,
  CornerDownRight,
  Compass
} from 'lucide-react';

interface SaudiTacticalMapSectionProps {
  lang: Language;
}

// Distribution destinations reachable directly from Jeddah Central Hub (Mapped to 1000x1000 Coordinate System)
interface DistributionRoute {
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  x: number;
  y: number;
  transitHours: string;
  distanceKm: string;
  type: 'major' | 'regional' | 'port' | 'industrial';
  frequencyAr: string;
  frequencyEn: string;
  facilitiesCount?: number;
}

const SAUDI_DISTRIBUTION_ROUTES: DistributionRoute[] = [
  {
    id: 'riyadh',
    nameAr: 'الرياض',
    nameEn: 'Riyadh',
    regionAr: 'المنطقة الوسطى',
    regionEn: 'Central Region',
    x: 580,
    y: 505,
    transitHours: '10 - 12 ساعة',
    distanceKm: '950 كم',
    type: 'major',
    frequencyAr: 'رحلات يومية منتظمة (3 رحلات / يوم)',
    frequencyEn: 'Daily Scheduled Runs (3x/day)',
    facilitiesCount: 4
  },
  {
    id: 'dammam',
    nameAr: 'مركز الدمام',
    nameEn: 'Dammam Port Hub',
    regionAr: 'المنطقة الشرقية',
    regionEn: 'Eastern Province',
    x: 740,
    y: 405,
    transitHours: '14 - 16 ساعة',
    distanceKm: '1,340 كم',
    type: 'major',
    frequencyAr: 'يومي مباشر عبر المحور السريع',
    frequencyEn: 'Daily direct expressway corridor',
    facilitiesCount: 2
  },
  {
    id: 'jubail',
    nameAr: 'مجمع الجبيل اللوجستي',
    nameEn: 'Jubail Industrial Cluster',
    regionAr: 'المنطقة الشرقية',
    regionEn: 'Eastern Province',
    x: 715,
    y: 375,
    transitHours: '16 ساعة',
    distanceKm: '1,420 كم',
    type: 'industrial',
    frequencyAr: 'شحنات صناعية ومواد بتروكيماوية',
    frequencyEn: 'Industrial & petrochemical freight',
    facilitiesCount: 2
  },
  {
    id: 'qassim',
    nameAr: 'بريدة / القصيم',
    nameEn: 'Al Qassim (Buraidah)',
    regionAr: 'منطقة القصيم',
    regionEn: 'Al Qassim Province',
    x: 440,
    y: 410,
    transitHours: '8 - 9 ساعات',
    distanceKm: '820 كم',
    type: 'regional',
    frequencyAr: 'يومي مجدول للمستودعات التجارية',
    frequencyEn: 'Daily for commercial hubs',
    facilitiesCount: 1
  },
  {
    id: 'hail',
    nameAr: 'حائل',
    nameEn: 'Hail',
    regionAr: 'منطقة حائل',
    regionEn: 'Hail Province',
    x: 345,
    y: 340,
    transitHours: '9 ساعات',
    distanceKm: '860 كم',
    type: 'regional',
    frequencyAr: '3 رحلات أسبوعياً',
    frequencyEn: '3 scheduled runs / week',
    facilitiesCount: 1
  },
  {
    id: 'sakaka',
    nameAr: 'سكاكا / الجوف',
    nameEn: 'Sakaka / Al Jouf',
    regionAr: 'منطقة الجوف',
    regionEn: 'Al Jouf Province',
    x: 275,
    y: 190,
    transitHours: '12 - 14 ساعة',
    distanceKm: '1,150 كم',
    type: 'regional',
    frequencyAr: 'رحلات منتظمة للمنافذ الشمالية',
    frequencyEn: 'Regular runs to Northern corridors',
    facilitiesCount: 1
  },
  {
    id: 'tabuk',
    nameAr: 'تبوك / نيوم',
    nameEn: 'Tabuk / NEOM',
    regionAr: 'منطقة تبوك',
    regionEn: 'Tabuk Province',
    x: 122,
    y: 285,
    transitHours: '10 - 11 ساعة',
    distanceKm: '1,020 كم',
    type: 'major',
    frequencyAr: 'شحن مباشر لدعم مشاريع الشمال الغربي ونيوم',
    frequencyEn: 'Direct dispatch supporting NEOM & projects',
    facilitiesCount: 1
  },
  {
    id: 'medina',
    nameAr: 'المدينة المنورة',
    nameEn: 'Madinah',
    regionAr: 'منطقة المدينة',
    regionEn: 'Madinah Province',
    x: 240,
    y: 525,
    transitHours: '4 - 5 ساعات',
    distanceKm: '415 كم',
    type: 'regional',
    frequencyAr: 'شحن فوري يومي متعدد الفترات',
    frequencyEn: 'Multi-slot daily direct dispatch',
    facilitiesCount: 2
  },
  {
    id: 'yanbu',
    nameAr: 'ينبع الصناعية والميناء',
    nameEn: 'Yanbu Port & Industrial',
    regionAr: 'المنطقة الغربية',
    regionEn: 'Western Province',
    x: 190,
    y: 550,
    transitHours: '3.5 ساعات',
    distanceKm: '330 كم',
    type: 'port',
    frequencyAr: 'ربط بحري وبري فوري بين موانئ الغربية',
    frequencyEn: 'Direct port-to-port feeder corridor',
    facilitiesCount: 1
  },
  {
    id: 'abha',
    nameAr: 'أبها / خميس مشيط',
    nameEn: 'Abha / Khamis Mushait',
    regionAr: 'منطقة عسير',
    regionEn: 'Asir Province',
    x: 380,
    y: 900,
    transitHours: '7 - 8 ساعات',
    distanceKm: '625 كم',
    type: 'regional',
    frequencyAr: 'يومي مكيّف للبضائع الاستهلاكية والمبردة',
    frequencyEn: 'Daily climate-controlled freight',
    facilitiesCount: 1
  },
  {
    id: 'jazan',
    nameAr: 'نجران / جازان',
    nameEn: 'Najran & Jazan',
    regionAr: 'المنطقة الجنوبية',
    regionEn: 'Southern Province',
    x: 450,
    y: 950,
    transitHours: '8 ساعات',
    distanceKm: '710 كم',
    type: 'port',
    frequencyAr: 'ربط مباشر بالمنطقة الجنوبية والاقتصادية',
    frequencyEn: 'Direct link to Southern Economic hubs',
    facilitiesCount: 1
  }
];

export const SaudiTacticalMapSection: React.FC<SaudiTacticalMapSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const [selectedRoute, setSelectedRoute] = useState<DistributionRoute>(SAUDI_DISTRIBUTION_ROUTES[0]); // Default to Riyadh
  const [filterType, setFilterType] = useState<'all' | 'transit' | 'hub' | 'regional'>('all');
  const [radarActive, setRadarActive] = useState(true);

  // Origin Coordinates for Jeddah (HQ / Central Port & Warehouse)
  const JEDDAH_COORDS = { x: 240, y: 685 };

  const filteredRoutes = SAUDI_DISTRIBUTION_ROUTES.filter((route) => {
    if (filterType === 'all') return true;
    if (filterType === 'transit') return route.type === 'major';
    if (filterType === 'hub') return route.type === 'industrial' || route.type === 'port';
    if (filterType === 'regional') return route.type === 'regional';
    return true;
  });

  return (
    <section id="saudi-hubs" className="py-20 lg:py-28 bg-[#070d17] text-white relative overflow-hidden">
      
      {/* Background Subtle Tactical Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px), linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ================= TOP SECTION: Operational Philosophy (Matching Top Screenshot) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Top Visual: Interactive Connected Supply Chain Facility */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-900/60 bg-[#0c1424] p-5 sm:p-6 shadow-2xl">
              
              {/* Background Warehouse Facility with dark blue tactical tone */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src={ASSETS.tacticalFacility}
                  alt="HRC Connected Logistics Operations"
                  className="w-full h-full object-cover brightness-75 contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-cyan-950/40 to-black/30"></div>

                {/* Supply Chain Network SVG Overlay with connected pulsating nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 300">
                  {/* Connection Lines */}
                  <line x1="85" y1="85" x2="195" y2="65" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 4" className="animate-pulse" />
                  <line x1="195" y1="65" x2="385" y2="115" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 4" />
                  <line x1="195" y1="65" x2="160" y2="215" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 4" />
                  <line x1="160" y1="215" x2="340" y2="225" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 4" />

                  {/* Node 1: Port (الميناء) */}
                  <g transform="translate(85, 85)">
                    <circle r="14" fill="#083344" fillOpacity="0.7" />
                    <circle r="8" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                    <circle r="3.5" fill="#22d3ee" />
                    <rect x="12" y="-10" width="48" height="20" rx="4" fill="#0c1e34" stroke="#0891b2" strokeWidth="1" />
                    <text x="36" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isRtl ? 'الميناء' : 'Port'}
                    </text>
                  </g>

                  {/* Node 2: Fleet (الأسطول) */}
                  <g transform="translate(195, 65)">
                    <circle r="14" fill="#083344" fillOpacity="0.7" />
                    <circle r="8" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                    <circle r="3.5" fill="#22d3ee" />
                    <rect x="-24" y="-28" width="48" height="20" rx="4" fill="#0c1e34" stroke="#0891b2" strokeWidth="1" />
                    <text x="0" y="-14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isRtl ? 'الأسطول' : 'Fleet'}
                    </text>
                  </g>

                  {/* Node 3: Loading (التحميل) */}
                  <g transform="translate(385, 115)">
                    <circle r="14" fill="#083344" fillOpacity="0.7" />
                    <circle r="8" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                    <circle r="3.5" fill="#22d3ee" />
                    <rect x="-24" y="-28" width="48" height="20" rx="4" fill="#0c1e34" stroke="#0891b2" strokeWidth="1" />
                    <text x="0" y="-14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isRtl ? 'التحميل' : 'Loading'}
                    </text>
                  </g>

                  {/* Node 4: Warehouse (المستودع - المحجر) */}
                  <g transform="translate(160, 215)">
                    <circle r="18" fill="#06b6d4" fillOpacity="0.25" className="animate-ping" />
                    <circle r="10" fill="#0e7490" stroke="#67e8f9" strokeWidth="2.5" />
                    <circle r="4" fill="#ffffff" />
                    <rect x="-60" y="16" width="120" height="22" rx="5" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
                    <text x="0" y="31" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isRtl ? 'المستودع (المحجر - جدة)' : 'Mahjar Central Hub'}
                    </text>
                  </g>

                  {/* Node 5: Factory / Client (المصنع / العميل) */}
                  <g transform="translate(340, 225)">
                    <circle r="14" fill="#083344" fillOpacity="0.7" />
                    <circle r="8" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                    <circle r="3.5" fill="#22d3ee" />
                    <rect x="-24" y="14" width="48" height="20" rx="4" fill="#0c1e34" stroke="#0891b2" strokeWidth="1" />
                    <text x="0" y="28" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isRtl ? 'المصنع' : 'Factory'}
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bottom Telemetry Caption */}
              <div className="mt-4 pt-3 border-t border-cyan-900/40 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>{isRtl ? 'تشغيل موحد: كل نقطة متصلة وكل حركة موثقة' : 'UNIFIED DISPATCH: EVERY NODE CONNECTED & TRACKED'}</span>
                </span>
                <span className="text-emerald-400 font-bold">99.8% ON-TIME DISPATCH</span>
              </div>

            </div>
          </div>

          {/* Top Text: Operational Philosophy */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {isRtl ? 'الفلسفة التشغيلية' : 'OPERATIONAL PHILOSOPHY'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              {isRtl ? (
                <>
                  العمليات تسير وفق الخطة. <br />
                  <span className="text-cyan-400">والتعقيد يظل تحت السيطرة.</span>
                </>
              ) : (
                <>
                  Operations run on plan. <br />
                  <span className="text-cyan-400">Complexity stays under control.</span>
                </>
              )}
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed font-light">
              {isRtl
                ? 'عمليات مصممة للوضوح والموثوقية. تدير هيكل الريادة (HRC) سلسلة الإمداد من خلال رؤية متكاملة وتحكم منظم، لمعالجة التعقيد قبل أن يتحول إلى تحدٍ تشغيلي.'
                : 'Operations engineered for clarity and dependability. HRC manages your supply chain through unified visibility and disciplined control, resolving bottlenecks before they impact schedules.'}
            </p>

            <div className="p-5 rounded-2xl bg-[#0d1627] border border-cyan-900/50 text-xs text-neutral-300 italic space-y-1.5">
              <div className="text-white font-bold text-sm not-italic">
                {isRtl ? '«التحكم الحقيقي لا يبدأ عند حدوث المشكلة، بل قبل أن تظهر»' : '"True control does not begin when a problem occurs, but before it ever emerges."'}
              </div>
              <div className="text-cyan-400 font-mono text-[11px] not-italic">
                {isRtl ? '— إدارة العمليات والتحكم اللوجستي، HRC' : '— Operations & Logistics Governance, HRC'}
              </div>
            </div>
          </div>

        </div>

        {/* ================= LOWER SECTION: Tactical Saudi Radar Map Terminal (Matching Screenshot 5) ================= */}
        <div className="space-y-6">
          
          {/* Headline for Tactical Section */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {isRtl ? 'الحوكمة الإقليمية والانتشار الجغرافي' : 'REGIONAL GOVERNANCE & NETWORK'}
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {isRtl ? 'تواجد منسق عبر المملكة.' : 'Coordinated Presence Across the Kingdom.'}
            </h3>
            <p className="text-sm text-neutral-400">
              {isRtl
                ? 'نقطة انطلاق مركزية من جدة (الميناء والمستودع الرئيسي) مع خطوط نقل وتوزيع فوري تغطي كافة مدن ومناطق المملكة العربية السعودية.'
                : 'One centralized origin at Jeddah (Islamic Port & Main Facility) with direct freight and distribution corridors reaching all regions of Saudi Arabia.'}
            </p>
          </div>

          {/* Interactive Tactical Radar Map Terminal Box - Full Width Component */}
          <div className="bg-[#0c1424]/95 rounded-3xl border border-cyan-500/40 p-4 sm:p-7 shadow-2xl backdrop-blur-md relative">
            
            {/* Tactical Corner Brackets (Stylized Console Corners) */}
            <div className="absolute top-2 left-2 text-cyan-400 text-sm font-mono select-none">⌜</div>
            <div className="absolute top-2 right-2 text-cyan-400 text-sm font-mono select-none">⌝</div>
            <div className="absolute bottom-2 left-2 text-cyan-400 text-sm font-mono select-none">⌞</div>
            <div className="absolute bottom-2 right-2 text-cyan-400 text-sm font-mono select-none">⌟</div>

            {/* Terminal Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20 text-xs font-mono text-cyan-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="font-extrabold text-white tracking-widest text-sm">HRC GROUP</span>
                </div>
                <span className="text-neutral-600">|</span>
                <span className="text-cyan-300/80">
                  {isRtl ? 'نظام الحوكمة اللوجستية والانتشار الميداني' : 'FIELD LOGISTICS GOVERNANCE & NETWORK'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/80 hover:bg-emerald-900/80 px-3 py-1 rounded-md border border-emerald-500/30 transition-colors"
                  title={isRtl ? 'افتح الموقع الرئيسي في خرائط Google' : 'Open HQ location in Google Maps'}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{isRtl ? 'المركز الرئيسي: جدة (المحجر) — افتح الخريطة' : 'ORIGIN: JEDDAH HQ — OPEN MAP'}</span>
                </a>
                <span className="hidden sm:inline text-neutral-400 font-mono">21.4858° N, 39.1925° E</span>
              </div>
            </div>

            {/* Main Map Visual Canvas (Full Width SVG filling the entire section) */}
            <div className="py-4">
              <div className="w-full relative aspect-16/11 sm:aspect-16/10 md:aspect-16/9 lg:aspect-16/9 rounded-2xl bg-[#040a14] border border-cyan-900/60 overflow-hidden flex items-center justify-center p-2 sm:p-4 shadow-2xl">
                
                {/* Tactical SVG Map */}
                <svg
                  className="w-full h-full relative z-10"
                  viewBox="0 0 1020 1020"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Grid Dot Pattern */}
                    <pattern id="tacticalDotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <circle cx="16" cy="16" r="0.8" fill="#0e7490" fillOpacity="0.4" />
                    </pattern>

                    {/* Linear Grid Background Pattern */}
                    <pattern id="tacticalLineGrid" width="120" height="120" patternUnits="userSpaceOnUse">
                      <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#083344" strokeWidth="0.5" strokeOpacity="0.4" />
                    </pattern>

                    {/* Gradient Fill for the Saudi Territory */}
                    <linearGradient id="saudiPolygonFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#051a2e" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#041424" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#020d18" stopOpacity="0.98" />
                    </linearGradient>

                    {/* Neon Cyan Border Glow Filter */}
                    <filter id="neonCyanGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22d3ee" floodOpacity="0.75" />
                      <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#38bdf8" floodOpacity="0.9" />
                    </filter>

                    {/* Crosshair Marker Symbol */}
                    <g id="tacticalCrosshair">
                      <circle r="18" fill="none" stroke="#10b981" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.6" />
                      <circle r="12" fill="none" stroke="#10b981" strokeWidth="1.3" opacity="0.8" />
                      <circle r="6" fill="#042f2e" stroke="#22d3ee" strokeWidth="1.6" />
                      <circle r="2.5" fill="#34d399" />
                      <line x1="-16" y1="0" x2="-8" y2="0" stroke="#10b981" strokeWidth="1" />
                      <line x1="8" y1="0" x2="16" y2="0" stroke="#10b981" strokeWidth="1" />
                      <line x1="0" y1="-16" x2="0" y2="-8" stroke="#10b981" strokeWidth="1" />
                      <line x1="0" y1="8" x2="0" y2="16" stroke="#10b981" strokeWidth="1" />
                    </g>
                  </defs>

                  {/* Coordinate Grid Lines */}
                  <rect width="100%" height="100%" fill="url(#tacticalLineGrid)" />

                  {/* Latitude / North Indicators along the left border matching screenshot */}
                  <g fill="#475569" fontSize="10" fontFamily="monospace">
                    <line x1="0" y1="180" x2="1020" y2="180" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="185">° N</text>

                    <line x1="0" y1="310" x2="1020" y2="310" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="315">° N</text>

                    <line x1="0" y1="430" x2="1020" y2="430" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="435">° N</text>

                    <line x1="0" y1="550" x2="1020" y2="550" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="555">° N</text>

                    <line x1="0" y1="670" x2="1020" y2="670" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="675">° N</text>

                    <line x1="0" y1="790" x2="1020" y2="790" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="795">° N</text>

                    <line x1="0" y1="910" x2="1020" y2="910" stroke="#083344" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                    <text x="8" y="915">° N</text>
                  </g>

                  {/* Saudi Geographical Polygon Matching User Screenshot */}
                  <polygon
                    points="
                      45,230
                      158,118
                      220,58
                      295,95
                      470,235
                      605,240
                      635,275
                      700,365
                      728,405
                      765,545
                      790,620
                      952,638
                      975,775
                      745,875
                      610,965
                      445,950
                      380,995
                      345,935
                      265,755
                      240,685
                      195,570
                      165,490
                      105,290
                      45,230
                    "
                    fill="url(#saudiPolygonFill)"
                    stroke="#22d3ee"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter="url(#neonCyanGlow)"
                  />

                  {/* Tactical Dot Matrix fill restricted to polygon area */}
                  <polygon
                    points="
                      45,230 158,118 220,58 295,95 470,235 605,240 635,275 700,365 728,405 765,545 790,620 952,638 975,775 745,875 610,965 445,950 380,995 345,935 265,755 240,685 195,570 165,490 105,290 45,230
                    "
                    fill="url(#tacticalDotGrid)"
                  />

                  {/* Subtle In-Map Watermark matching screenshot */}
                  <g opacity="0.4">
                    <text x="240" y="590" fill="#0e7490" fontSize="22" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                      المملكة العربية السعودية
                    </text>
                    <text x="240" y="622" fill="#0891b2" fontSize="13" fontFamily="monospace" textAnchor="middle">
                      13 منطقة  •  الشرقية  •  الوسطى  •  الغربية
                    </text>
                  </g>

                  {/* Subtle Background City Names matching screenshot */}
                  <g fill="#94a3b8" fontSize="18" fontWeight="600" fontFamily="sans-serif" opacity="0.9" textAnchor="middle">
                    <text x="275" y="190">سكاكا</text>
                    <text x="125" y="285">تبوك</text>
                    <text x="345" y="340">حائل</text>
                    <text x="440" y="410">بريدة</text>
                    <text x="240" y="525">المدينة</text>
                    <text x="190" y="550">ينبع</text>
                    <text x="268" y="710">مكة</text>
                    <text x="690" y="470">الأحساء</text>
                    <text x="380" y="900">أبها</text>
                    <text x="450" y="950">نجران</text>
                  </g>

                  {/* ================= DISTRIBUTION RAYS FROM JEDDAH (240, 685) ================= */}
                  {filteredRoutes.map((route) => {
                    const isSelected = selectedRoute.id === route.id;
                    return (
                      <g key={route.id}>
                        {/* Glowing Line from Jeddah to destination */}
                        <line
                          x1="240"
                          y1="685"
                          x2={route.x}
                          y2={route.y}
                          stroke={isSelected ? '#34d399' : '#0891b2'}
                          strokeWidth={isSelected ? '3.5' : '1.5'}
                          strokeDasharray={isSelected ? '7 4' : '3 3'}
                          strokeOpacity={isSelected ? 1 : 0.5}
                          className={isSelected ? 'animate-pulse' : ''}
                        />

                        {/* Moving Pulse Particle Along Selected Line */}
                        {isSelected && (
                          <circle
                            r="5"
                            fill="#34d399"
                            cx={(240 + route.x) / 2}
                            cy={(685 + route.y) / 2}
                          />
                        )}

                        {/* Destination Target Node */}
                        <g
                          transform={`translate(${route.x}, ${route.y})`}
                          className="cursor-pointer group"
                          onClick={() => setSelectedRoute(route)}
                        >
                          {/* Crosshair Target Rings */}
                          <circle
                            r={isSelected ? '30' : '22'}
                            fill="none"
                            stroke={isSelected ? '#34d399' : '#10b981'}
                            strokeWidth={isSelected ? '2.2' : '1.4'}
                            strokeDasharray="5 3"
                            className={isSelected ? 'animate-spin' : ''}
                          />
                          <circle
                            r={isSelected ? '18' : '13'}
                            fill="none"
                            stroke={isSelected ? '#34d399' : '#06b6d4'}
                            strokeWidth={isSelected ? '1.8' : '1.2'}
                          />
                          <circle
                            r="5.5"
                            fill={isSelected ? '#34d399' : '#10b981'}
                          />
                          <circle
                            r="2.5"
                            fill="#ffffff"
                          />

                          {/* Node Label Box (Prominent size with large crisp typography) */}
                          {route.id === 'jubail' ? (
                            // مجمع الجبيل اللوجستي
                            <g transform="translate(-215, -55)">
                              <rect
                                width="205"
                                height="48"
                                rx="8"
                                fill="#031626"
                                stroke={isSelected ? '#34d399' : '#22d3ee'}
                                strokeWidth={isSelected ? '2.2' : '1.8'}
                              />
                              <text x="102" y="30" fill="#ffffff" fontSize="17.5" fontWeight="bold" textAnchor="middle">
                                {isRtl ? 'مجمع الجبيل اللوجستي' : 'Jubail Logistics Hub'}
                              </text>
                            </g>
                          ) : route.id === 'riyadh' ? (
                            // الرياض
                            <g transform="translate(28, -25)">
                              <rect
                                width="130"
                                height="48"
                                rx="8"
                                fill="#031626"
                                stroke={isSelected ? '#34d399' : '#22d3ee'}
                                strokeWidth={isSelected ? '2.2' : '1.8'}
                              />
                              <text x="65" y="31" fill="#ffffff" fontSize="19" fontWeight="bold" textAnchor="middle">
                                {isRtl ? 'الرياض' : 'Riyadh'}
                              </text>
                            </g>
                          ) : route.id === 'dammam' ? (
                            // مركز الدمام / 2 مرافق
                            <g transform="translate(38, -32)">
                              <rect
                                width="140"
                                height="62"
                                rx="8"
                                fill="#031626"
                                stroke={isSelected ? '#34d399' : '#22d3ee'}
                                strokeWidth={isSelected ? '2.2' : '1.8'}
                              />
                              <text x="70" y="28" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">
                                {isRtl ? 'مركز الدمام' : 'Dammam Hub'}
                              </text>
                              <text x="70" y="49" fill="#34d399" fontSize="14.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                                {isRtl ? '2 مرافق' : '2 Facilities'}
                              </text>
                            </g>
                          ) : (
                            // Other Interactive Destination Nodes
                            <g transform={route.x > 500 ? 'translate(-150, -36)' : 'translate(26, -18)'}>
                              <rect
                                width={route.nameAr.length > 8 ? '146' : '118'}
                                height="38"
                                rx="8"
                                fill="#031626"
                                stroke={isSelected ? '#34d399' : '#0e7490'}
                                strokeWidth={isSelected ? '2' : '1.4'}
                              />
                              <text
                                x={route.nameAr.length > 8 ? 73 : 59}
                                y="25"
                                fill={isSelected ? '#ffffff' : '#e2e8f0'}
                                fontSize="15.5"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                {isRtl ? route.nameAr : route.nameEn}
                              </text>
                            </g>
                          )}
                        </g>
                      </g>
                    );
                  })}

                  {/* ================= CENTRAL ORIGIN HUB: JEDDAH (240, 685) ================= */}
                  <g
                    transform="translate(240, 685)"
                    className="cursor-pointer"
                    onClick={() => {
                      const riyadh = SAUDI_DISTRIBUTION_ROUTES.find(r => r.id === 'riyadh');
                      if (riyadh) setSelectedRoute(riyadh);
                    }}
                  >
                    {/* Concentric Tactical Crosshair Target Rings */}
                    <circle r="36" fill="#10b981" fillOpacity="0.18" className="animate-ping" />
                    <circle r="28" fill="none" stroke="#10b981" strokeWidth="1.6" strokeDasharray="6 3" />
                    <circle r="18" fill="none" stroke="#34d399" strokeWidth="2.2" />
                    <circle r="8" fill="#10b981" />
                    <circle r="3" fill="#ffffff" />
                    
                    {/* Crosshair Ticks */}
                    <line x1="-36" y1="0" x2="-20" y2="0" stroke="#10b981" strokeWidth="2" />
                    <line x1="20" y1="0" x2="36" y2="0" stroke="#10b981" strokeWidth="2" />
                    <line x1="0" y1="-36" x2="0" y2="-20" stroke="#10b981" strokeWidth="2" />
                    <line x1="0" y1="20" x2="0" y2="36" stroke="#10b981" strokeWidth="2" />

                    {/* Central Jeddah Tag Box matching screenshot: `جدة 1` + `2 مرافق` */}
                    <g transform="translate(42, -72)">
                      <rect
                        width="136"
                        height="64"
                        rx="8"
                        fill="#031626"
                        stroke="#22d3ee"
                        strokeWidth="2.2"
                      />
                      <text x="68" y="29" fill="#ffffff" fontSize="19.5" fontWeight="bold" textAnchor="middle">
                        {isRtl ? 'جدة 1' : 'Jeddah 1'}
                      </text>
                      <text x="68" y="50" fill="#34d399" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        {isRtl ? '2 مرافق' : '2 Facilities'}
                      </text>
                    </g>
                  </g>
                </svg>

              </div>
            </div>

            {/* Active Selected Corridor Streamlined 1-Line Status Bar */}
            <div className="mt-2 bg-[#081324] border border-cyan-500/30 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white text-sm">
                  {isRtl ? `مسار نشط: جدة (المقر الرئيسي) ⟵⟶ ${selectedRoute.nameAr}` : `Active Corridor: Jeddah HQ ⟵⟶ ${selectedRoute.nameEn}`}
                </span>
                <span className="text-neutral-500">|</span>
                <span className="text-cyan-300 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedRoute.transitHours}
                </span>
                <span className="text-neutral-500">|</span>
                <span className="text-emerald-400 font-mono">{selectedRoute.distanceKm}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneDigits}`}
                  className="py-1.5 px-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Phone className="w-3 h-3" />
                  <span>{isRtl ? 'طلب شحنة فورية' : 'Book Dispatch'}</span>
                </a>
              </div>
            </div>

            {/* Bottom Filter Toggles matching Screenshot */}
            <div className="pt-4 mt-3 border-t border-cyan-500/20 flex flex-wrap items-center justify-center gap-3 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-5 py-2 rounded-full font-mono font-bold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                ● {isRtl ? 'كافة مسارات التوزيع بالمملكة' : 'ALL DISTRIBUTION ROUTES'}
              </button>

              <button
                onClick={() => setFilterType('transit')}
                className={`px-5 py-2 rounded-full font-mono font-bold transition-all cursor-pointer ${
                  filterType === 'transit'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                — {isRtl ? 'المحاور السريعة الكبرى' : 'ACTIVE TRANSIT'}
              </button>

              <button
                onClick={() => setFilterType('hub')}
                className={`px-5 py-2 rounded-full font-mono font-bold transition-all cursor-pointer ${
                  filterType === 'hub'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                ● {isRtl ? 'الموانئ والمجمعات الصناعية' : 'DISTRIBUTION HUB'}
              </button>

              <button
                onClick={() => setFilterType('regional')}
                className={`px-5 py-2 rounded-full font-mono font-bold transition-all cursor-pointer ${
                  filterType === 'regional'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                ● {isRtl ? 'المناطق الإقليمية' : 'REGIONAL OFFICES'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

