import React, { useState } from 'react';
import { Language } from '../types';
import { COMPANY_INFO, SOLUTIONS_DATA } from '../data/logisticsData';
import { 
  Calculator, 
  X, 
  CheckCircle2, 
  Send, 
  Phone, 
  Package, 
  Warehouse, 
  Truck, 
  Anchor, 
  FileCheck,
  Calendar,
  Building,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface QuoteModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  lang,
  isOpen,
  onClose,
  preselectedService,
}) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [serviceType, setServiceType] = useState(
    preselectedService || (isRtl ? 'الشحن الدولي والبحري والجوي' : 'International Shipping')
  );
  const [origin, setOrigin] = useState(isRtl ? 'ميناء جدة الإسلامي' : 'Jeddah Islamic Port');
  const [destination, setDestination] = useState(isRtl ? 'الرياض' : 'Riyadh');
  const [cargoType, setCargoType] = useState('dry_container');
  const [weightKg, setWeightKg] = useState('5000');
  const [palletCount, setPalletCount] = useState('10');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = isRtl
      ? `السلام عليكم ورحمة الله، أود طلب تسعيرة لخدمات هيكل الريادة اللوجستية:\n- الخدمة: ${serviceType}\n- من: ${origin} إلى: ${destination}\n- تفاصيل الشحنة: ${weightKg} كجم (${palletCount} طبلية)\n- الاسم: ${clientName} - الشركة: ${clientCompany}\n- الهاتف: ${clientPhone}`
      : `Hello HRC Logistics, I would like to request a quote:\n- Service: ${serviceType}\n- From: ${origin} To: ${destination}\n- Cargo: ${weightKg} kg (${palletCount} pallets)\n- Name: ${clientName} - Company: ${clientCompany}\n- Phone: ${clientPhone}`;

    const url = `https://wa.me/${COMPANY_INFO.phoneDigits}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-900">
              {isRtl ? 'تم استلام طلب التسعيرة بنجاح!' : 'Quote Request Received!'}
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              {isRtl
                ? `شكراً لتواصلك مع هيكل الريادة للخدمات اللوجستية. سيقوم مسؤول العمليات والتسعير بالاتصال بك على الرقم ${clientPhone} خلال أقل من ساعة لتقديم أفضل عرض سعر.`
                : `Thank you for contacting HRC Logistics. Our operations team will reach out to ${clientPhone} within 1 business hour with competitive pricing.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isRtl ? 'متابعة عبر الواتساب فوراً' : 'Chat on WhatsApp Now'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
              >
                {isRtl ? 'إغلاق النافذة' : 'Close Window'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-500 font-bold">
                <Calculator className="w-3.5 h-3.5 text-neutral-800" />
                <span>{isRtl ? 'حاسبة وطلب تسعيرة لوجستية' : 'INSTANT LOGISTICS ESTIMATOR'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1b1b] mt-1">
                {isRtl ? 'طلب تسعيرة شحن وتخزين' : 'Request a Freight & Storage Quote'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {isRtl
                  ? 'اختر نوع الخدمة والمواقع لتحصل على عرض أسعار مخصص وتنافسي من فريق هيكل الريادة.'
                  : 'Specify your cargo specifications for a fast, competitive quotation from HRC specialists.'}
              </p>
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-2">
                {isRtl ? 'نوع الخدمة المطلوبة:' : 'Requested Service:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SOLUTIONS_DATA.map((s) => {
                  const title = isRtl ? s.titleAr : s.titleEn;
                  const isSelected = serviceType === title;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setServiceType(title)}
                      className={`p-3 rounded-xl text-left rtl:text-right text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#1c1b1b] text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  {isRtl ? 'مكان الاستلام / المنشأ:' : 'Origin / Port / City:'}
                </label>
                <input
                  type="text"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder={isRtl ? 'مثال: ميناء جدة الإسلامي أو حي المحجر' : 'e.g. Jeddah Port / Al Mahjar'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  {isRtl ? 'مكان التسليم / الوجهة:' : 'Destination City / Zone:'}
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={isRtl ? 'مثال: الرياض، الدمام، أو مستودعات العميل' : 'e.g. Riyadh, Dammam, client site'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Cargo Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <div>
                <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                  {isRtl ? 'الوزن التقريبي (كجم):' : 'Estimated Weight (kg):'}
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                  {isRtl ? 'عدد الطبليات / الحاويات:' : 'Pallets / Containers:'}
                </label>
                <input
                  type="number"
                  value={palletCount}
                  onChange={(e) => setPalletCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white font-mono"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                  {isRtl ? 'طبيعة البضاعة:' : 'Storage Type:'}
                </label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white"
                >
                  <option value="dry_container">{isRtl ? 'بضائع عامة / جافة' : 'Dry General Cargo'}</option>
                  <option value="cold_storage">{isRtl ? 'مبردة / مجمدة' : 'Cold-Chain / Reefer'}</option>
                  <option value="pallet_storage">{isRtl ? 'تخزين طبليات شهري' : 'Monthly Pallet Storage'}</option>
                  <option value="customs_clearance">{isRtl ? 'تخليص جمركي فقط' : 'Customs Clearance Only'}</option>
                </select>
              </div>
            </div>

            {/* Client Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  {isRtl ? 'الاسم الكريم:' : 'Your Name:'} *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isRtl ? 'الاسم الثلاثي' : 'Full Name'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  {isRtl ? 'اسم المنشأة / الشركة:' : 'Company / Entity:'}
                </label>
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder={isRtl ? 'اسم الشركة' : 'Company Name'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  {isRtl ? 'رقم الجوال للتواصل:' : 'Phone Number:'} *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100">
              <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isRtl ? `أو اتصل بنا مباشرة: ${COMPANY_INFO.phone}` : `Or call directly: ${COMPANY_INFO.phone}`}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-7 py-2.5 rounded-full bg-[#1c1b1b] hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{isRtl ? 'إرسال طلب التسعيرة' : 'Submit Request'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
