'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import { Star, MapPin, Check, Heart, MessageSquare, Grid, X, Send, Sparkles, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, user } = useAuth();
  const propertyId = params.id || 'stay-001';

  // Booking Card State
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-14');
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal States
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  const property = {
    id: propertyId,
    title: 'Ocean Breeze Villa',
    rating: 4.89,
    reviewCount: 124,
    location: 'Arambol, Goa, India',
    specs: 'Entire villa · 4 guests · 2 bedrooms · 2 beds · 2 bathrooms',
    description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens.',
    pricePerNight: 6500,
    cleaningFee: 1500,
    serviceFee: 2100,
    host: {
      name: 'Rahul',
      rating: 4.9,
      reviews: 124,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Wi-Fi', 'Swimming pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washing machine']
  };

  const isWishlisted = wishlist.includes(property.id);
  const nights = 4;
  const stayCost = property.pricePerNight * nights;
  const totalAmount = stayCost + property.cleaningFee + property.serviceFee;

  const handleReserve = async () => {
    setBookingError('');
    setIsSubmitting(true);

    try {
      if (!user) {
        setBookingError('Please log in before making a reservation.');
        return;
      }

      const token = localStorage.getItem('staynest_token');

      if (!token) {
        setBookingError('Please log in again before making a reservation.');
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn,
          checkOut,
          guests: guestsCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingError(data.message || 'Unable to create booking.');
        return;
      }

      const bookingId = data?.booking?.id || data?.data?.id;

      if (!bookingId) {
        setBookingError('Booking was created but no booking ID was returned.');
        return;
      }

      router.push(`/booking?id=${bookingId}`);
    } catch (error) {
      console.error('Booking request failed:', error);
      setBookingError('Unable to connect to the booking service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        {/* Title & Actions */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                ⭐ {property.rating} · {property.reviewCount} reviews
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                📍 {property.location}
              </span>
            </div>

            <button
              onClick={() => toggleWishlist(property.id)}
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-500 border border-gray-300 rounded-full px-4 py-1.5 shadow-sm transition"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-500 text-brand-500' : ''}`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* 5-Photo Gallery Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-10 border border-gray-200 shadow-sm">
          <div className="md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
              onClick={() => setGalleryModalOpen(true)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 col-span-2 md:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={property.images[1]}
                alt="Gallery 2"
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer aspect-square"
                onClick={() => setGalleryModalOpen(true)}
              />
              <img
                src={property.images[2]}
                alt="Gallery 3"
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer aspect-square"
                onClick={() => setGalleryModalOpen(true)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={property.images[3]}
                alt="Gallery 4"
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer aspect-square"
                onClick={() => setGalleryModalOpen(true)}
              />
              <img
                src={property.images[4]}
                alt="Gallery 5"
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer aspect-square"
                onClick={() => setGalleryModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Content & Sticky Booking Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{property.specs}</h2>
              <p className="text-sm text-gray-500 font-medium">
                Hosted by {property.host.name} {property.host.isSuperhost && '• Superhost ✨'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900">About this place</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-gray-200 rounded-3xl p-6 shadow-xl space-y-5 bg-white">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-gray-900">
                  ₹{property.pricePerNight.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500">night</span>
                </span>
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  ⭐ {property.rating}
                </span>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-2xl p-2 bg-gray-50">
                <div className="p-1">
                  <label className="block text-[10px] font-black uppercase text-gray-500">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-gray-900 focus:outline-none"
                  />
                </div>
                <div className="p-1 border-l border-gray-300 pl-2">
                  <label className="block text-[10px] font-black uppercase text-gray-500">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Price Breakdown */}
              <div className="space-y-2 pt-2 text-xs font-medium text-gray-600 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>₹{property.pricePerNight.toLocaleString('en-IN')} × {nights} nights</span>
                  <span>₹{stayCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>₹{property.cleaningFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>₹{property.serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-brand-600">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {bookingError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl">
                  {bookingError}
                </div>
              )}

              <button
                onClick={handleReserve}
                disabled={isSubmitting}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? 'Checking availability...' : 'Reserve'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
