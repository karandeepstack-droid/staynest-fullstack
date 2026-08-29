import { Router, Request, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

let reviewsStore = [
  {
    id: 'rev-01',
    propertyId: 'stay-001',
    guestName: 'Amit Sharma',
    rating: 5,
    comment: 'The villa was absolutely stunning! Clean infinity pool and beautiful sunset views over Arambol beach.',
    createdAt: '2026-08-15T10:00:00.000Z'
  },
  {
    id: 'rev-02',
    propertyId: 'stay-001',
    guestName: 'Priya Verma',
    rating: 4.8,
    comment: 'Rahul was a great host. Very responsive and gave great local Goan food recommendations.',
    createdAt: '2026-08-10T14:30:00.000Z'
  }
];

// GET /api/reviews/property/:propertyId
router.get('/property/:propertyId', (req: Request, res: Response) => {
  const propertyReviews = reviewsStore.filter(r => r.propertyId === req.params.propertyId);
  const avgRating = propertyReviews.length > 0
    ? (propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length).toFixed(2)
    : 4.89;

  res.json({
    success: true,
    count: propertyReviews.length,
    averageRating: Number(avgRating),
    data: propertyReviews
  });
});

// POST /api/reviews - Add review
router.post('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { propertyId, rating, comment } = req.body;

  if (!propertyId || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'Property ID, rating, and comment are required' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    propertyId,
    guestName: req.user?.name || 'Verified Guest',
    rating: Number(rating),
    comment,
    createdAt: new Date().toISOString()
  };

  reviewsStore.unshift(newReview);

  res.status(201).json({
    success: true,
    message: '✓ Review submitted successfully',
    data: newReview
  });
});

export default router;
