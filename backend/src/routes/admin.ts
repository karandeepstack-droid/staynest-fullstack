import { Router, Response } from 'express';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { usersStore } from './auth';
import { mockListings } from '../data/mockListings';

const router = Router();

// Apply auth + Admin role requirement to all admin routes
router.use(authenticateToken as any);
router.use(requireRole(['Admin']) as any);

// GET /api/admin/stats - Admin platform statistics
router.get('/stats', (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      totalUsers: usersStore.length,
      totalHosts: usersStore.filter(u => u.role === 'Host').length,
      totalProperties: mockListings.length,
      totalBookings: 18,
      platformRevenue: 28500
    }
  });
});

// GET /api/admin/users - View all users and hosts
router.get('/users', (req: AuthenticatedRequest, res: Response) => {
  const safeUsers = usersStore.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.isSuspended ? 'Suspended' : 'Active'
  }));

  res.json({ success: true, data: safeUsers });
});

// POST /api/admin/users/:id/suspend - Suspend user
router.post('/users/:id/suspend', (req: AuthenticatedRequest, res: Response) => {
  const user = usersStore.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.isSuspended = !user.isSuspended;

  res.json({
    success: true,
    message: `User ${user.name} has been ${user.isSuspended ? 'suspended' : 'reactivated'}`,
    data: user
  });
});

export default router;
