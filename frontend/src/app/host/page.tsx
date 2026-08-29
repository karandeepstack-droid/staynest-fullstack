'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import { Building, Calendar, Users, IndianRupee, Plus, Eye, Edit3, Trash2, TrendingUp } from 'lucide-react';

export default function HostDashboardPage() {
  const hostStats = {
    hostName: 'Rahul',
    propertiesCount: 4,
    reservationsCount: 18,
    guestsCount: 31,
    earnings: 142500
  };

  const monthlyEarnings = [
    { month: 'Jan', amount: '₹42k', height: '60%' },
    { month: 'Feb', amount: '₹51k', height: '75%' },
    { month: 'Mar', amount: '₹68k', height: '90%' },
    { month: 'Apr', amount: '₹74k', height: '100%' },
  ];

  const myProperties = [
    { id: 'stay-001', title: 'Ocean Breeze Villa', location: 'Goa', price: '₹6,500/night', status: 'Published' },
    { id: 'stay-002', title: 'Alpine Cedar Chalet', location: 'Manali', price: '₹8,200/night', status: 'Published' },
    { id: 'stay-003', title: 'Heritage Lakefront Palace', location: 'Udaipur', price: '₹14,500/night', status: 'Published' },
    { id: 'stay-005', title: 'Redwood Glasshouse Canopy', location: 'Coorg', price: '₹7,800/night', status: 'Published' },
  ];

  const reservations = [
    { id: 'res-1', guest: 'Amit', property: 'Ocean Breeze Villa', dates: 'Sep 10–14', status: 'Confirmed' },
    { id: 'res-2', guest: 'Priya', property: 'Mountain Cabin', dates: 'Sep 18–21', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-10">
        {/* Welcome Header & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back, {hostStats.hostName} 👋
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Manage your properties, reservations, and track host earnings.
            </p>
          </div>

          <Link
            href="/host/new"
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </Link>
        </div>

        {/* Section 12: Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Properties</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{hostStats.propertiesCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reservations</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{hostStats.reservationsCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guests</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{hostStats.guestsCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Earnings</p>
              <h3 className="text-2xl font-extrabold text-gray-900">
                ₹{hostStats.earnings.toLocaleString('en-IN')}
              </h3>
            </div>
          </div>
        </div>

        {/* Section 12: Monthly Earnings Chart */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Earnings Chart
            </h2>
            <span className="text-xs text-gray-500 font-semibold">Total: ₹1,42,500</span>
          </div>

          <div className="pt-8 pb-4 px-4 flex items-end justify-between gap-6 h-48 border-b border-gray-100">
            {monthlyEarnings.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-bold text-gray-700">{m.amount}</span>
                <div
                  style={{ height: m.height }}
                  className="w-full max-w-[50px] bg-brand-500 rounded-t-xl hover:bg-brand-600 transition"
                />
                <span className="text-xs font-bold text-gray-500 uppercase">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 13: My Properties Table */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">My Properties</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {myProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 font-bold text-gray-900">{p.title}</td>
                    <td className="py-4 px-4 text-gray-600">{p.location}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{p.price}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/property/${p.id}`} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 15: Host Reservations Table */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Reservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 font-bold text-gray-900">{r.guest}</td>
                    <td className="py-4 px-4 text-gray-700">{r.property}</td>
                    <td className="py-4 px-4 text-gray-600 font-semibold">{r.dates}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                          r.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
