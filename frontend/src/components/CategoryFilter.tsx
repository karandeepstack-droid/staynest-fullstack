'use client';

import React from 'react';
import { Waves, Trees, Building2, Palmtree, Flame, Castle } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const categories = [
  { id: 'All', label: 'All Stays', icon: Flame },
  { id: 'Amazing Pools', label: 'Amazing Pools', icon: Waves },
  { id: 'Cabins', label: 'Cabins', icon: Trees },
  { id: 'Iconic Cities', label: 'Iconic Cities', icon: Building2 },
  { id: 'Treehouses', label: 'Treehouses', icon: Palmtree },
  { id: 'Mansions', label: 'Mansions', icon: Castle },
];

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-[73px] z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 pb-2 border-b-2 font-medium text-xs whitespace-nowrap transition ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
