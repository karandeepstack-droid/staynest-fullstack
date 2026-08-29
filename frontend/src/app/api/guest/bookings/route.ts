import { NextResponse } from 'next/server';

export async function GET() {
  const guestBookings = [
    {
      id: 'SN-839241',
      propertyId: 'stay-001',
      propertyTitle: 'Ocean Breeze Villa',
      location: 'Arambol, Goa, India',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      checkIn: '2026-09-10',
      checkOut: '2026-09-14',
      nights: 4,
      guests: 2,
      pricePerNight: 6500,
      totalPrice: 29600,
      status: 'Confirmed',
      createdAt: '2026-08-28T10:00:00.000Z'
    }
  ];

  return NextResponse.json({
    success: true,
    count: guestBookings.length,
    data: guestBookings
  });
}
