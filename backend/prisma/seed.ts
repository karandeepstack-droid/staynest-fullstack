import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding StayNest database...');

  // 1. Seed Host User
  const hostPassword = await bcrypt.hash('password123', 10);
  const host = await prisma.user.upsert({
    where: { email: 'rahul@staynest.com' },
    update: {},
    create: {
      name: 'Rahul',
      email: 'rahul@staynest.com',
      password: hostPassword,
      role: 'Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  });

  // 2. Seed Guest User
  const guestPassword = await bcrypt.hash('password123', 10);
  const guest = await prisma.user.upsert({
    where: { email: 'amit@example.com' },
    update: {},
    create: {
      name: 'Amit Sharma',
      email: 'amit@example.com',
      password: guestPassword,
      role: 'Guest'
    }
  });

  // 3. Seed Property
  const property = await prisma.property.create({
    data: {
      hostId: host.id,
      title: 'Ocean Breeze Villa',
      description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, ocean views, and tropical gardens.',
      propertyType: 'Villa',
      category: 'Villas',
      location: 'Arambol, Goa',
      country: 'India',
      pricePerNight: 6500,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      rating: 4.89,
      isSuperhost: true,
      images: {
        create: [
          { imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80' },
          { imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' }
        ]
      },
      amenities: {
        create: [
          { name: 'Wi-Fi' },
          { name: 'Swimming pool' },
          { name: 'Kitchen' },
          { name: 'Parking' },
          { name: 'Air conditioning' }
        ]
      }
    }
  });

  console.log('✅ StayNest database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
