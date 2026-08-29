import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      totalUsers: 24,
      totalHosts: 6,
      totalGuests: 18,
      totalListings: 12,
      totalBookings: 45,
      totalRevenue: 328400
    }
  });
}
