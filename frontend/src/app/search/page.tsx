'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import PropertyCard, { PropertyCardProps } from '../../components/home/PropertyCard';
import { SlidersHorizontal, Minus, Plus, RefreshCw, Star, Zap, Award, SearchX, ArrowLeft } from 'lucide-react';

const fallbackMockProperties: PropertyCardProps[] = [
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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const whereQuery = searchParams ? (searchParams.get('where') || '') : '';
  const checkIn = searchParams ? (searchParams.get('checkIn') || '2026-09-10') : '2026-09-10';
  const checkOut = searchParams ? (searchParams.get('checkOut') || '2026-09-14') : '2026-09-14';
  const guests = searchParams ? (searchParams.get('guests') || '2') : '2';

  // Backend Fetched Properties State
  const [dbListings, setDbListings] = useState<PropertyCardProps[]>(fallbackMockProperties);

  // Filters State
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [minRating, setMinRating] = useState<number>(0);
  const [instantBook, setInstantBook] = useState<boolean>(false);
  const [superhostOnly, setSuperhostOnly] = useState<boolean>(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Real REST API Fetch from Backend (/api/listings)
  useEffect(() => {
    async function fetchFromBackend() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (whereQuery) queryParams.append('search', whereQuery);

        const res = await fetch(`http://localhost:5001/api/listings?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setDbListings(json.data);
          } else if (whereQuery.trim()) {
            setDbListings([]);
          }
        }
      } catch (err) {
        // Fallback local match if API offline
        let filtered = [...fallbackMockProperties];
        if (whereQuery.trim()) {
          const q = whereQuery.toLowerCase().trim();
          filtered = filtered.filter(p =>
            p.location.toLowerCase().includes(q) ||
            p.title.toLowerCase().includes(q)
          );
        }
        setDbListings(filtered);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFromBackend();
  }, [whereQuery]);

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

  // Live Client Filter Pipeline on Database Listings
  const filteredProperties = dbListings.filter(p => {
    if (p.pricePerNight > maxPrice) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    if (superhostOnly && !p.isSuperhost) return false;

    if (selectedTypes.length > 0) {
      const matchesType = selectedTypes.some(t =>
        p.title.toLowerCase().includes(t.toLowerCase()) || (p as any).propertyType === t
      );
      if (!matchesType) return false;
    }

    return true;
  });

  return (
    <>
      {/* Search Header Summary Bar */}
      <div className="border-b border-gray-200 bg-gray-50 py-5 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition shadow-sm"
              title="Back to home"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">
                {whereQuery ? `Stays in "${whereQuery}"` : 'All Available Stays'}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-semibold mt-0.5">
                {checkIn} → {checkOut} · {guests} guests
              </p>
            </div>
          </div>

          <span className="text-xs md:text-sm bg-white border border-gray-300 px-4 py-2 rounded-full font-bold text-gray-800 shadow-sm">
            {isLoading ? 'Fetching backend API...' : `${filteredProperties.length} properties found`}
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10 flex-1 w-full flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 bg-white border border-gray-200 rounded-3xl p-6 h-fit shadow-sm space-y-6 divide-y divide-gray-100 shrink-0">
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

          {/* 2. Instant Book & Superhost */}
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

          {/* 4. Rooms & Steppers */}
          <div className="pt-5 space-y-3">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
              Rooms & Capacity
            </label>
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

          {/* 6. Amenities */}
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

        {/* Results Main Area */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="aspect-[4/3] bg-gray-200 rounded-3xl" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                No stays found {whereQuery ? `for "${whereQuery}"` : ''}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Try searching for popular destinations like <strong className="text-gray-800">Goa</strong>, <strong className="text-gray-800">Manali</strong>, <strong className="text-gray-800">Udaipur</strong>, <strong className="text-gray-800">Kerala</strong>, or <strong className="text-gray-800">Coorg</strong>.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => router.push('/search?where=')}
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-sm px-6 py-3 rounded-2xl transition"
                >
                  View All Stays
                </button>
              </div>
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
      <Suspense fallback={
        <div className="max-w-[1440px] mx-auto px-8 py-12 flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fallbackMockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  );
}
