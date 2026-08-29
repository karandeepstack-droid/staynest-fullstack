'use client';

import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Shield, Users, Building, Calendar, IndianRupee, Ban, CheckCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([
    { id: 'user-01', name: 'Amit Sharma', email: 'amit@example.com', role: 'Guest', status: 'Active' },
    { id: 'user-02', name: 'Rahul', email: 'rahul@staynest.com', role: 'Host', status: 'Active' },
    { id: 'user-03', name: 'Priya Verma', email: 'priya@example.com', role: 'Guest', status: 'Active' },
    { id: 'user-04', name: 'Vikram Singh', email: 'vikram@example.com', role: 'Host', status: 'Active' }
  ]);

  const toggleSuspend = (id: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="p-3 bg-brand-500 text-white rounded-2xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Control Center</h1>
            <p className="text-xs text-gray-500 font-medium">Platform moderation, user controls, and system statistics</p>
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Users</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">{users.length}</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Properties</span>
              <Building className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">5</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Bookings</span>
              <Calendar className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">18</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Platform Rev</span>
              <IndianRupee className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">₹28,500</h3>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">User & Host Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 font-bold text-gray-900">{u.name}</td>
                    <td className="py-4 px-4 text-gray-600">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-md">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                          u.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleSuspend(u.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 ml-auto ${
                          u.status === 'Active'
                            ? 'bg-red-50 hover:bg-red-100 text-red-600'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {u.status === 'Active' ? (
                          <>
                            <Ban className="w-3.5 h-3.5" /> Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Activate
                          </>
                        )}
                      </button>
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
