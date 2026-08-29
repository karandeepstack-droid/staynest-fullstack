import { Router, Request, Response } from 'express';
import db from '../services/db';

const router = Router();

// GET /api/listings - Query property listings from Database (supports ?category= and ?search=)
router.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;

  const listings = db.getListings(
    typeof category === 'string' ? category : undefined,
    typeof search === 'string' ? search : undefined
  );

  res.json({
    success: true,
    count: listings.length,
    data: listings
  });
});

// GET /api/listings/:id - Fetch single property details from Database
router.get('/:id', (req: Request, res: Response) => {
  const listing = db.getListingById(req.params.id);
  if (!listing) {
    return res.status(404).json({ success: false, message: 'Property listing not found in database' });
  }
  res.json({ success: true, data: listing });
});

export default router;
