import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

let wishlistStore: { [userId: string]: string[] } = {
  'user-01': ['stay-001']
};

// GET /api/wishlist
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'user-01';
  const saved = wishlistStore[userId] || [];
  res.json({ success: true, data: saved });
});

// POST /api/wishlist - Add property
router.post('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'user-01';
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({ success: false, message: 'Property ID required' });
  }

  if (!wishlistStore[userId]) wishlistStore[userId] = [];
  if (!wishlistStore[userId].includes(propertyId)) {
    wishlistStore[userId].push(propertyId);
  }

  res.json({ success: true, data: wishlistStore[userId] });
});

// DELETE /api/wishlist/:propertyId - Remove property
router.delete('/:propertyId', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'user-01';
  const { propertyId } = req.params;

  if (wishlistStore[userId]) {
    wishlistStore[userId] = wishlistStore[userId].filter(id => id !== propertyId);
  }

  res.json({ success: true, data: wishlistStore[userId] || [] });
});

export default router;
