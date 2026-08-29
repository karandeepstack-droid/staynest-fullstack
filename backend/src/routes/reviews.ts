import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import db from '../services/db';

const router = Router();

// GET /api/reviews/:propertyId - Fetch reviews for property
router.get('/:propertyId', (req: Request, res: Response) => {
  const reviews = db.getReviewsByProperty(req.params.propertyId);
  res.json({ success: true, count: reviews.length, data: reviews });
});

// POST /api/reviews - Add review for property
router.post('/', authenticateToken as any, (req: Request, res: Response) => {
  const { propertyId, rating, comment } = req.body;
  const user = (req as any).user;

  if (!propertyId || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'Property ID, rating, and comment are required' });
  }

  const newReview = db.addReview({
    id: `rev-${Date.now()}`,
    propertyId,
    guestName: user?.email ? user.email.split('@')[0] : 'Guest User',
    rating: Number(rating),
    comment,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    data: newReview
  });
});

export default router;
