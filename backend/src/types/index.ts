export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hostName: string;
  hostAvatar?: string;
  isSuperhost?: boolean;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
}
