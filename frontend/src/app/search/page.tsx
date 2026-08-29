'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import PropertyCard, { PropertyCardProps } from '../../components/home/PropertyCard';
import { SlidersHorizontal, Minus, Plus, RefreshCw } from 'lucide-react';

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
  }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const where = searchParams.get('where') || 'Goa';
  const checkIn = searchParams.get('checkIn') || '2026-09-10';
  const checkOut = searchParams.get('checkOut') || '2026-09-14';
  const guests = searchParams.get('guests') || '2';

  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Villa']);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Wi-Fi', 'Pool']);

  const propertyTypes = ['Villa', 'Apartment', 'House', 'Cabin', 'Hotel'];
  const amenitiesList = ['Wi-Fi', 'Pool', 'Kitchen', 'Parking', 'Air conditioning'];

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

  const filteredProperties = allSearchMockProperties.filter(p => p.pricePerNight <= maxPrice);

  return (
    <>
      <div className="border-b border-gray-200 bg-gray-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Stays in {where || 'Destinations'}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {checkIn} → {checkOut} · {guests} guests
            </p>
          </div>
          <span className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded-full font-semibold text-gray-700 shadow-sm">
            {filteredProperties.length} properties found
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 bg-white border border-gray-200 rounded-3xl p-6 h-fit shadow-sm space-y-6 shrink-0">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              Filters
            </h2>
            <button
              onClick={() => {
                setMaxPrice(20000);
                setSelectedTypes([]);
                setBedrooms(1);
                setSelectedAmenities([]);
              }}
              className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Price Range
            </label>
            <input
              type="range"
              min="1000"
              max="25000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-semibold text-gray-600 mt-2">
              <span>₹0</span>
              <span className="text-brand-600 font-bold">Up to ₹{maxPrice.toLocaleString('en-IN')}+</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Property Type
            </label>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
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

          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Bedrooms
            </label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
              <span className="text-sm text-gray-700 font-medium pl-2">Bedrooms count</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-700"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-sm text-gray-900 w-4 text-center">{bedrooms}</span>
                <button
                  onClick={() => setBedrooms(bedrooms + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-700"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Amenities
            </label>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
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

        <main className="flex-1">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">No properties match your filters</h3>
              <p className="text-sm text-gray-500 mt-1">Try expanding your price range or clearing property types.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading search results...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
