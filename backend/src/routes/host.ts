import { Router, Request, Response } from 'express';
import { mockListings } from '../data/mockListings';

const router = Router();

// GET /api/host/analytics - Host dashboard stats & earnings
router.get('/analytics', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      hostName: 'Rahul',
      stats: {
        properties: 4,
        reservations: 18,
        guests: 31,
        totalEarnings: 142500
      },
      monthlyEarnings: [
        { month: 'Jan', earnings: 42000 },
        { month: 'Feb', earnings: 51000 },
        { month: 'Mar', earnings: 68000 },
        { month: 'Apr', earnings: 74000 }
      ],
      properties: mockListings.slice(0, 4).map(p => ({
        id: p.id,
        title: p.title,
        location: p.location,
        pricePerNight: p.pricePerNight,
        status: 'Published'
      })),
      reservations: [
        { id: 'res-1', guestName: 'Amit', propertyTitle: 'Ocean Breeze Villa', dates: 'Sep 10–14', status: 'Confirmed' },
        { id: 'res-2', guestName: 'Priya', propertyTitle: 'Alpine Cedar Chalet', dates: 'Sep 18–21', status: 'Pending' },
        { id: 'res-3', guestName: 'Rohan', propertyTitle: 'Heritage Lakefront Palace', dates: 'Oct 02–05', status: 'Confirmed' }
      ]
    }
  });
});

export default router;
