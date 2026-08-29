'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [where, setWhere] = useState('');
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-14');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      where,
      checkIn,
      checkOut,
      guests
    });
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-[580px] md:min-h-[640px] flex items-center justify-center px-8 py-20 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
          alt="StayNest Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        {/* Massive Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-lg mb-4 leading-tight">
          Find a place you'll love to stay.
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 font-semibold mb-12 max-w-3xl mx-auto drop-shadow">
          Discover unique homes, villas and getaways around the world.
        </p>

        {/* Large Prominent Search Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-white text-gray-900 rounded-full shadow-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-3 max-w-5xl mx-auto border-2 border-white/40"
        >
          {/* Where */}
          <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-200 text-left">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
              Where
            </label>
            <div className="flex items-center gap-3 mt-1">
              <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
              <input
                type="text"
                placeholder="Search destinations (Goa, Manali...)"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                className="w-full bg-transparent text-base font-bold focus:outline-none placeholder-gray-400 text-gray-900"
              />
            </div>
          </div>

          {/* Check in */}
          <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-200 text-left">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
              Check in
            </label>
            <div className="flex items-center gap-3 mt-1">
              <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-base font-bold focus:outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Check out */}
          <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-200 text-left">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
              Check out
            </label>
            <div className="flex items-center gap-3 mt-1">
              <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-base font-bold focus:outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full px-5 py-3 text-left">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
              Guests
            </label>
            <div className="flex items-center gap-3 mt-1">
              <Users className="w-5 h-5 text-brand-500 shrink-0" />
              <input
                type="number"
                min="1"
                max="16"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-base font-bold focus:outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-brand-500 hover:bg-brand-600 text-white font-black text-lg px-10 py-4.5 rounded-full flex items-center justify-center gap-3 shadow-xl transition duration-200 shrink-0 hover:scale-105"
          >
            <Search className="w-6 h-6" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
