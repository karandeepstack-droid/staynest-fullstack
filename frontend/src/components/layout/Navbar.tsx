'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Heart, User as UserIcon, LogOut, ChevronDown, LayoutDashboard, Building, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, openAuthModal, logout, login } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoleSwitch = (role: 'Guest' | 'Host' | 'Admin') => {
    login(
      {
        id: role === 'Host' ? 'user-host-01' : role === 'Admin' ? 'user-admin-01' : 'user-guest-01',
        name: role === 'Host' ? 'Rahul' : role === 'Admin' ? 'Admin User' : 'Amit Sharma',
        email: `demo_${role.toLowerCase()}@staynest.com`,
        role
      },
      'demo-jwt-token-2026'
    );
    if (role === 'Host') router.push('/host');
    else if (role === 'Admin') router.push('/admin');
    else router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 transition-all shadow-sm">
      {/* Top Demo Bar */}
      <div className="bg-gray-900 text-white text-xs py-2.5 px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-gray-200">Freelance Demo Mode • Select role:</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <button
            onClick={() => handleRoleSwitch('Guest')}
            className={`px-3.5 py-1 rounded-full transition ${
              user?.role === 'Guest' ? 'bg-brand-500 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            👤 Guest View
          </button>
          <button
            onClick={() => handleRoleSwitch('Host')}
            className={`px-3.5 py-1 rounded-full transition ${
              user?.role === 'Host' ? 'bg-brand-500 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🏡 Host View
          </button>
          <button
            onClick={() => handleRoleSwitch('Admin')}
            className={`px-3.5 py-1 rounded-full transition ${
              user?.role === 'Admin' ? 'bg-brand-500 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🛡️ Admin View
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="p-2.5 bg-brand-500 rounded-2xl text-white shadow-lg">
            <Home className="w-7 h-7" />
          </div>
          <span className="text-3xl font-black tracking-tight text-brand-500">
            StayNest
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 font-bold text-base text-gray-800">
          <Link href="/" className="hover:text-brand-500 transition">
            Stays
          </Link>
          <Link href="/host" className="hover:text-brand-500 transition">
            Become a Host
          </Link>
          <Link href="/admin" className="hover:text-brand-500 transition flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-gray-500" />
            Admin Panel
          </Link>
        </nav>

        {/* Right Action Menu */}
        <div className="flex items-center gap-5">
          {!user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={openAuthModal}
                className="text-base font-bold px-5 py-2.5 text-gray-800 hover:bg-gray-100 rounded-full transition"
              >
                Login
              </button>
              <button
                onClick={openAuthModal}
                className="text-base font-bold px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition shadow-md"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5 relative">
              {/* Wishlist Link ❤️ */}
              <Link
                href="/guest?tab=wishlist"
                className="p-2.5 text-gray-700 hover:text-brand-500 hover:bg-gray-100 rounded-full transition"
                title="Wishlist"
              >
                <Heart className="w-6 h-6 fill-brand-500 text-brand-500" />
              </Link>

              {/* Profile Dropdown ▼ */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 border-2 border-gray-300 rounded-full px-4 py-2 hover:shadow-lg transition cursor-pointer bg-white"
                >
                  <div className="bg-brand-500 text-white p-1.5 rounded-full">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-bold text-gray-900">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Role</p>
                      <p className="text-base font-extrabold text-brand-600">{user.role}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/guest"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 transition font-bold"
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-500" />
                      Guest Dashboard
                    </Link>

                    <Link
                      href="/host"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 transition font-bold"
                    >
                      <Building className="w-5 h-5 text-gray-500" />
                      Host Dashboard
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 transition font-bold"
                    >
                      <Shield className="w-5 h-5 text-gray-500" />
                      Admin Control Center
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 font-bold"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
