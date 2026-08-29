'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import CategoryFilter from '../components/home/CategoryFilter';
import PropertyCard, { PropertyCardProps } from '../components/home/PropertyCard';

const mockFallbackProperties: PropertyCardProps[] = [
  {
    id: 'stay-001',
    title: 'Ocean Breeze Villa',
    location: 'Goa',
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [properties, setProperties] = useState<PropertyCardProps[]>(mockFallbackProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'All') queryParams.append('category', activeCategory);

        const res = await fetch(`http://localhost:5001/api/listings?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setProperties(json.data);
          }
        }
      } catch (err) {
        if (activeCategory === 'All') {
          setProperties(mockFallbackProperties);
        } else {
          setProperties(mockFallbackProperties.filter(p => p.title.toLowerCase().includes(activeCategory.toLowerCase())));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Expanded Featured Properties Grid */}
      <section className="max-w-[1440px] mx-auto px-8 py-14 flex-1 w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">
            Featured Stays
          </h2>
          <span className="text-base font-bold text-gray-500">
            Showing {properties.length} unique properties
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24 text-gray-500 font-bold text-lg">
            Loading StayNest homes...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-8 bg-gray-50 text-sm text-gray-500">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 StayNest, Inc. • All rights reserved.</p>
          <div className="flex items-center gap-8 font-bold">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
            <span className="hover:underline cursor-pointer">Company Details</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
