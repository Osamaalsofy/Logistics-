import React, { useState } from 'react';
import { Language, ReviewItem } from '../types';
import { REVIEWS_DATA, COMPANY_INFO } from '../data/logisticsData';
import { ScrollReelTestimonials, ScrollReelTestimonial } from './ui/scroll-reel-testimonials';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Share2, 
  Bookmark, 
  Navigation, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

interface GoogleReviewsSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

const BASE_TESTIMONIALS_AR: ScrollReelTestimonial[] = [
  {
    id: 'rev-google-1',
    quote: "شركة محترمة وموظفون محترفون وأسعارهم مناسبة ولديهم اهتمام حقيقي بالعميل وسرعة الإنجاز، شكراً لكم ونسأل الله لكم دوام التوفيق.",
    author: "خضر العُمري",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
    alt: "خضر العُمري",
    rating: 5,
    date: "قبل شهرين",
    isLocalGuide: true,
    guideDetails: "مرشد محلي (Local Guide) · 7 تقييمات · 10 صور",
    ownerResponse: "شاكرون لك كلماتك الطيبة، ونسعد دائماً بخدمتكم في هيكل الريادة ونسأل الله لكم التوفيق والنجاح.",
    ownerResponseDate: "قبل شهرين",
    badge: "guide"
  },
  {
    id: 'rev-enterprise-1',
    quote: "تعاملنا مع هيكل الريادة لنقل وتخزين شحناتنا المبردة والجافة بين موانئ جدة والرياض والشرقية، دقة المواعيد وسرعة التخليص الجمركي كانت استثنائية.",
    author: "م. طارق الغامدي — مدير سلاسل الإمداد، المجموعة الوطنية للتوزيع",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "م. طارق الغامدي",
    rating: 5,
    date: "قبل 3 أشهر",
    badge: "enterprise"
  },
  {
    id: 'rev-google-2',
    quote: "تعامل ممتاز وموظفون محترمون والتزام احترافي بالمواعيد، بالتوفيق لكم ولسائر فريق العمل اللوجستي.",
    author: "سامي سامي (Sami Sami)",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
    alt: "سامي سامي",
    rating: 5,
    date: "قبل 6 أشهر",
    ownerResponse: "شاكرون لك كلماتك الجميلة، وإن شاء الله نكون دائماً عند حسن ظنكم ونسأل الله لك التوفيق.",
    ownerResponseDate: "قبل 6 أشهر",
    badge: "google"
  },
  {
    id: 'rev-enterprise-2',
    quote: "الأسطول المجهز بنظام التتبع الحراري والمتابعة اللحظية للشحنات منع أي تأخير في سلاسل الإمداد الحساسة لدينا، شريك موثوق نعتمد عليه بالكامل.",
    author: "أ. سارة العتيبي — رئيسة العمليات اللوجستية، كولد تشين الخليج",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop",
    alt: "أ. سارة العتيبي",
    rating: 5,
    date: "قبل 4 أشهر",
    badge: "enterprise"
  },
  {
    id: 'rev-google-3',
    quote: "تعامل الموظفين ممتاز ومتابعة دقيقة للشحنات في مستودعات المحجر بجدة حتى وصولها النهائي بأمان.",
    author: "محمد حسين",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop",
    alt: "محمد حسين",
    rating: 5,
    date: "قبل 6 أشهر",
    ownerResponse: "شاكرون لك ثقتك الغالية، ونسعد دائماً بتقديم أفضل الخدمات اللوجستية.",
    ownerResponseDate: "قبل 6 أشهر",
    badge: "google"
  },
  {
    id: 'rev-enterprise-3',
    quote: "خدمة تخليص جمركي ومناولة بميناء جدة الإسلامي تمت في زمن قياسي مع توفير مساحات تخزين آمنة ومراقبة على مدار الساعة.",
    author: "خالد منصور — مشرف المشتريات والخدمات اللوجستية، صناعات البحر الأحمر",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "خالد منصور",
    rating: 5,
    date: "قبل 5 أشهر",
    badge: "enterprise"
  },
  {
    id: 'rev-enterprise-4',
    quote: "شبكة التوزيع تغطي كافة مناطق المملكة بأعلى كفاءة، وفريق العمليات يقدم دعماً احترافياً ومتابعة فورية على مدار 24 ساعة.",
    author: "بدر الزهراني — مدير النقل والتوزيع، الأغذية المتحدة",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "بدر الزهراني",
    rating: 5,
    date: "قبل 7 أشهر",
    badge: "enterprise"
  },
];

const BASE_TESTIMONIALS_EN: ScrollReelTestimonial[] = [
  {
    id: 'rev-google-1',
    quote: "Respectable company, respectable employees, fair prices, smaller agile vehicles, and they genuinely care about the customer. Thank you and may Allah grant you success.",
    author: "Khidr Al-Omari",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
    alt: "Khidr Al-Omari",
    rating: 5,
    date: "2 months ago",
    isLocalGuide: true,
    guideDetails: "Local Guide · 7 reviews · 10 photos",
    ownerResponse: "We sincerely thank you for your kind words. We look forward to always meeting your expectations, and we wish you continuous success.",
    ownerResponseDate: "2 months ago",
    badge: "guide"
  },
  {
    id: 'rev-enterprise-1',
    quote: "We partnered with HRC Logistics for our cold and dry freight across Jeddah, Riyadh, and Dammam. Their on-time precision and customs clearance speed are exceptional.",
    author: "Eng. Tariq Al-Ghamdi — Supply Chain Director, National Distribution",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Eng. Tariq Al-Ghamdi",
    rating: 5,
    date: "3 months ago",
    badge: "enterprise"
  },
  {
    id: 'rev-google-2',
    quote: "Excellent interaction, polite and professional staff, and strict commitment to delivery schedules. Best of luck to you.",
    author: "Sami Sami",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
    alt: "Sami Sami",
    rating: 5,
    date: "6 months ago",
    ownerResponse: "Thank you for your beautiful words! Inshallah we will always remain at your best expectations. We wish you prosperity and success.",
    ownerResponseDate: "6 months ago",
    badge: "google"
  },
  {
    id: 'rev-enterprise-2',
    quote: "The telematics-equipped fleet with live temperature tracking eliminated delays across our cold chain network. A dependable enterprise partner.",
    author: "Sarah Al-Otaibi — Head of Logistics, Gulf Cold Chain Co.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop",
    alt: "Sarah Al-Otaibi",
    rating: 5,
    date: "4 months ago",
    badge: "enterprise"
  },
  {
    id: 'rev-google-3',
    quote: "Staff customer service is excellent and tracking updates from the Al Mahjar hub were swift.",
    author: "Mohamed Hussein",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop",
    alt: "Mohamed Hussein",
    rating: 5,
    date: "6 months ago",
    ownerResponse: "We appreciate your lovely visit and review, and inshallah we will maintain this high standard of service.",
    ownerResponseDate: "6 months ago",
    badge: "google"
  },
  {
    id: 'rev-enterprise-3',
    quote: "Customs clearance and cargo handling at Jeddah Islamic Port was handled in record time with 24/7 guarded secure warehousing storage.",
    author: "Khalid Mansoor — Procurement & Logistics Lead, Red Sea Industrial",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Khalid Mansoor",
    rating: 5,
    date: "5 months ago",
    badge: "enterprise"
  },
  {
    id: 'rev-enterprise-4',
    quote: "Nationwide coverage with prompt 24/7 operational dispatch support. They consistently exceed SLA targets for heavy haul and distribution.",
    author: "Bader Al-Zahrani — Transport Director, United Foods Co.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Bader Al-Zahrani",
    rating: 5,
    date: "7 months ago",
    badge: "enterprise"
  },
];

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ lang, onOpenQuote }) => {
  const isRtl = lang === 'ar';
  const [filterCategory, setFilterCategory] = useState<'all' | 'guide' | 'enterprise'>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<ScrollReelTestimonial[]>([]);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const baseList = isRtl ? BASE_TESTIMONIALS_AR : BASE_TESTIMONIALS_EN;
  const fullList = [...customReviews, ...baseList];

  const filteredTestimonials = fullList.filter(item => {
    if (filterCategory === 'guide') return item.isLocalGuide || item.badge === 'guide';
    if (filterCategory === 'enterprise') return item.badge === 'enterprise';
    return true;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: ScrollReelTestimonial = {
      id: `review-${Date.now()}`,
      author: newAuthor,
      quote: newComment,
      rating: newRating,
      date: isRtl ? 'الآن' : 'Just now',
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80&auto=format&fit=crop",
      alt: newAuthor,
      ownerResponse: isRtl 
        ? 'شاكرين لك تقييمك الكريم ونسعد دائماً بخدمتك في هيكل الريادة اللوجستية.' 
        : 'Thank you for your valuable feedback! We appreciate your partnership with HRC Logistics.',
      ownerResponseDate: isRtl ? 'الآن' : 'Just now',
      badge: 'google'
    };

    setCustomReviews([created, ...customReviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmittedFeedback(false);
      setNewAuthor('');
      setNewComment('');
    }, 1400);
  };

  return (
    <section id="reviews" className="py-20 lg:py-24 bg-[#0a0f19] text-white border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header & Google Meta Summary Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <span>{isRtl ? '/آراء العملاء والاعتماد الميداني' : '/VERIFIED CLIENT REVIEWS'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-cyan-400 font-semibold">{isRtl ? 'ملف Google المعتمد' : 'Google Verified Profile'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isRtl ? 'ثقة شركائنا في كل شحنة' : 'Client Trust in Every Delivery'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              {isRtl 
                ? 'تقييمات ميدانية معتمدة من كبرى الشركات ومدراء سلاسل الإمداد في المملكة عبر منصة Google والتعاملات المباشرة.' 
                : 'Verified reviews and operational testimonials from supply chain directors and enterprise partners across Saudi Arabia.'}
            </p>
          </div>

          {/* Google Profile Score Summary Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-neutral-900/90 px-4 py-3 rounded-2xl border border-neutral-800 shadow-inner">
              <div className="text-2xl font-black text-white">{COMPANY_INFO.rating}</div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  {COMPANY_INFO.reviewCount} {isRtl ? 'تقييم موثق على Google' : 'Google Reviews'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0c121e] text-xs font-bold transition-all shadow-md hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isRtl ? 'كتابة تقييم جديد' : 'Write a Review'}</span>
            </button>

            <a
              href="https://maps.google.com/?q=Al+Mahjar,+Jeddah+26411"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold hover:bg-neutral-800 transition-colors border border-neutral-800 flex items-center gap-1.5"
            >
              <span>{isRtl ? 'خرائط Google' : 'Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Filter Category Chips & Business Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-cyan-500 text-[#0c121e] shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {isRtl ? 'كافة التقييمات' : 'All Reviews'} ({fullList.length})
            </button>

            <button
              onClick={() => setFilterCategory('guide')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'guide'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'مرشدو Google المحليون' : 'Local Guides'}</span>
            </button>

            <button
              onClick={() => setFilterCategory('enterprise')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'enterprise'
                  ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isRtl ? 'شركاء سلاسل الإمداد' : 'Enterprise Logistics'}</span>
            </button>
          </div>

          {/* Quick Business Actions */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <a
              href="https://maps.google.com/?q=Al+Mahjar,+Jeddah+26411"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition-colors border border-neutral-800/80"
            >
              <Navigation className="w-3 h-3 text-cyan-400" />
              <span>{isRtl ? 'الموقع: المحجر، جدة' : 'Al Mahjar, Jeddah'}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneDigits}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition-colors border border-neutral-800/80"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Unified Merged Scroll Reel Showcase */}
        <div className="flex justify-center w-full">
          <ScrollReelTestimonials
            key={filterCategory}
            testimonials={filteredTestimonials}
            charStaggerMs={7}
            isRtl={isRtl}
            onOpenReviewModal={() => setShowReviewModal(true)}
            className="w-full"
          />
        </div>

        {/* Bottom Verified Trust Guarantee Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {isRtl ? '100% نسبة الالتزام بالمواعيد' : '100% On-Time Precision'}
              </div>
              <div className="text-[11px] text-neutral-400">
                {isRtl ? 'متابعة لحظية ومطابقة لمعايير SLA' : 'Real-time telemetry & strict SLA'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {isRtl ? 'تراخيص معتمدة وفسح جمركي' : 'Licensed & FASAH Certified'}
              </div>
              <div className="text-[11px] text-neutral-400">
                {isRtl ? 'هيئة النقل ومصلحة الزكاة والجمارك' : 'Saudi Transport Authority & ZATCA'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {isRtl ? 'دعم وتشغيل لوجستي 24/7' : '24/7 Operational Dispatch'}
              </div>
              <div className="text-[11px] text-neutral-400">
                {isRtl ? 'فريق عمليات جاهز على مدار الساعة' : 'Dedicated support across all Saudi hubs'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-700 relative animate-in zoom-in-95 duration-200 text-white">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedFeedback ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isRtl ? 'شكراً لتقييمك الكريم!' : 'Thank you for your review!'}
                </h3>
                <p className="text-xs text-neutral-400">
                  {isRtl ? 'تم إضافة رأيك بنجاح إلى شريط التقييمات التفاعلي.' : 'Your review has been added to the interactive reel.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {isRtl ? 'شاركنا تجربتك مع هيكل الريادة' : 'Rate HRC Logistics'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? 'رأيك يهمنا ويساعدنا على تقديم أعلى معايير الجودة اللوجستية.' : 'Share your feedback with our operational team.'}
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    {isRtl ? 'التقييم العام:' : 'Rating:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    {isRtl ? 'الاسم أو اسم المنشأة:' : 'Your Name / Enterprise:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder={isRtl ? 'مثال: م. فهد الحربي — شركة التوزيع السريع' : 'e.g. Abdullah Logistics Ltd.'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800/80 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    {isRtl ? 'تفاصيل التقييم:' : 'Your Feedback:'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={isRtl ? 'اكتب ملاحظاتك حول سرعة الشحن، التعامل، التخليص، والالتزام بالمواعيد...' : 'Describe your experience with our logistics, freight, and warehousing...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800/80 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    {isRtl ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0c121e] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    {isRtl ? 'نشر التقييم' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
