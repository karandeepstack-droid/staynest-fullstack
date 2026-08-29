import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import db from '../services/db';

const router = Router();

router.use(authenticateToken as any);

// GET /api/wishlist - Get user wishlist
router.get('/', (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || 'user-guest-01';
  const wishlistPropertyIds = db.getWishlist(userId);
  const properties = wishlistPropertyIds
    .map(id => db.getListingById(id))
    .filter(Boolean);

  res.json({ success: true, count: properties.length, data: properties });
});

// POST /api/wishlist/toggle - Toggle wishlist property
router.post('/toggle', (req: Request, res: Response) => {
  const { propertyId } = req.body;
  const userId = (req as any).user?.userId || 'user-guest-01';

  if (!propertyId) {
    return res.status(400).json({ success: false, message: 'Property ID is required' });
  }

  const updatedWishlist = db.toggleWishlist(userId, propertyId);
  const isSaved = updatedWishlist.includes(propertyId);

  res.json({
    success: true,
    message: isSaved ? 'Saved to wishlist ❤️' : 'Removed from wishlist',
    isSaved,
    wishlist: updatedWishlist
  });
});

export default router;
