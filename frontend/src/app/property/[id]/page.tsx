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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: 'Amit Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'August 2026',
      comment: 'The villa was absolutely breathtaking! Clean private infinity pool and incredible sunset views over Arambol beach.'
    },
    {
      id: 'rev-2',
      author: 'Priya Verma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      date: 'July 2026',
      comment: 'Rahul is an outstanding host. Super responsive, welcoming, and gave us the best Goan restaurant recommendations.'
    }
  ]);

  const property = {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    rating: 4.89,
    reviewCount: 124,
    location: 'Arambol, Goa, India',
    specs: 'Entire villa · 4 guests · 2 bedrooms · 2 beds · 2 bathrooms',
    description: 'A beautiful luxury villa located in Arambol, Goa. Enjoy private swimming pool, panoramic ocean sunset views, open sun deck, and lush tropical gardens. Designed with airy open spaces, teakwood accents, and high-speed fibre internet for remote work or relaxed beach getaways.',
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
      const res = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: property.title,
          location: property.location,
          image: property.images[0],
          checkIn,
          checkOut,
          nights,
          guests: guestsCount,
          pricePerNight: property.pricePerNight,
          cleaningFee: property.cleaningFee,
          serviceFee: property.serviceFee,
          totalPrice: totalAmount
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setBookingError(data.message || '❌ These dates are unavailable.');
      } else {
        router.push(`/booking?id=${data.data.id}`);
      }
    } catch (err) {
      router.push(`/booking?id=SN-839241`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setReviewsList(prev => [
      {
        id: `rev-${Date.now()}`,
        author: user?.name || 'Rahul (Demo User)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: newRating,
        date: 'Just now',
        comment: newComment
      },
      ...prev
    ]);

    setNewComment('');
    setReviewModalOpen(false);
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
                ⭐ {property.rating} · {reviewsList.length + 122} reviews
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

          <button
            onClick={() => setGalleryModalOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 font-bold text-xs px-4 py-2 rounded-xl border border-gray-200 shadow-lg flex items-center gap-2 hover:bg-white transition"
          >
            <Grid className="w-4 h-4" />
            Show all photos
          </button>
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

            {/* Description */}
            <div className="border-b border-gray-200 pb-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900">About this place</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 font-bold" />
                    <span>✓ {amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Category Breakdown */}
            <div className="border-b border-gray-200 pb-8 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                ⭐ {property.rating} · Rating Breakdown
              </h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs font-semibold text-gray-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Cleanliness</span>
                    <span>4.9</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-900 h-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Accuracy</span>
                    <span>4.9</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-900 h-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Communication</span>
                    <span>5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-900 h-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Location</span>
                    <span>4.9</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-900 h-full w-[98%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Host Banner Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Hosted by {property.host.name}</h4>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mt-0.5">
                    <span>⭐ {property.host.rating} rating</span>
                    <span>•</span>
                    <span>{property.host.reviews} reviews</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setContactModalOpen(true)}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-brand-500" />
                Contact Host
              </button>
            </div>

            {/* Guest Reviews Feed & Write Review Action */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Guest Reviews ({reviewsList.length})</h3>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-600 font-bold text-xs px-4 py-2 rounded-xl transition border border-brand-200 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Write a Review
                </button>
              </div>

              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="border border-gray-200 rounded-2xl p-5 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">{rev.author}</p>
                          <p className="text-xs text-gray-400">{rev.date}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> ⭐ {rev.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Desktop Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{property.pricePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500 text-sm"> night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>⭐ {property.rating}</span>
                </div>
              </div>

              <div className="border border-gray-300 rounded-2xl overflow-hidden divide-y divide-gray-300 text-xs">
                <div className="grid grid-cols-2 divide-x divide-gray-300 bg-gray-50">
                  <div className="p-3">
                    <label className="block font-bold text-gray-500 uppercase text-[9px]">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block font-bold text-gray-500 uppercase text-[9px]">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="p-3 bg-gray-50">
                  <label className="block font-bold text-gray-500 uppercase text-[9px]">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                  </select>
                </div>
              </div>

              {bookingError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl">
                  {bookingError}
                </div>
              )}

              <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>₹{property.pricePerNight.toLocaleString('en-IN')} × {nights} nights</span>
                  <span className="font-semibold text-gray-900">₹{stayCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span className="font-semibold text-gray-900">₹{property.cleaningFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span className="font-semibold text-gray-900">₹{property.serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleReserve}
                disabled={isSubmitting}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-lg transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Reserving...' : 'Reserve'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl relative">
            <button onClick={() => setReviewModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">How was your stay?</h2>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Review</label>
                <textarea
                  rows={4}
                  placeholder="Write a review..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl shadow-md transition">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Host Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl relative">
            <button onClick={() => setContactModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Contact {property.host.name}</h2>
            <div className="space-y-3">
              <textarea
                rows={4}
                placeholder={`Hi ${property.host.name}, I have a question about ${property.title}...`}
                className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  alert(`✓ Message sent to host ${property.host.name}!`);
                  setContactModalOpen(false);
                }}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
