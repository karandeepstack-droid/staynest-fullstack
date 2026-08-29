'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import PropertyCard, { PropertyCardProps } from '../../components/home/PropertyCard';
import { SlidersHorizontal, Minus, Plus, RefreshCw, Star, Zap, Award } from 'lucide-react';

const allSearchMockProperties: PropertyCardProps[] = [
  {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    location: 'Arambol, Goa',
    country: 'India',
    pricePerNight: 6500,
    rating: 4.89,
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
    isSuperhost: true
  },
  {
    id: 'stay-002',
    title: 'Alpine Cedar Chalet',
    location: 'Manali, Himachal Pradesh',
    country: 'India',
    pricePerNight: 8200,
    rating: 4.95,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    isSuperhost: true
  },
  {
    id: 'stay-003',
    title: 'Heritage Lakefront Palace',
    location: 'Udaipur, Rajasthan',
    country: 'India',
    pricePerNight: 14500,
    rating: 4.98,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    isSuperhost: true
  },
  {
    id: 'stay-004',
    title: 'Serene Backwater Palm Villa',
    location: 'Alleppey, Kerala',
    country: 'India',
    pricePerNight: 5400,
    rating: 4.91,
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    isSuperhost: false
  },
  {
    id: 'stay-005',
    title: 'Redwood Glasshouse Canopy',
    location: 'Coorg, Karnataka',
    country: 'India',
    pricePerNight: 7800,
    rating: 4.94,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
    isSuperhost: true
  }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const where = searchParams.get('where') || '';
  const checkIn = searchParams.get('checkIn') || '2026-09-10';
  const checkOut = searchParams.get('checkOut') || '2026-09-14';
  const guests = searchParams.get('guests') || '2';

  // Section 6 Filters State
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [minRating, setMinRating] = useState<number>(0);
  const [instantBook, setInstantBook] = useState<boolean>(false);
  const [superhostOnly, setSuperhostOnly] = useState<boolean>(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const propertyTypes = ['Villa', 'Apartment', 'House', 'Cabin', 'Hotel', 'Resort'];
  const amenitiesList = [
    'Wi-Fi',
    'Pool',
    'Kitchen',
    'Parking',
    'Air conditioning',
    'Hot tub',
    'Ocean View',
    'Fireplace',
    'Free Breakfast'
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setMaxPrice(25000);
    setSelectedTypes([]);
    setBedrooms(1);
    setBeds(1);
    setBathrooms(1);
    setMinRating(0);
    setInstantBook(false);
    setSuperhostOnly(false);
    setSelectedAmenities([]);
  };

  // Live Filter logic
  const filteredProperties = allSearchMockProperties.filter(p => {
    if (p.pricePerNight > maxPrice) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    if (superhostOnly && !p.isSuperhost) return false;
    if (selectedTypes.length > 0) {
      const matchesType = selectedTypes.some(t => p.title.toLowerCase().includes(t.toLowerCase()) || (p as any).propertyType === t);
      if (!matchesType && selectedTypes.length > 0 && !selectedTypes.includes('Villa')) return false;
    }
    return true;
  });

  return (
    <>
      {/* Search Header Summary */}
      <div className="border-b border-gray-200 bg-gray-50 py-5 px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Stays in {where || 'All Destinations'}
            </h1>
            <p className="text-sm text-gray-600 font-semibold mt-0.5">
              {checkIn} → {checkOut} · {guests} guests
            </p>
          </div>
          <span className="text-sm bg-white border border-gray-300 px-4 py-2 rounded-full font-bold text-gray-800 shadow-sm">
            {filteredProperties.length} properties available
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-10 flex-1 w-full flex flex-col md:flex-row gap-10">
        {/* Full Section 6 Filters Sidebar */}
        <aside className="w-full md:w-80 bg-white border border-gray-200 rounded-3xl p-6 h-fit shadow-sm space-y-6 shrink-0 divide-y divide-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <h2 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-brand-500" />
              Filters
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-600 font-bold hover:underline flex items-center gap-1 bg-brand-50 px-3 py-1 rounded-full border border-brand-100"
            >
              <RefreshCw className="w-3 h-3" /> Reset all
            </button>
          </div>

          {/* 1. Price Range */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Price Range (per night)
            </label>
            <input
              type="range"
              min="2000"
              max="25000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>₹0</span>
              <span className="text-brand-600 font-black text-sm">Up to ₹{maxPrice.toLocaleString('en-IN')}+</span>
            </div>
          </div>

          {/* 2. Instant Booking & Superhost Toggles */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Booking Features
            </label>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-100 transition">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Instant Book
                </span>
                <input
                  type="checkbox"
                  checked={instantBook}
                  onChange={(e) => setInstantBook(e.target.checked)}
                  className="accent-brand-500 w-4 h-4 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-100 transition">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-500" /> Superhost Only ✨
                </span>
                <input
                  type="checkbox"
                  checked={superhostOnly}
                  onChange={(e) => setSuperhostOnly(e.target.checked)}
                  className="accent-brand-500 w-4 h-4 rounded"
                />
              </label>
            </div>
          </div>

          {/* 3. Property Type */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer p-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="accent-brand-500 rounded w-4 h-4"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Bedrooms, Beds & Bathrooms Steppers */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Rooms & Beds
            </label>
            
            {/* Bedrooms */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-2.5">
              <span className="text-xs text-gray-800 font-bold pl-2">Bedrooms</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-sm text-gray-900 w-4 text-center">{bedrooms}</span>
                <button
                  onClick={() => setBedrooms(bedrooms + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Beds */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-2.5">
              <span className="text-xs text-gray-800 font-bold pl-2">Beds</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBeds(Math.max(1, beds - 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-sm text-gray-900 w-4 text-center">{beds}</span>
                <button
                  onClick={() => setBeds(beds + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-2.5">
              <span className="text-xs text-gray-800 font-bold pl-2">Bathrooms</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-sm text-gray-900 w-4 text-center">{bathrooms}</span>
                <button
                  onClick={() => setBathrooms(bathrooms + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-200 font-bold text-gray-800 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 5. Rating Filter */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center">
              {[0, 4.5, 4.8, 4.9].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`py-2 rounded-xl border transition ${
                    minRating === r
                      ? 'bg-brand-500 text-white border-brand-500 shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {r === 0 ? 'Any' : `⭐ ${r}+`}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Amenities Checklist */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Amenities
            </label>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2.5 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="accent-brand-500 rounded w-4 h-4"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Search Results Grid */}
        <main className="flex-1">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">No properties match your filters</h3>
              <p className="text-sm text-gray-500 mt-2">Try expanding your price range or resetting filters.</p>

              <button
                onClick={handleResetFilters}
                className="mt-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-gray-500 font-bold">Loading StayNest filters...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
