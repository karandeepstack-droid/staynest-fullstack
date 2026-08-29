import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding StayNest database with Prisma...');

  // Clean existing tables
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Host User
  const hostPassword = await bcrypt.hash('password123', 10);
  const host = await prisma.user.create({
    data: {
      id: 'user-host-01',
      name: 'Rahul',
      email: 'rahul@staynest.com',
      password: hostPassword,
      role: 'Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  });

  // 2. Seed Guest User
  const guestPassword = await bcrypt.hash('password123', 10);
  const guest = await prisma.user.create({
    data: {
      id: 'user-guest-01',
      name: 'Amit Sharma',
      email: 'amit@example.com',
      password: guestPassword,
      role: 'Guest'
    }
  });

  // 3. Seed Properties
  const listingsData = [
    {
      id: 'stay-001',
      title: 'Ocean Breeze Villa',
      description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens.',
      category: 'Villas',
      propertyType: 'Villa',
      location: 'Arambol, Goa',
      country: 'India',
      pricePerNight: 6500,
      rating: 4.89,
      reviewCount: 124,
      isSuperhost: true,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning']
    },
    {
      id: 'stay-002',
      title: 'Alpine Cedar Chalet',
      description: 'Rustic wooden timber chalet nestled in the serene pine forests of Manali. Features cozy stone fireplace and mountain views.',
      category: 'Cabins',
      propertyType: 'Cabin',
      location: 'Manali, Himachal Pradesh',
      country: 'India',
      pricePerNight: 8200,
      rating: 4.95,
      reviewCount: 86,
      isSuperhost: true,
      maxGuests: 6,
      bedrooms: 3,
      beds: 4,
      baths: 3,
      images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Wi-Fi', 'Fireplace', 'Parking', 'Kitchen', 'Hot tub']
    },
    {
      id: 'stay-003',
      title: 'Heritage Lakefront Palace',
      description: 'Experience royal Rajasthani hospitality in a restored heritage estate overlooking Lake Pichola.',
      category: 'Luxury',
      propertyType: 'House',
      location: 'Udaipur, Rajasthan',
      country: 'India',
      pricePerNight: 14500,
      rating: 4.98,
      reviewCount: 150,
      isSuperhost: true,
      maxGuests: 8,
      bedrooms: 4,
      beds: 5,
      baths: 4,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['Wi-Fi', 'Swimming pool', 'Air conditioning', 'Kitchen', 'Free Breakfast']
    },
    {
      id: 'stay-004',
      title: 'Serene Backwater Palm Villa',
      description: 'Tranquil waterfront retreat in the heart of Kerala backwaters with private boat jetty.',
      category: 'Beach',
      propertyType: 'Villa',
      location: 'Alleppey, Kerala',
      country: 'India',
      pricePerNight: 5400,
      rating: 4.91,
      reviewCount: 72,
      isSuperhost: false,
      maxGuests: 5,
      bedrooms: 2,
      beds: 3,
      baths: 2,
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['Wi-Fi', 'Waterfront', 'Air conditioning', 'Kitchen']
    },
    {
      id: 'stay-005',
      title: 'Redwood Glasshouse Canopy',
      description: 'Suspended glass cabin high above the coffee plantations of Coorg.',
      category: 'Countryside',
      propertyType: 'Cabin',
      location: 'Coorg, Karnataka',
      country: 'India',
      pricePerNight: 7800,
      rating: 4.94,
      reviewCount: 110,
      isSuperhost: true,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['Wi-Fi', 'Balcony', 'Parking', 'Fire pit']
    }
  ];

  for (const item of listingsData) {
    const { images, amenities, ...propData } = item;
    await prisma.property.create({
      data: {
        ...propData,
        hostId: host.id,
        images: {
          create: images.map(img => ({ imageUrl: img }))
        },
        amenities: {
          create: amenities.map(a => ({ name: a }))
        }
      }
    });
  }

  console.log('✅ StayNest Prisma database successfully populated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
