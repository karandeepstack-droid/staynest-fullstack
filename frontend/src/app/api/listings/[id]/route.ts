import { NextResponse } from 'next/server';

const mockProperties: Record<string, any> = {
  'stay-001': {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens. Designed with airy open spaces, teakwood accents, and high-speed fibre internet for remote work or relaxed beach getaways.',
    category: 'Villas',
    propertyType: 'Villa',
    location: 'Arambol, Goa',
    country: 'India',
    pricePerNight: 6500,
    cleaningFee: 1500,
    serviceFee: 2100,
    rating: 4.89,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'Rahul',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isSuperhost: true,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washing machine']
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
  const property = mockProperties[propertyId] || mockProperties['stay-001'];

  return NextResponse.json({
    success: true,
    data: { ...property, id: propertyId }
  });
}
