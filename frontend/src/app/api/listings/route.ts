import { NextResponse } from 'next/server';

const mockProperties = [
  {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens.',
    category: 'Villas',
    propertyType: 'Villa',
    location: 'Arambol, Goa',
    country: 'India',
    pricePerNight: 6500,
    rating: 4.89,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'Rahul',
    isSuperhost: true,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning']
  },
  {
    id: 'stay-002',
    title: 'Alpine Cedar Chalet',
    description: 'Rustic wooden timber chalet nestled in the serene pine forests of Manali.',
    category: 'Cabins',
    propertyType: 'Cabin',
    location: 'Manali, Himachal Pradesh',
    country: 'India',
    pricePerNight: 8200,
    rating: 4.95,
    reviewCount: 86,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Priya',
    isSuperhost: true,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    amenities: ['Wi-Fi', 'Fireplace', 'Parking', 'Kitchen', 'Hot tub']
  },
  {
    id: 'stay-003',
    title: 'Heritage Lakefront Palace',
    description: 'Experience royal Rajasthani hospitality in a restored heritage estate overlooking Lake Pichola.',
    category: 'Luxury',
    propertyType: 'House',
    location: 'Udaipur, Rajasthan',
    country: 'India',
    pricePerNight: 14500,
    rating: 4.98,
    reviewCount: 150,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    hostName: 'Vikram',
    isSuperhost: true,
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    amenities: ['Wi-Fi', 'Swimming pool', 'Air conditioning', 'Kitchen', 'Free Breakfast']
  },
  {
    id: 'stay-004',
    title: 'Serene Backwater Palm Villa',
    description: 'Tranquil waterfront retreat in the heart of Kerala backwaters.',
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
    amenities: ['Wi-Fi', 'Waterfront', 'Air conditioning', 'Kitchen']
  },
  {
    id: 'stay-005',
    title: 'Redwood Glasshouse Canopy',
    description: 'Suspended glass cabin high above the coffee plantations of Coorg.',
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
    amenities: ['Wi-Fi', 'Balcony', 'Parking', 'Fire pit']
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const category = searchParams.get('category');

  let results = [...mockProperties];

  if (category && category.toLowerCase() !== 'all') {
    results = results.filter(p =>
      p.category.toLowerCase() === category.toLowerCase() ||
      p.propertyType.toLowerCase() === category.toLowerCase()
    );
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results
  });
}
