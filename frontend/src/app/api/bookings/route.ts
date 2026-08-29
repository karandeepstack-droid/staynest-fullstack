import { NextResponse } from 'next/server';

interface ExistingBooking {
  propertyId: string;
  checkIn: string;
  checkOut: string;
}

// In-memory reservations database for availability validation
const existingBookings: ExistingBooking[] = [
  {
    propertyId: 'stay-001',
    checkIn: '2026-09-10',
    checkOut: '2026-09-14'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, propertyTitle, checkIn, checkOut, guests, pricePerNight } = body;

    if (!propertyId || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, message: 'Property ID, check-in, and check-out dates are required' },
        { status: 400 }
      );
    }

    // 1. Date Availability Overlap Check Engine
    const newStart = new Date(checkIn).getTime();
    const newEnd = new Date(checkOut).getTime();

    const hasOverlap = existingBookings.some(b => {
      if (b.propertyId !== propertyId) return false;
      const bStart = new Date(b.checkIn).getTime();
      const bEnd = new Date(b.checkOut).getTime();
      return (newStart < bEnd && newEnd > bStart);
    });

    if (hasOverlap) {
      return NextResponse.json({
        success: false,
        message: '❌ These dates are unavailable. Please select different dates for your stay.'
      }, { status: 409 });
    }

    // 2. Dynamic Price Engine Calculation
    const nightMs = 1000 * 60 * 60 * 24;
    const nights = Math.max(1, Math.round((newEnd - newStart) / nightMs));
    const rate = pricePerNight || 6500;
    const stayTotal = rate * nights;
    const cleaningFee = 1500;
    const serviceFee = Math.round(stayTotal * 0.08);
    const totalPrice = stayTotal + cleaningFee + serviceFee;

    // Generate Booking ID (Format: SN-XXXXXX)
    const bookingId = `SN-${Math.floor(100000 + Math.random() * 900000)}`;

    // Store in reservations database
    existingBookings.push({ propertyId, checkIn, checkOut });

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed!',
      booking: {
        id: bookingId,
        propertyId,
        propertyTitle: propertyTitle || 'Ocean Breeze Villa',
        checkIn,
        checkOut,
        nights,
        guests: guests || 2,
        pricePerNight: rate,
        cleaningFee,
        serviceFee,
        totalPrice,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Booking creation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: existingBookings.length,
    data: existingBookings
  });
}
