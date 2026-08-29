'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>('Guest');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      const endpoint =
        tab === 'login'
          ? `${apiUrl}/api/auth/login`
          : `${apiUrl}/api/auth/register`;

      const body =
        tab === 'login'
          ? {
              email,
              password,
            }
          : {
              name,
              email,
              password,
              role,
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Authentication failed.');
        return;
      }

      if (!data.token || !data.user) {
        alert('Authentication succeeded but no session was returned.');
        return;
      }

      login(data.user, data.token);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Unable to connect to the authentication server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-gray-200 flex text-center font-semibold text-sm">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-4 border-b-2 transition ${
              tab === 'login'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-4 border-b-2 transition ${
              tab === 'signup'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            {tab === 'login' ? 'Welcome back to StayNest' : 'Create your StayNest account'}
          </h2>

          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Select Account Role</label>
              <div className="flex gap-6 items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                  <input
                    type="radio"
                    name="userRole"
                    value="Guest"
                    checked={role === 'Guest'}
                    onChange={() => setRole('Guest')}
                    className="accent-brand-500 w-4 h-4"
                  />
                  <span>👤 Guest</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                  <input
                    type="radio"
                    name="userRole"
                    value="Host"
                    checked={role === 'Host'}
                    onChange={() => setRole('Host')}
                    className="accent-brand-500 w-4 h-4"
                  />
                  <span>🏡 Host</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {tab === 'login' ? 'Login' : 'Create account'}
          </button>

          {tab === 'login' && (
            <div className="text-center pt-1">
              <a href="#" className="text-xs text-brand-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
