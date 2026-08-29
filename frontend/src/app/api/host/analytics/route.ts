import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      stats: {
        propertiesCount: 4,
        reservationsCount: 18,
        guestsCount: 31,
        totalEarnings: 142500
      },
      monthlyEarnings: [
        { month: 'Jan', earnings: 42000 },
        { month: 'Feb', earnings: 51000 },
        { month: 'Mar', earnings: 68000 },
        { month: 'Apr', earnings: 74000 }
      ],
      reservations: [
        {
          id: 'res-01',
          guestName: 'Amit Sharma',
          propertyTitle: 'Ocean Breeze Villa',
          dates: 'Sep 10–14',
          totalPrice: 29600,
          status: 'Confirmed'
        },
        {
          id: 'res-02',
          guestName: 'Priya Verma',
          propertyTitle: 'Alpine Cedar Chalet',
          dates: 'Sep 18–21',
          totalPrice: 24600,
          status: 'Pending'
        }
      ]
    }
  });
}
