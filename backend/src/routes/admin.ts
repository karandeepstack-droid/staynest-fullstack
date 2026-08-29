import { Router, Request, Response } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import db from '../services/db';

const router = Router();

// Protect all admin routes
router.use(authenticateToken as any);
router.use(requireRole(['Admin']) as any);

// GET /api/admin/stats - Admin platform statistics
router.get('/stats', (req: Request, res: Response) => {
  const users = db.getAllUsers();
  const bookings = db.getBookings();
  const listings = db.getListings();

  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + b.totalPrice, 0);

  res.json({
    success: true,
    data: {
      totalUsers: users.length,
      totalHosts: users.filter((u: any) => u.role === 'Host').length,
      totalGuests: users.filter((u: any) => u.role === 'Guest').length,
      totalListings: listings.length,
      totalBookings: bookings.length,
      totalRevenue
    }
  });
});

// GET /api/admin/users - Admin fetch all users
router.get('/users', (req: Request, res: Response) => {
  const users = db.getAllUsers().map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isSuspended: !!u.isSuspended,
    createdAt: u.createdAt
  }));

  res.json({ success: true, count: users.length, data: users });
});

// POST /api/admin/users/:id/suspend - Admin suspend or reactivate user
router.post('/users/:id/suspend', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = db.getAllUsers().find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.isSuspended = !user.isSuspended;

  res.json({
    success: true,
    message: `User ${user.name} ${user.isSuspended ? 'suspended' : 'reactivated'} successfully`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isSuspended: user.isSuspended
    }
  });
});

export default router;
