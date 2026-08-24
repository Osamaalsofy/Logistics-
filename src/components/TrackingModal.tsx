import React, { useState } from 'react';
import { Language, ShipmentRecord } from '../types';
import { SAMPLE_TRACKING_DATA, COMPANY_INFO } from '../data/logisticsData';
import { 
  Search, 
  X, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  PackageCheck,
  Shield,
  Phone
} from 'lucide-react';

interface TrackingModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  lang,
  isOpen,
  onClose,
  initialCode = 'HRC-8492-SA',
}) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [trackingNumber, setTrackingNumber] = useState(initialCode);
  const [searchedShipment, setSearchedShipment] = useState<ShipmentRecord | null>(
    SAMPLE_TRACKING_DATA[initialCode] || SAMPLE_TRACKING_DATA['HRC-8492-SA']
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingNumber.trim().toUpperCase();
    if (!clean) return;

    if (SAMPLE_TRACKING_DATA[clean]) {
      setSearchedShipment(SAMPLE_TRACKING_DATA[clean]);
      setErrorMsg('');
    } else {
      // Dynamic fallback mock tracker for any code entered
      setSearchedShipment({
        trackingNumber: clean,
        originEn: 'Jeddah Islamic Port',
        originAr: 'ميناء جدة الإسلامي',
        destinationEn: 'Saudi Distribution Network',
        destinationAr: 'شبكة التوزيع بالمملكة',
        statusEn: 'Active in Transit - Telemetry Synchronized',
        statusAr: 'شحنة نشطة في مسار النقل - قيد التحديث الفوري',
        statusType: 'in_transit',
        eta: 'Within 24 Hours',
        carrier: 'HRC Dedicated Logistics Fleet',
        serviceTypeEn: 'Commercial Freight & Secure Storage',
        serviceTypeAr: 'شحن تجاري وتخزين آمن',
        weight: '4,250 kg',
        pieces: 8,
        steps: [
          {
            titleEn: 'Received at HRC Jeddah Al Mahjar Facility',
            titleAr: 'تم استلام الشحنة بمركز هيكل الريادة بجدة (المحجر)',
            locationEn: 'Al Mahjar Terminal, Jeddah',
            locationAr: 'محطة المحجر، جدة',
            timestamp: '08:00 AM',
            completed: true,
            noteEn: 'Manifest inspected & logged',
            noteAr: 'تم تدقيق البوليصة وتسجيلها بنظام WMS'
          },
          {
            titleEn: 'Dispatched via Highway Fleet',
            titleAr: 'تم التوجيه عبر أسطول النقل السريع',
            locationEn: 'Western Logistics Corridor',
            locationAr: 'ممر الغربية اللوجستي',
            timestamp: '10:30 AM',
            completed: true,
            current: true,
            noteEn: 'GPS active and running on schedule',
            noteAr: 'التتبع المباشر نشط وفق الجدول الزمني'
          },
          {
            titleEn: 'Scheduled Final Delivery to Consignee',
            titleAr: 'التسليم النهائي المجدول للعميل',
            locationEn: 'Destination Facility',
            locationAr: 'الموقع النهائي للعميل',
            timestamp: 'Tomorrow, 11:00 AM',
            completed: false,
          }
        ]
      });
      setErrorMsg('');
    }
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

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isRtl ? 'بوابة التتبع الحي والتحقق اللوجستي' : 'LIVE CARGO TELEMETRY PORTAL'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1b1b]">
            {isRtl ? 'تتبع مسار الشحنة' : 'Track Your Shipment'}
          </h3>
          <p className="text-xs text-neutral-500">
            {isRtl ? 'أدخل رقم بوليصة الشحن أو المعرف الخاص بك للاطلاع على التحديثات الفورية.' : 'Enter your HRC tracking number or Bill of Lading (B/L) to inspect status.'}
          </p>
        </div>

        {/* Search Bar & Sample Presets */}
        <form onSubmit={handleSearch} className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={isRtl ? 'رقم الشحنة (مثال: HRC-8492-SA)' : 'Tracking # (e.g. HRC-8492-SA)'}
                className="w-full pl-4 pr-10 py-3 rounded-2xl border border-neutral-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-neutral-50"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute top-3.5 right-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1c1b1b] hover:bg-neutral-800 text-white rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isRtl ? 'بحث ومتابعة' : 'Track Cargo'}
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 text-[11px]">{isRtl ? 'شحنات نموذجية:' : 'Quick demo codes:'}</span>
            <button
              type="button"
              onClick={() => {
                setTrackingNumber('HRC-8492-SA');
                setSearchedShipment(SAMPLE_TRACKING_DATA['HRC-8492-SA']);
              }}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-mono text-[11px] cursor-pointer"
            >
              HRC-8492-SA (جدة - الرياض)
            </button>
            <button
              type="button"
              onClick={() => {
                setTrackingNumber('HRC-7721-JED');
                setSearchedShipment(SAMPLE_TRACKING_DATA['HRC-7721-JED']);
              }}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-mono text-[11px] cursor-pointer"
            >
              HRC-7721-JED (الدمام - مستودع المحجر)
            </button>
          </div>
        </form>

        {/* Shipment Details Result Card */}
        {searchedShipment && (
          <div className="bg-neutral-50 rounded-3xl p-5 sm:p-6 border border-neutral-200 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">{isRtl ? 'رقم الشحنة' : 'Tracking Number'}</span>
                <span className="text-lg font-black font-mono text-neutral-900">{searchedShipment.trackingNumber}</span>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[11px] font-mono text-neutral-400 block">{isRtl ? 'الناقل والأسطول' : 'Assigned Fleet'}</span>
                <span className="text-xs font-semibold text-neutral-800">{searchedShipment.carrier}</span>
              </div>
            </div>

            {/* Origin & Destination Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-neutral-200/80">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-500" />
                  {isRtl ? 'نقطة الانطلاق والاستلام' : 'Origin & Hub'}
                </span>
                <p className="text-sm font-bold text-neutral-900">
                  {isRtl ? searchedShipment.originAr : searchedShipment.originEn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  {isRtl ? 'الوجهة النهائية' : 'Destination'}
                </span>
                <p className="text-sm font-bold text-neutral-900">
                  {isRtl ? searchedShipment.destinationAr : searchedShipment.destinationEn}
                </p>
              </div>
            </div>

            {/* Status & ETA */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isRtl ? 'الحالة الحالية' : 'Status'}</span>
                <span className="text-xs font-bold text-emerald-700">{isRtl ? searchedShipment.statusAr : searchedShipment.statusEn}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isRtl ? 'موعد الوصول' : 'Est. Delivery'}</span>
                <span className="text-xs font-bold text-neutral-900">{searchedShipment.eta}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isRtl ? 'الوزن الإجمالي' : 'Gross Weight'}</span>
                <span className="text-xs font-bold text-neutral-900">{searchedShipment.weight}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isRtl ? 'نوع الحمولة' : 'Cargo Service'}</span>
                <span className="text-xs font-bold text-neutral-900">{isRtl ? searchedShipment.serviceTypeAr : searchedShipment.serviceTypeEn}</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                {isRtl ? 'سجل المحطات ونقاط التفتيش' : 'Milestones & Route Checkpoints'}
              </h4>
              <div className="space-y-4 relative pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-neutral-200">
                {searchedShipment.steps.map((step, idx) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[21px] rtl:-left-auto rtl:-right-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        step.current
                          ? 'bg-emerald-500 ring-4 ring-emerald-100'
                          : step.completed
                          ? 'bg-neutral-900'
                          : 'bg-neutral-300'
                      }`}
                    ></div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className={`text-xs font-bold ${step.current ? 'text-emerald-700' : 'text-neutral-900'}`}>
                        {isRtl ? step.titleAr : step.titleEn}
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-400 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                        {step.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-500">
                      {isRtl ? step.locationAr : step.locationEn}
                    </p>

                    {step.noteAr && (
                      <p className="text-[11px] text-neutral-600 bg-white p-2 rounded-lg border border-neutral-200/80">
                        ● {isRtl ? step.noteAr : step.noteEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Support Bar */}
            <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-neutral-500">
                {isRtl ? 'لأي استفسار طارئ حول الشحنة، تواصل مع فريق العمليات:' : 'For shipment support, contact dispatch directly:'}
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneDigits}`}
                className="font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span dir="ltr">{COMPANY_INFO.phone}</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
