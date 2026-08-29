import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import listingsRouter from './routes/listings';
import bookingsRouter from './routes/bookings';
import hostRouter from './routes/host';
import authRouter from './routes/auth';
import reviewsRouter from './routes/reviews';
import wishlistRouter from './routes/wishlist';
import adminRouter from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'StayNest REST API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/host', hostRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`✨ StayNest API backend running on http://localhost:${PORT}`);
});
