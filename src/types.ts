export type Language = 'ar' | 'en';

export interface SolutionItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  badgeEn: string;
  badgeAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

export interface TechFeature {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  detailsEn: string;
  detailsAr: string;
}

export interface LogisticsHub {
  id: string;
  nameEn: string;
  nameAr: string;
  type: 'hq' | 'distribution' | 'port_transit' | 'cluster';
  regionEn: string;
  regionAr: string;
  cityEn: string;
  cityAr: string;
  coordinates: { x: number; y: number }; // SVG map percentage coordinates
  geoLat: number;
  geoLng: number;
  addressEn: string;
  addressAr: string;
  plusCode?: string;
  capacitySqM: string;
  capacityPallets: string;
  fleetUnits: number;
  status: 'operational' | 'high_capacity' | 'expanded';
  temperatureControl: boolean;
  phone: string;
  workingHoursEn: string;
  workingHoursAr: string;
  isMainHq?: boolean;
}

export interface ReviewItem {
  id: string;
  authorEn: string;
  authorAr: string;
  roleEn?: string;
  roleAr?: string;
  isLocalGuide?: boolean;
  guideDetailsEn?: string;
  guideDetailsAr?: string;
  rating: number;
  dateEn: string;
  dateAr: string;
  commentEn: string;
  commentAr: string;
  ownerResponseEn?: string;
  ownerResponseAr?: string;
  ownerResponseDateEn?: string;
  ownerResponseDateAr?: string;
}

export interface TrackingStep {
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  noteEn?: string;
  noteAr?: string;
}

export interface ShipmentRecord {
  trackingNumber: string;
  originEn: string;
  originAr: string;
  destinationEn: string;
  destinationAr: string;
  statusEn: string;
  statusAr: string;
  statusType: 'in_transit' | 'customs' | 'delivered' | 'processing';
  eta: string;
  carrier: string;
  serviceTypeEn: string;
  serviceTypeAr: string;
  weight: string;
  pieces: number;
  steps: TrackingStep[];
}
