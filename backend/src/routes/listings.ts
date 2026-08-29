import { Router, Request, Response } from 'express';
import { mockListings } from '../data/mockListings';

const router = Router();

// GET /api/listings - Get all listings (supports ?category= and ?search=)
router.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let result = [...mockListings];

  if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
    result = result.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/listings/:id - Get listing details
router.get('/:id', (req: Request, res: Response) => {
  const listing = mockListings.find(item => item.id === req.params.id);
  if (!listing) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }
  res.json({ success: true, data: listing });
});

export default router;
