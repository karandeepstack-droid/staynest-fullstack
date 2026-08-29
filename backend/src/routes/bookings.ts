import { Router, Request, Response } from 'express';

const router = Router();

// Mock active bookings
let mockBookings = [
  {
    id: 'SN-839241',
    propertyId: 'stay-001',
    propertyTitle: 'Ocean Breeze Villa',
    location: 'Arambol, Goa, India',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    guestName: 'Amit Sharma',
    guestEmail: 'amit@example.com',
    checkIn: '2026-09-10',
    checkOut: '2026-09-14',
    nights: 4,
    guests: 2,
    pricePerNight: 6500,
    cleaningFee: 1500,
    serviceFee: 2100,
    totalPrice: 29600,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// POST /api/bookings - Create new booking
router.post('/', (req: Request, res: Response) => {
  const { propertyId, propertyTitle, location, image, checkIn, checkOut, nights, guests, pricePerNight, cleaningFee, serviceFee, totalPrice } = req.body;

  // Simple availability check: overlap simulation
  if (checkIn === '2026-09-12' || checkIn === '2026-09-13') {
    return res.status(400).json({
      success: false,
      message: '❌ These dates are unavailable for booking. Please select different dates.'
    });
  }

  const bookingId = `SN-${Math.floor(100000 + Math.random() * 900000)}`;

  const newBooking = {
    id: bookingId,
    propertyId: propertyId || 'stay-001',
    propertyTitle: propertyTitle || 'Ocean Breeze Villa',
    location: location || 'Arambol, Goa, India',
    image: image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    guestName: 'Rahul (Logged In User)',
    guestEmail: 'user@staynest.com',
    checkIn: checkIn || '2026-09-10',
    checkOut: checkOut || '2026-09-14',
    nights: nights || 4,
    guests: guests || 2,
    pricePerNight: pricePerNight || 6500,
    cleaningFee: cleaningFee || 1500,
    serviceFee: serviceFee || 2100,
    totalPrice: totalPrice || 29600,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  mockBookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: '✓ Booking confirmed!',
    data: newBooking
  });
});

// GET /api/bookings - Get user bookings
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockBookings
  });
});

export default router;
