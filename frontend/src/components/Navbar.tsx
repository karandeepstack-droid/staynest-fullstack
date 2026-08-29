'use client';

import React from 'react';
import { Home, Search, Globe, User, Menu } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 bg-brand-500 rounded-xl text-white">
            <Home className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-500">
            StayNest
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition px-4 py-2 bg-white">
            <input
              type="text"
              placeholder="Search destinations, villas, cabins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-500"
            />
            <button className="p-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition ml-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <button className="hidden md:block py-2 px-4 rounded-full hover:bg-gray-100 transition text-gray-700">
            StayNest your home
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600">
            <Globe className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 border border-gray-300 rounded-full px-3 py-1.5 hover:shadow-md transition cursor-pointer">
            <Menu className="w-4 h-4 text-gray-600" />
            <div className="bg-gray-500 text-white p-1 rounded-full">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
