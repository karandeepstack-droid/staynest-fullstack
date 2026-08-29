'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import { CheckCircle2, Calendar, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id') || 'SN-839241';

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex-1 w-full">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">
          ✓ Booking confirmed!
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Your reservation has been locked in. We've sent details to your email.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
              alt="Ocean Breeze Villa"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900">Ocean Breeze Villa</h3>
              <p className="text-xs text-gray-500 font-semibold flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Goa, India
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-500" />
              <span>Sep 10 – Sep 14 (4 nights)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-500" />
              <span>2 guests</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium flex items-center gap-1">
              <Ticket className="w-4 h-4 text-gray-400" /> Booking ID
            </span>
            <span className="font-bold text-brand-600 tracking-wider bg-brand-50 px-3 py-1 rounded-md border border-brand-100">
              {bookingId}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/guest"
            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm"
          >
            <span>View Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-3.5 rounded-2xl transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading booking status...</div>}>
        <BookingConfirmationContent />
      </Suspense>
    </div>
  );
}
