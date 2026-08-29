'use client';

import React from 'react';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const categories = [
  { id: 'All', label: 'All Stays', emoji: '🏠' },
  { id: 'Beach', label: 'Beach', emoji: '🏖️' },
  { id: 'Mountains', label: 'Mountains', emoji: '🏔️' },
  { id: 'Countryside', label: 'Countryside', emoji: '🌲' },
  { id: 'Villas', label: 'Villas', emoji: '🏡' },
  { id: 'Cabins', label: 'Cabins', emoji: '🏕️' },
  { id: 'Luxury', label: 'Luxury', emoji: '✨' },
];

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-[88px] z-40 px-8 py-5 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-12 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 pb-2.5 border-b-2 font-bold text-sm whitespace-nowrap transition duration-200 ${
                isActive
                  ? 'border-brand-500 text-brand-600 scale-110'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="font-extrabold">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
