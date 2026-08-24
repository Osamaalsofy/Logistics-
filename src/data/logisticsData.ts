import { SolutionItem, TechFeature, LogisticsHub, ReviewItem, ShipmentRecord } from '../types';

export const COMPANY_INFO = {
  nameAr: 'هيكل الريادة للخدمات اللوجستية',
  nameEn: 'HRC Logistics (Haikaal Al Reyadah)',
  shortName: 'HRC',
  taglineAr: 'شريكك الاستراتيجي في النقل، التخزين، وسلاسل الإمداد بالمملكة',
  taglineEn: 'Your Strategic Partner in Freight, Storage & Supply Chain across Saudi Arabia',
  addressAr: 'حي المحجر، جدة 26411، المملكة العربية السعودية',
  addressEn: 'Al Mahjar, Jeddah 26411, Kingdom of Saudi Arabia',
  plusCode: 'C5RW+GW Al Mahjar, Jeddah',
  googleMapsUrl: 'https://maps.google.com/?q=C5RW%2BGW+Al+Mahjar,+Jeddah',
  phone: '055 947 6949',
  phoneInternational: '+966 55 947 6949',
  phoneDigits: '966559476949',
  email: 'info@hrc-logistics.sa',
  hoursAr: 'مفتوح · يغلق عند الساعة 9:30 م',
  hoursEn: 'Open · Closes 9:30 PM',
  rating: 4.3,
  reviewCount: 8,
  crNumber: '4030489211',
  vatNumber: '310492817400003',
};

// High quality, fast-loading Unsplash CDN images matching the exact aesthetic of the uploaded references
export const ASSETS = {
  // Aerial Container Ship Hero Background matching user upload (wmremove-transformed.png)
  heroShip: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=90',
  heroShipAerial: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=90',
  heroShipDirect: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=90',
  // Technology container visual matching screenshot 3
  techContainer: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  // Logistics Solutions cards matching screenshot 4
  solutionInternational: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
  solutionWarehousing: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=900&q=80',
  solutionLastMile: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
  solutionSupplyChain: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
  solutionCustoms: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  // Tactical warehouse facility matching screenshot 5
  tacticalFacility: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80',
};

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'international-shipping',
    titleEn: 'International Shipping',
    titleAr: 'الشحن الدولي والبحري والجوي',
    descriptionEn: 'We manage global shipping from origin to destination, providing both air and sea freight options to suit your timeline and budget.',
    descriptionAr: 'ندير الشحن العالمي من بلد المنشأ إلى الوجهة النهائية، مع توفير خيارات الشحن الجوي والبحري بما يناسب جدولك وميزانيتك.',
    image: ASSETS.solutionInternational,
    badgeEn: 'Ocean & Air Freight',
    badgeAr: 'شحن بحري وجوي متكامل',
    featuresEn: ['Full Container Load (FCL)', 'Less than Container Load (LCL)', 'Port-to-Port & Door-to-Door', 'Cold-chain Reefers'],
    featuresAr: ['حاويات كاملة FCL', 'شحن جزئي LCL', 'من الميناء للباب', 'حاويات مبردة ومجمدة']
  },
  {
    id: 'warehousing-distribution',
    titleEn: 'Warehousing & Distribution',
    titleAr: 'التخزين المركزي والتوزيع',
    descriptionEn: 'Our strategically located warehouses ensure fast, secure storage and distribution of your products with flexible storage options.',
    descriptionAr: 'تضمن مستودعاتنا ذات المواقع الاستراتيجية تخزيناً آمناً وسريعاً لمنتجاتك مع خيارات تخزين مرنة وتحكم بيئي متقدم.',
    image: ASSETS.solutionWarehousing,
    badgeEn: 'Storage & Fulfillment',
    badgeAr: 'تخزين وإدارة مخزون',
    featuresEn: ['Climate-Controlled Storage', 'Cross-Docking Facilities', 'Real-time WMS Integration', 'Pallet & Bulk Storage'],
    featuresAr: ['مستودعات مكيّفة ومعزولة', 'خدمات تفريغ ومناقلة سريعة', 'نظام إدارة المستودعات WMS', 'تخزين طبليات ومساحات مفتوحة']
  },
  {
    id: 'last-mile-delivery',
    titleEn: 'Last-Mile Delivery',
    titleAr: 'توصيل الميل الأخير والأسطول',
    descriptionEn: 'Our reliable last-mile delivery service ensures that your products reach the final destination efficiently, providing tracking and real-time dispatch.',
    descriptionAr: 'خدمة التوصيل للميل الأخير بأسطول مركبات متكامل وسائقين مدربين لضمان وصول الشحنات بدقة متناهية وسرعة فائقة.',
    image: ASSETS.solutionLastMile,
    badgeEn: 'Fleet & Dispatch',
    badgeAr: 'أسطول توزيع سريع',
    featuresEn: ['Dedicated Fleet Delivery', 'Same-Day City Dispatch', 'Electronic Proof of Delivery (e-POD)', 'Live GPS Driver Routing'],
    featuresAr: ['أسطول سيارات حديثة ومجهزة', 'توزيع في نفس اليوم بالمدن الرئيسية', 'إثبات استلام إلكتروني فوري', 'تتبع حي لمسار المركبات']
  },
  {
    id: 'supply-chain-optimization',
    titleEn: 'Supply Chain Optimization',
    titleAr: 'تحسين وهندسة سلاسل الإمداد',
    descriptionEn: 'Our expert team analyzes and improves your supply chain, reducing costs, minimizing transit bottlenecks, and maximizing operational flow.',
    descriptionAr: 'يقوم فريق الخبراء لدينا بتحليل وتطوير سلسلة إمدادك لتقليل التكاليف التشغيلية واختصار زمن الشحن وزيادة الإنتاجية.',
    image: ASSETS.solutionSupplyChain,
    badgeEn: 'Consulting & Logistics Flow',
    badgeAr: 'كفاءة تدفق العمليات',
    featuresEn: ['Network Route Planning', 'Inventory Lead-time Reduction', 'Cost-to-Serve Analysis', 'Dynamic Capacity Planning'],
    featuresAr: ['تخطيط المسارات اللوجستية', 'تقليل زمن دورة المخزون', 'تحليل تكاليف النقل الإجمالية', 'تخطيط مرن للطاقة الاستيعابية']
  },
  {
    id: 'customs-clearance',
    titleEn: 'Customs Clearance',
    titleAr: 'التخليص الجمركي المعتمد',
    descriptionEn: 'We navigate the complexities of customs regulations in Saudi ports and borders, ensuring your shipments clear swiftly without delays.',
    descriptionAr: 'نتولى كافة إجراءات التخليص الجمركي في الموانئ والمطارات والمنافذ البرية بكفاءة عالية عبر منصة فسح وبنظامية تامة.',
    image: ASSETS.solutionCustoms,
    badgeEn: 'ZATCA & FASAH Certified',
    badgeAr: 'اعتماد منصة فسح والجمارك',
    featuresEn: ['FASAH Platform Direct Filing', 'Tariff & HS Code Classification', 'SABER & SFDA Compliance', 'Duty & Inspection Support'],
    featuresAr: ['ربط مباشر مع منصة فسح', 'تصنيف بنود التعريفة الجمركية', 'مطابقة سابر وهيئة الغذاء والدواء', 'متابعة الفحص والمعاينة والتخليص']
  }
];

export const TECH_FEATURES_DATA: TechFeature[] = [
  {
    id: 'real-time-tracking',
    titleEn: 'Real-Time Tracking',
    titleAr: 'التتبع المباشر لحظة بلحظة',
    descriptionEn: 'Stay up-to-date with your shipments from pick-up to delivery with live GPS telemetry and milestone alerts.',
    descriptionAr: 'ابقَ على اطلاع دائم بمسار شحناتك وحركتها من لحظة الاستلام وحتى التسليم النهائي بتحديثات فورية.',
    iconName: 'Radar',
    detailsEn: 'Our telematics platform gives full visibility into cargo temperature, speed, location, and estimated arrival windows.',
    detailsAr: 'منظومة تتبع ذكية توفر رؤية شاملة لموقع الشحنة ودرجة الحرارة وسرعة النقل والوقت الدقيق المتوقع للوصول.'
  },
  {
    id: 'data-analytics',
    titleEn: 'Data Analytics',
    titleAr: 'تحليلات البيانات المتقدمة',
    descriptionEn: 'Gain insights into your supply chain, identify bottlenecks, and make data-driven logistics decisions.',
    descriptionAr: 'احصل على تقارير تفصيلية ورؤى استشرافية حول تدفق الشحنات وتحسين التكاليف التشغيلية.',
    iconName: 'BarChart3',
    detailsEn: 'Comprehensive executive dashboards show freight spend, carrier on-time rates, and predictive inventory trends.',
    detailsAr: 'لوحات تحكم ذكية تعرض مؤشرات الأداء ومعدلات الالتزام بالمواعيد وتحليلات دقيقة لتكاليف الشحن.'
  },
  {
    id: 'automated-updates',
    titleEn: 'Automated Updates',
    titleAr: 'إشعارات وتنبيهات آلية',
    descriptionEn: 'Receive timely notifications about your shipments, including expected delivery times, gate passes, and alerts.',
    descriptionAr: 'استلم إشعارات وتنبيهات لحظية عبر الرسائل والبريد عند كل محطة استلام، تفريغ، أو تخليص جمركي.',
    iconName: 'BellRing',
    detailsEn: 'Automated triggers notify your warehouse receivers and customers via SMS, WhatsApp, or webhook API.',
    detailsAr: 'تنبيهات تلقائية لفريقك ومستلمي الشحنات عبر الرسائل والواتساب وبوابات الربط المباشر API.'
  },
  {
    id: 'secure-portal',
    titleEn: 'Secure Portal',
    titleAr: 'بوابة العملاء الآمنة',
    descriptionEn: 'Access your account anytime with our secure online portal for booking, managing, and tracking shipments.',
    descriptionAr: 'بوابة رقمية مخصصة ومحمية لحجز الشحنات، إدارة الفواتير، تحميل بوالص الشحن، وإصدار أوامر العمل.',
    iconName: 'ShieldCheck',
    detailsEn: 'Role-based access, automated invoice retrieval, and direct document generation in compliance with Saudi e-invoicing.',
    detailsAr: 'صلاحيات متعددة للمستخدمين، وتنزيل فوري للفواتير الضريبية الإلكترونية وشهادات الفسح المعتمدة.'
  }
];

export const SAUDI_HUBS_DATA: LogisticsHub[] = [
  {
    id: 'jeddah-hq-mahjar',
    nameEn: 'HRC Central HQ & Western Warehouses',
    nameAr: 'المقر الرئيسي والمستودعات المركزية (المحجر)',
    type: 'hq',
    isMainHq: true,
    regionEn: 'Western Province (Makkah Region)',
    regionAr: 'المنطقة الغربية (منطقة مكة المكرمة)',
    cityEn: 'Jeddah',
    cityAr: 'جدة',
    coordinates: { x: 26, y: 58 }, // Map visual coordinate
    geoLat: 21.4858,
    geoLng: 39.1925,
    addressEn: 'Al Mahjar, Jeddah 26411, Saudi Arabia',
    addressAr: 'حي المحجر، جدة 26411، المملكة العربية السعودية',
    plusCode: 'C5RW+GW Al Mahjar, Jeddah',
    capacitySqM: '18,500 م²',
    capacityPallets: '14,200 طبلية',
    fleetUnits: 45,
    status: 'operational',
    temperatureControl: true,
    phone: '055 947 6949',
    workingHoursEn: 'Open · Closes 9:30 PM',
    workingHoursAr: 'مفتوح · يغلق عند الساعة 9:30 م',
  },
  {
    id: 'riyadh-distribution-hub',
    nameEn: 'Riyadh Central Distribution Center',
    nameAr: 'مركز التوزيع اللوجستي الأوسط (الرياض)',
    type: 'distribution',
    regionEn: 'Central Province',
    regionAr: 'المنطقة الوسطى (مدينة الرياض)',
    cityEn: 'Riyadh',
    cityAr: 'الرياض',
    coordinates: { x: 58, y: 44 },
    geoLat: 24.7136,
    geoLng: 46.6753,
    addressEn: 'Al Mishael Industrial District, Riyadh',
    addressAr: 'المنطقة اللوجستية والصناعية - المشاعل، الرياض',
    capacitySqM: '24,000 م²',
    capacityPallets: '22,000 طبلية',
    fleetUnits: 60,
    status: 'operational',
    temperatureControl: true,
    phone: '055 947 6949',
    workingHoursEn: '24/7 Operations Hub',
    workingHoursAr: 'تشغيل على مدار 24/7',
  },
  {
    id: 'dammam-port-hub',
    nameEn: 'Dammam & King Abdulaziz Port Hub',
    nameAr: 'مركز الدمام وميناء الملك عبدالعزيز',
    type: 'port_transit',
    regionEn: 'Eastern Province',
    regionAr: 'المنطقة الشرقية (الدمام)',
    cityEn: 'Dammam',
    cityAr: 'الدمام',
    coordinates: { x: 74, y: 39 },
    geoLat: 26.4207,
    geoLng: 50.0888,
    addressEn: 'King Abdulaziz Sea Port Area, Dammam',
    addressAr: 'منطقة ميناء الملك عبدالعزيز البحري، الدمام',
    capacitySqM: '15,000 م²',
    capacityPallets: '11,500 طبلية',
    fleetUnits: 32,
    status: 'operational',
    temperatureControl: false,
    phone: '055 947 6949',
    workingHoursEn: '6:00 AM - 11:00 PM',
    workingHoursAr: '6:00 ص - 11:00 م',
  },
  {
    id: 'jubail-logistics-cluster',
    nameEn: 'Jubail Industrial Logistics Cluster',
    nameAr: 'مجمع الجبيل الصناعي للخدمات اللوجستية',
    type: 'cluster',
    regionEn: 'Eastern Province',
    regionAr: 'المنطقة الشرقية (الجبيل)',
    cityEn: 'Jubail',
    cityAr: 'الجبيل',
    coordinates: { x: 70, y: 31 },
    geoLat: 27.0046,
    geoLng: 49.6225,
    addressEn: 'Jubail Industrial City Logistics Park',
    addressAr: 'المدينة الصناعية - المجمع اللوجستي، الجبيل',
    capacitySqM: '12,000 م²',
    capacityPallets: '9,000 طبلية',
    fleetUnits: 20,
    status: 'operational',
    temperatureControl: true,
    phone: '055 947 6949',
    workingHoursEn: '7:00 AM - 9:00 PM',
    workingHoursAr: '7:00 ص - 9:00 م',
  },
  {
    id: 'medina-yanbu-transit',
    nameEn: 'Medina & Yanbu Port Transit Corridor',
    nameAr: 'ممر ينبع والمدينة المنورة اللوجستي',
    type: 'port_transit',
    regionEn: 'Western / Yanbu Port',
    regionAr: 'المنطقة الغربية (ينبع والمدينة المنورة)',
    cityEn: 'Medina / Yanbu',
    cityAr: 'المدينة / ينبع',
    coordinates: { x: 22, y: 38 },
    geoLat: 24.0889,
    geoLng: 38.0637,
    addressEn: 'King Fahad Industrial Port Link, Yanbu',
    addressAr: 'طريق ميناء الملك فهد الصناعي، ينبع',
    capacitySqM: '8,500 م²',
    capacityPallets: '6,200 طبلية',
    fleetUnits: 18,
    status: 'operational',
    temperatureControl: true,
    phone: '055 947 6949',
    workingHoursEn: '8:00 AM - 8:00 PM',
    workingHoursAr: '8:00 ص - 8:00 م',
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'review-1',
    authorEn: 'Khidr Al-Omari',
    authorAr: 'خضر العُمري',
    isLocalGuide: true,
    guideDetailsEn: 'Local Guide · 7 reviews · 10 photos',
    guideDetailsAr: 'مرشد محلي (Local Guide) · 7 تقييمات · 10 صور',
    rating: 5,
    dateEn: '2 months ago',
    dateAr: 'قبل شهرين',
    commentEn: 'Respectable company, respectable employees, fair prices, smaller agile vehicles, and they genuinely care about the customer. Thank you and may Allah grant you success.',
    commentAr: 'شركة محترمة وموظفون محترفون وأسعارهم مناسبة وسياراتهم مجهزة ويهتمون بالعميل، شكراً لكم ونسأل الله لكم دوام التوفيق.',
    ownerResponseEn: 'We sincerely thank you for your kind words. We look forward to always meeting your expectations, and we wish you continuous success.',
    ownerResponseAr: 'شاكرون لك كلماتك الطيبة، ونسعد دائماً بخدمتكم في هيكل الريادة ونسأل الله لكم التوفيق والنجاح.',
    ownerResponseDateEn: '2 months ago',
    ownerResponseDateAr: 'قبل شهرين'
  },
  {
    id: 'review-2',
    authorEn: 'Sami Sami',
    authorAr: 'سامي سامي (Sami Sami)',
    rating: 5,
    dateEn: '6 months ago',
    dateAr: 'قبل 6 أشهر',
    commentEn: 'Excellent interaction, polite and professional staff, and strict commitment to delivery schedules. Best of luck to you.',
    commentAr: 'تعامل ممتاز وموظفون محترمون والتزام احترافي بالمواعيد، بالتوفيق لكم ولسائر فريق العمل.',
    ownerResponseEn: 'Thank you for your beautiful words! Inshallah we will always remain at your best expectations. We wish you prosperity and success.',
    ownerResponseAr: 'شاكرون لك كلماتك الجميلة، وإن شاء الله نكون دائماً عند حسن ظنكم ونسأل الله لك التوفيق.',
    ownerResponseDateEn: '6 months ago',
    ownerResponseDateAr: 'قبل 6 أشهر'
  },
  {
    id: 'review-3',
    authorEn: 'Mohamed Hussein',
    authorAr: 'محمد حسين',
    rating: 5,
    dateEn: '6 months ago',
    dateAr: 'قبل 6 أشهر',
    commentEn: 'Staff customer service is excellent and tracking updates from the Al Mahjar hub were swift.',
    commentAr: 'تعامل الموظفين ممتاز ومتابعة دقيقة للشحنات في مستودعات المحجر بجدة حتى وصولها النهائي بأمان.',
    ownerResponseEn: 'We appreciate your lovely visit and review, and inshallah we will maintain this high standard of service.',
    ownerResponseAr: 'شاكرون لك ثقتك الغالية، ونسعد دائماً بتقديم أفضل الخدمات اللوجستية.',
    ownerResponseDateEn: '6 months ago',
    ownerResponseDateAr: 'قبل 6 أشهر'
  }
];

export const SAMPLE_TRACKING_DATA: Record<string, ShipmentRecord> = {
  'HRC-8492-SA': {
    trackingNumber: 'HRC-8492-SA',
    originEn: 'Jeddah Islamic Port (Al Mahjar Hub)',
    originAr: 'ميناء جدة الإسلامي (مركز المحجر)',
    destinationEn: 'Riyadh Central Logistics Zone',
    destinationAr: 'المنطقة اللوجستية المركزية بالرياض',
    statusEn: 'In Transit on Route 40 Highway',
    statusAr: 'في الطريق عبر طريق الرياض السريع',
    statusType: 'in_transit',
    eta: 'Today, 04:30 PM',
    carrier: 'HRC Express Dedicated Fleet (Unit #38)',
    serviceTypeEn: 'Dry Container FCL & Temperature Monitor',
    serviceTypeAr: 'حاوية متكاملة FCL مع مراقبة حرارية',
    weight: '18,420 kg',
    pieces: 24,
    steps: [
      {
        titleEn: 'Picked up from Jeddah Port Container Terminal',
        titleAr: 'تم الاستلام من محطة الحاويات بميناء جدة',
        locationEn: 'Al Mahjar Terminal, Jeddah',
        locationAr: 'محطة المحجر، جدة',
        timestamp: '07:15 AM',
        completed: true,
        noteEn: 'Customs release verified on FASAH',
        noteAr: 'تم اعتماد إذن الفسح الجمركي عبر منصة فسح'
      },
      {
        titleEn: 'Dispatched from HRC Western Logistics Hub',
        titleAr: 'مغادرة مركز هيكل الريادة اللوجستي الغربي',
        locationEn: 'Jeddah Hub',
        locationAr: 'مركز جدة الرئيسي',
        timestamp: '09:00 AM',
        completed: true,
        noteEn: 'Vehicle safety & GPS seal inspection complete',
        noteAr: 'اكتمال فحص السلامة وتفعيل القفل الإلكتروني GPS'
      },
      {
        titleEn: 'Transit checkpoint: Taif / Makkah Corridor',
        titleAr: 'نقطة العبور: ممر الطائف / مكة',
        locationEn: 'Highway 40 Checkpoint',
        locationAr: 'نقطة تفتيش طريق 40',
        timestamp: '11:45 AM',
        completed: true,
        current: true,
        noteEn: 'On schedule, speed and cooling normal',
        noteAr: 'وفق الجدول الزمني، مؤشرات التبريد والسرعة طبيعية'
      },
      {
        titleEn: 'Scheduled Arrival at Riyadh Distribution Warehouse',
        titleAr: 'الوصول المجدول لمستودع التوزيع بالرياض',
        locationEn: 'Al Mishael, Riyadh',
        locationAr: 'حي المشاعل، الرياض',
        timestamp: '04:30 PM',
        completed: false,
        noteEn: 'Dock #04 reserved for automated unloading',
        noteAr: 'تم تخصيص رصيف التفريغ الآلي رقم 04'
      }
    ]
  },
  'HRC-7721-JED': {
    trackingNumber: 'HRC-7721-JED',
    originEn: 'Dammam King Abdulaziz Port',
    originAr: 'ميناء الملك عبدالعزيز بالدمام',
    destinationEn: 'Jeddah Al Mahjar Storage',
    destinationAr: 'مستودعات جدة حي المحجر',
    statusEn: 'Customs Cleared & Warehoused',
    statusAr: 'مكتمل التخليص ومستقر في المستودع',
    statusType: 'delivered',
    eta: 'Completed',
    carrier: 'HRC Heavy Transport',
    serviceTypeEn: 'Bonded Storage & Palletizing',
    serviceTypeAr: 'تخزين جمركي وتوزيع طبليات',
    weight: '8,600 kg',
    pieces: 12,
    steps: [
      {
        titleEn: 'Shipment received at Dammam Port',
        titleAr: 'استلام الشحنة بميناء الدمام',
        locationEn: 'Dammam Port',
        locationAr: 'ميناء الدمام',
        timestamp: 'Yesterday, 08:30 AM',
        completed: true
      },
      {
        titleEn: 'Inter-regional transit completed',
        titleAr: 'اكتمال النقل بين المناطق',
        locationEn: 'Trans-Arabia Logistics Corridor',
        locationAr: 'الممر اللوجستي عبر المملكة',
        timestamp: 'Yesterday, 10:00 PM',
        completed: true
      },
      {
        titleEn: 'Safely Stored in Jeddah Al Mahjar Facility',
        titleAr: 'تم التخزين الآمن بمستودع المحجر بجدة',
        locationEn: 'Al Mahjar Hub (Bay 12)',
        locationAr: 'مركز المحجر بجدة (المقطع 12)',
        timestamp: 'Today, 06:15 AM',
        completed: true,
        current: true,
        noteEn: 'Goods verified and logged in WMS',
        noteAr: 'تم تدقيق البضائع وتوثيقها بنظام إدارة المخزون WMS'
      }
    ]
  }
};
