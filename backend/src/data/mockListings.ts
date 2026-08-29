export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  propertyType: string;
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

export const mockListings: Listing[] = [
  {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens. Perfect for families or group getaways.',
    category: 'Villas',
    propertyType: 'Villa',
    location: 'Arambol, Goa',
    country: 'India',
    pricePerNight: 6500,
    rating: 4.89,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Rahul',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isSuperhost: true,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washing machine']
  },
  {
    id: 'stay-002',
    title: 'Alpine Cedar Chalet',
    description: 'Rustic wooden timber chalet nestled in the serene pine forests of Manali. Features cozy stone fireplace, outdoor heated jacuzzi, and unobstructed views of snow-capped Himalayan peaks.',
    category: 'Cabins',
    propertyType: 'Cabin',
    location: 'Manali, Himachal Pradesh',
    country: 'India',
    pricePerNight: 8200,
    rating: 4.95,
    reviewCount: 86,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Priya',
    isSuperhost: true,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    amenities: ['Wi-Fi', 'Fireplace', 'Parking', 'Kitchen', 'Hot tub', 'Mountain View']
  },
  {
    id: 'stay-003',
    title: 'Heritage Lakefront Palace',
    description: 'Experience royal Rajasthani hospitality in a restored heritage estate overlooking Lake Pichola. Features intricate marble architecture, courtyard gardens, and authentic dining experiences.',
    category: 'Luxury',
    propertyType: 'House',
    location: 'Udaipur, Rajasthan',
    country: 'India',
    pricePerNight: 14500,
    rating: 4.98,
    reviewCount: 150,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Vikram',
    isSuperhost: true,
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    amenities: ['Wi-Fi', 'Swimming pool', 'Air conditioning', 'Kitchen', 'Breakfast included', 'Lake View']
  },
  {
    id: 'stay-004',
    title: 'Serene Backwater Palm Villa',
    description: 'Tranquil waterfront retreat in the heart of Kerala backwaters. Private boat jetty, outdoor infinity deck, fresh coconut groves, and traditional Ayurvedic wellness corner.',
    category: 'Beach',
    propertyType: 'Villa',
    location: 'Alleppey, Kerala',
    country: 'India',
    pricePerNight: 5400,
    rating: 4.91,
    reviewCount: 72,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Anand',
    isSuperhost: false,
    maxGuests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    amenities: ['Wi-Fi', 'Waterfront', 'Air conditioning', 'Kitchen', 'Free Breakfast']
  },
  {
    id: 'stay-005',
    title: 'Redwood Glasshouse Canopy',
    description: 'Suspended glass cabin high above the coffee plantations of Coorg. Stargazing glass skylights, private bonfire deck, and organic plantation tours.',
    category: 'Countryside',
    propertyType: 'Cabin',
    location: 'Coorg, Karnataka',
    country: 'India',
    pricePerNight: 7800,
    rating: 4.94,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Sneha',
    isSuperhost: true,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: ['Wi-Fi', 'Balcony', 'Parking', 'Fire pit', 'Coffee maker']
  }
];
