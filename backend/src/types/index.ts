export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  propertyType?: string;
  location: string;
  country?: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hostName: string;
  hostAvatar?: string;
  isSuperhost: boolean;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Guest' | 'Host' | 'Admin';
  avatar?: string;
}
