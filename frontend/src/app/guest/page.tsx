'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import PropertyCard, { PropertyCardProps } from '../../components/home/PropertyCard';
import { Calendar, MapPin, Heart, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function GuestDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'upcoming';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'wishlist'>(initialTab as any);
  const { wishlist, token, user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        const authToken = token || localStorage.getItem('staynest_token');
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }

        const res = await fetch('/api/bookings', { headers });
        const data = await res.json();
        if (res.ok && data.data) {
          setBookings(data.data);
        }
      } catch (err) {
        console.error('Failed to load guest bookings:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [token]);

  const savedProperties: PropertyCardProps[] = [
    {
      id: 'stay-001',
      title: 'Ocean Breeze Villa',
      location: 'Goa',
      country: 'India',
      pricePerNight: 6500,
      rating: 4.89,
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
      isSuperhost: true
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Guest Dashboard</h1>

      <div className="flex border-b border-gray-200 bg-white rounded-2xl p-2 shadow-sm mb-8 gap-2 max-w-md">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Upcoming Trips ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            activeTab === 'past'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Past Trips
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            activeTab === 'wishlist'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({wishlist.length})
        </button>
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Reservations</h2>
          {isLoading ? (
            <div className="text-center py-12 text-gray-500 font-medium">Loading your trips...</div>
          ) : bookings.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No upcoming trips yet</h3>
              <p className="text-sm text-gray-500">Discover unique homes and villas for your next getaway.</p>
              <Link
                href="/search"
                className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-2xl transition text-sm shadow-md"
              >
                Explore Stays
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={
                      booking.image ||
                      booking.property?.images?.[0]?.imageUrl ||
                      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={booking.propertyTitle || booking.property?.title || 'Stay'}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" /> {booking.status || 'Confirmed'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {booking.propertyTitle || booking.property?.title || 'Ocean Breeze Villa'}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {booking.location || booking.property?.location || 'Goa, India'}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">
                      {booking.checkIn} – {booking.checkOut} ({booking.nights || 4} nights · {booking.guests || 2} guests)
                    </p>
                  </div>
                </div>

                <Link
                  href={`/booking?id=${booking.id}`}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-sm transition self-stretch md:self-auto text-center"
                >
                  View trip
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'past' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Past Stays</h2>
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 opacity-75">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80"
                alt="Alpine Cedar Chalet"
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div className="space-y-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md">
                  Completed
                </span>
                <h3 className="text-lg font-bold text-gray-900">Alpine Cedar Chalet</h3>
                <p className="text-xs text-gray-500 font-semibold">Manali, Himachal Pradesh</p>
                <p className="text-xs text-gray-700 font-medium">Jan 12 – Jan 16, 2026</p>
              </div>
            </div>
            <button className="border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-2xl transition">
              Write Review
            </button>
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Saved Properties (❤️)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default function GuestDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading guest dashboard...</div>}>
        <GuestDashboardContent />
      </Suspense>
    </div>
  );
}
