import bcrypt from 'bcryptjs';
import { Listing } from '../types';

export interface DBUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'Guest' | 'Host' | 'Admin';
  isSuspended?: boolean;
  createdAt: string;
}

export interface DBBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  location: string;
  image: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface DBReview {
  id: string;
  propertyId: string;
  guestName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

class StayNestDatabase {
  private properties: Listing[] = [
    {
      id: 'stay-001',
      title: 'Ocean Breeze Villa',
      description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens. Designed with airy open spaces, teakwood accents, and high-speed fibre internet for remote work or relaxed beach getaways.',
      category: 'Villas',
      propertyType: 'Villa',
      location: 'Arambol, Goa',
      country: 'India',
      pricePerNight: 6500,
      rating: 4.89,
      reviewCount: 124,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      ],
      hostName: 'Rahul',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washing machine']
    },
    {
      id: 'stay-002',
      title: 'Alpine Cedar Chalet',
      description: 'Rustic wooden timber chalet nestled in the serene pine forests of Manali. Features cozy stone fireplace, outdoor heated jacuzzi, and unobstructed views of snow-capped Himalayan peaks.',
      category: 'Cabins',
      propertyType: 'Cabin',
      location: 'Manali, Himachal Pradesh',
      country: 'India',
      pricePerNight: 8200,
      rating: 4.95,
      reviewCount: 86,
      images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
      ],
      hostName: 'Priya',
      isSuperhost: true,
      maxGuests: 6,
      bedrooms: 3,
      beds: 4,
      baths: 3,
      amenities: ['Wi-Fi', 'Fireplace', 'Parking', 'Kitchen', 'Hot tub', 'Mountain View']
    },
    {
      id: 'stay-003',
      title: 'Heritage Lakefront Palace',
      description: 'Experience royal Rajasthani hospitality in a restored heritage estate overlooking Lake Pichola. Features intricate marble architecture, courtyard gardens, and authentic dining experiences.',
      category: 'Luxury',
      propertyType: 'House',
      location: 'Udaipur, Rajasthan',
      country: 'India',
      pricePerNight: 14500,
      rating: 4.98,
      reviewCount: 150,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      ],
      hostName: 'Vikram',
      isSuperhost: true,
      maxGuests: 8,
      bedrooms: 4,
      beds: 5,
      baths: 4,
      amenities: ['Wi-Fi', 'Swimming pool', 'Air conditioning', 'Kitchen', 'Free Breakfast', 'Lake View']
    },
    {
      id: 'stay-004',
      title: 'Serene Backwater Palm Villa',
      description: 'Tranquil waterfront retreat in the heart of Kerala backwaters. Private boat jetty, outdoor infinity deck, fresh coconut groves, and traditional Ayurvedic wellness corner.',
      category: 'Beach',
      propertyType: 'Villa',
      location: 'Alleppey, Kerala',
      country: 'India',
      pricePerNight: 5400,
      rating: 4.91,
      reviewCount: 72,
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
      ],
      hostName: 'Anand',
      isSuperhost: false,
      maxGuests: 5,
      bedrooms: 2,
      beds: 3,
      baths: 2,
      amenities: ['Wi-Fi', 'Waterfront', 'Air conditioning', 'Kitchen', 'Free Breakfast']
    },
    {
      id: 'stay-005',
      title: 'Redwood Glasshouse Canopy',
      description: 'Suspended glass cabin high above the coffee plantations of Coorg. Stargazing glass skylights, private bonfire deck, and organic plantation tours.',
      category: 'Countryside',
      propertyType: 'Cabin',
      location: 'Coorg, Karnataka',
      country: 'India',
      pricePerNight: 7800,
      rating: 4.94,
      reviewCount: 110,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
      ],
      hostName: 'Sneha',
      isSuperhost: true,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1,
      amenities: ['Wi-Fi', 'Balcony', 'Parking', 'Fire pit', 'Coffee maker']
    }
  ];

  private users: DBUser[] = [
    {
      id: 'user-host-01',
      name: 'Rahul',
      email: 'rahul@staynest.com',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'Host',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user-guest-01',
      name: 'Amit Sharma',
      email: 'amit@example.com',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'Guest',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user-admin-01',
      name: 'Admin User',
      email: 'admin@staynest.com',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'Admin',
      createdAt: new Date().toISOString()
    }
  ];

  private bookings: DBBooking[] = [
    {
      id: 'SN-839241',
      propertyId: 'stay-001',
      propertyTitle: 'Ocean Breeze Villa',
      location: 'Arambol, Goa, India',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      guestId: 'user-guest-01',
      guestName: 'Amit Sharma',
      guestEmail: 'amit@example.com',
      checkIn: '2026-09-10',
      checkOut: '2026-09-14',
      nights: 4,
      guests: 2,
      pricePerNight: 6500,
      cleaningFee: 1500,
      serviceFee: 2100,
      totalPrice: 29600,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }
  ];

  private reviews: DBReview[] = [
    {
      id: 'rev-01',
      propertyId: 'stay-001',
      guestName: 'Amit Sharma',
      rating: 5,
      comment: 'The villa was absolutely stunning! Clean infinity pool and sunset ocean views.',
      createdAt: '2026-08-15T10:00:00.000Z'
    }
  ];

  private wishlists: { [userId: string]: string[] } = {
    'user-guest-01': ['stay-001']
  };

  // Listings Query Engine
  public getListings(category?: string, search?: string): Listing[] {
    let result = [...this.properties];

    if (category && category.toLowerCase() !== 'all') {
      result = result.filter(item =>
        item.category.toLowerCase() === category.toLowerCase() ||
        (item.propertyType && item.propertyType.toLowerCase() === category.toLowerCase())
      );
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public getListingById(id: string): Listing | undefined {
    return this.properties.find(item => item.id === id);
  }

  public addProperty(newListing: Listing): Listing {
    this.properties.unshift(newListing);
    return newListing;
  }

  // Users Database
  public findUserByEmail(email: string): DBUser | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public addUser(user: DBUser): DBUser {
    this.users.push(user);
    return user;
  }

  public getAllUsers(): DBUser[] {
    return this.users;
  }

  // Bookings Database
  public getBookings(): DBBooking[] {
    return this.bookings;
  }

  public addBooking(booking: DBBooking): DBBooking {
    this.bookings.unshift(booking);
    return booking;
  }

  // Reviews & Rating Calculations
  public getReviewsByProperty(propertyId: string): DBReview[] {
    return this.reviews.filter(r => r.propertyId === propertyId);
  }

  public addReview(review: DBReview): DBReview {
    this.reviews.unshift(review);

    // Recalculate rating
    const propertyReviews = this.getReviewsByProperty(review.propertyId);
    const avgRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length;

    const prop = this.getListingById(review.propertyId);
    if (prop) {
      prop.rating = Number(avgRating.toFixed(2));
      prop.reviewCount = propertyReviews.length;
    }

    return review;
  }

  // Wishlist Storage
  public getWishlist(userId: string): string[] {
    return this.wishlists[userId] || [];
  }

  public toggleWishlist(userId: string, propertyId: string): string[] {
    if (!this.wishlists[userId]) this.wishlists[userId] = [];
    if (this.wishlists[userId].includes(propertyId)) {
      this.wishlists[userId] = this.wishlists[userId].filter(id => id !== propertyId);
    } else {
      this.wishlists[userId].push(propertyId);
    }
    return this.wishlists[userId];
  }
}

export const db = new StayNestDatabase();
export default db;
