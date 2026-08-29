'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  country: string;
  pricePerNight: number;
  rating: number;
  images: string[];
  isSuperhost?: boolean;
}

export default function PropertyCard({ property }: { property: PropertyCardProps }) {
  const { wishlist, toggleWishlist } = useAuth();
  const isWishlisted = wishlist.includes(property.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  return (
    <Link href={`/property/${property.id}`} className="group cursor-pointer flex flex-col gap-3">
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-md border border-gray-100">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Heart ♡ Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 text-white hover:scale-110 transition drop-shadow-md p-2 rounded-full hover:bg-black/20"
        >
          <Heart
            className={`w-7 h-7 stroke-[2] ${
              isWishlisted ? 'fill-brand-500 text-brand-500' : 'fill-black/30 text-white'
            }`}
          />
        </button>

        {property.isSuperhost && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase text-gray-900 shadow">
            Superhost ✨
          </span>
        )}
      </div>

      {/* Property Details */}
      <div className="mt-1 space-y-1">
        {/* Rating ⭐ */}
        <div className="flex items-center gap-1.5 text-base font-extrabold text-gray-900">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          <span>⭐ {property.rating.toFixed(2)}</span>
        </div>

        {/* Location */}
        <p className="font-extrabold text-gray-900 text-base leading-snug">
          {property.location}, {property.country}
        </p>

        {/* Title */}
        <p className="text-gray-500 text-sm font-medium truncate">
          {property.title}
        </p>

        {/* Price */}
        <div className="pt-1.5 text-lg font-black text-gray-900">
          ₹{property.pricePerNight.toLocaleString('en-IN')}{' '}
          <span className="font-semibold text-gray-500 text-sm">night</span>
        </div>
      </div>
    </Link>
  );
}
