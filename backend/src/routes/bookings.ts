import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import db from '../services/db';
import {
  authenticateToken,
  AuthenticatedRequest,
} from '../middleware/auth';

const router = Router();

/**
 * POST /api/bookings
 * Create a real database-backed booking.
 */
router.post(
  '/',
  authenticateToken as any,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const {
        propertyId,
        checkIn,
        checkOut,
        guests,
      } = req.body;

      if (!propertyId || !checkIn || !checkOut || guests == null) {
        return res.status(400).json({
          success: false,
          message: 'Property, dates, and guest count are required',
        });
      }

      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const guestCount = Number(guests);

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: 'Invalid check-in or check-out date',
        });
      }

      if (endDate <= startDate) {
        return res.status(400).json({
          success: false,
          message: 'Check-out must be after check-in',
        });
      }

      if (!Number.isInteger(guestCount) || guestCount < 1) {
        return res.status(400).json({
          success: false,
          message: 'Guest count must be at least 1',
        });
      }

      let property: any = null;
      if (prisma && prisma.property) {
        property = await prisma.property.findUnique({
          where: { id: propertyId },
        });
      }
      if (!property) {
        property = db.getListingById(propertyId);
      }

      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      if (guestCount > property.maxGuests) {
        return res.status(400).json({
          success: false,
          message: `This property can accommodate a maximum of ${property.maxGuests} guests`,
        });
      }

      // Check for an overlapping confirmed/pending booking.
      let conflictingBooking: any = null;
      if (prisma && prisma.booking) {
        conflictingBooking = await prisma.booking.findFirst({
          where: {
            propertyId,
            status: {
              in: ['Pending', 'Confirmed'],
            },
            checkIn: {
              lt: endDate,
            },
            checkOut: {
              gt: startDate,
            },
          },
        });
      } else {
        const existing = db.getBookings();
        const nStart = startDate.getTime();
        const nEnd = endDate.getTime();
        conflictingBooking = existing.find((b: any) => {
          if (b.propertyId !== propertyId) return false;
          const bStart = new Date(b.checkIn).getTime();
          const bEnd = new Date(b.checkOut).getTime();
          return nStart < bEnd && nEnd > bStart;
        });
      }

      if (conflictingBooking) {
        return res.status(409).json({
          success: false,
          message: 'These dates are unavailable',
        });
      }

      // Calculate number of nights.
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) /
          millisecondsPerDay
      );

      const stayCost = property.pricePerNight * nights;
      const totalPrice =
        stayCost +
        (property.cleaningFee || 1500) +
        (property.serviceFee || 2100);

      const bookingId = `SN-${Math.floor(100000 + Math.random() * 900000)}`;

      let booking: any = null;
      if (prisma && prisma.booking) {
        booking = await prisma.booking.create({
          data: {
            id: bookingId,
            propertyId,
            guestId: userId,
            checkIn: startDate,
            checkOut: endDate,
            guests: guestCount,
            nights,
            totalPrice,
            status: 'Confirmed',
          },
          include: {
            property: true,
          },
        });
      } else {
        booking = db.addBooking({
          id: bookingId,
          propertyId,
          propertyTitle: property.title,
          location: property.location,
          image: property.images[0],
          guestId: userId,
          guestName: 'Guest',
          guestEmail: req.user?.email || '',
          checkIn: checkIn,
          checkOut: checkOut,
          nights,
          guests: guestCount,
          pricePerNight: property.pricePerNight,
          cleaningFee: property.cleaningFee || 1500,
          serviceFee: property.serviceFee || 2100,
          totalPrice,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Booking confirmed',
        data: booking,
      });
    } catch (error) {
      console.error('Create booking error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to create booking',
      });
    }
  }
);

/**
 * GET /api/bookings
 * Get bookings belonging to the logged-in user.
 */
router.get(
  '/',
  authenticateToken as any,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      let bookings: any[] = [];
      if (prisma && prisma.booking) {
        bookings = await prisma.booking.findMany({
          where: {
            guestId: userId,
          },
          include: {
            property: {
              include: {
                images: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } else {
        bookings = db.getBookings().filter(b => b.guestId === userId);
      }

      return res.json({
        success: true,
        count: bookings.length,
        data: bookings,
      });
    } catch (error) {
      console.error('Get bookings error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve bookings',
      });
    }
  }
);

export default router;
