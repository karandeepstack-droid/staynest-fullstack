'use client';

import React from 'react';
import { Star, Heart } from 'lucide-react';

export interface ListingProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hostName: string;
  isSuperhost?: boolean;
}

export default function ListingCard({ listing }: { listing: ListingProps }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-2">
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
        />
        <button className="absolute top-3 right-3 text-white hover:scale-110 transition drop-shadow-md">
          <Heart className="w-6 h-6 stroke-[2] fill-black/20" />
        </button>
        {listing.isSuperhost && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase text-gray-900 shadow">
            Superhost
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-1 flex justify-between items-start">
        <h3 className="font-semibold text-sm text-gray-900 truncate pr-2">
          {listing.location}, {listing.country}
        </h3>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Star className="w-3.5 h-3.5 fill-black text-black" />
          <span>{listing.rating.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-gray-500 text-xs line-clamp-1">{listing.title}</p>
      <p className="text-gray-500 text-xs">Host: {listing.hostName}</p>

      <div className="mt-0.5 text-sm font-semibold">
        ${listing.pricePerNight}{' '}
        <span className="font-normal text-gray-500">night</span>
      </div>
    </div>
  );
}
