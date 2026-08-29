'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import { ArrowLeft, ArrowRight, Check, Upload, Building, Image as ImageIcon } from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('Villa');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);

  const [pricePerNight, setPricePerNight] = useState(6500);
  const [cleaningFee, setCleaningFee] = useState(1500);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Wi-Fi', 'Pool', 'Kitchen']);

  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
  );

  const amenitiesOptions = ['Wi-Fi', 'Kitchen', 'Pool', 'Parking', 'AC', 'TV'];

  const toggleAmenity = (item: string) => {
    setSelectedAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = () => {
    router.push('/host');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full space-y-6">
        {/* Top Header & Progress Stepper */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Property</h1>
            <p className="text-xs text-gray-500 font-medium">Step {step} of 6</p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`w-8 h-2 rounded-full transition-all ${
                  s <= step ? 'bg-brand-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Form Container */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 1: Basic Information</h2>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Title</label>
                <input
                  type="text"
                  placeholder="e.g. Ocean Breeze Villa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer bg-white"
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Cabin">Cabin</option>
                  <option value="Hotel">Hotel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Arambol, Goa, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your property..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Guests & Capacity */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 2: Guests & Capacity</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Guests</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Beds</label>
                  <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 3: Pricing</h2>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price per night (₹)</label>
                <input
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cleaning fee (₹)</label>
                <input
                  type="number"
                  value={cleaningFee}
                  onChange={(e) => setCleaningFee(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Amenities Checkboxes */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 4: Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {amenitiesOptions.map((item) => (
                  <label key={item} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(item)}
                      onChange={() => toggleAmenity(item)}
                      className="accent-brand-500 w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Photos */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 5: Photos</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Property Image URL</p>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full mt-3 p-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-2xl border border-gray-200"
                />
              )}
            </div>
          )}

          {/* Step 6: Publish Preview */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Step 6: Publish Preview</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2 text-sm text-gray-800">
                <p><strong>Title:</strong> {title || 'Ocean Breeze Villa'}</p>
                <p><strong>Type:</strong> {propertyType}</p>
                <p><strong>Location:</strong> {location || 'Goa, India'}</p>
                <p><strong>Capacity:</strong> {guests} guests · {bedrooms} bedrooms · {beds} beds · {bathrooms} baths</p>
                <p><strong>Nightly Price:</strong> ₹{pricePerNight.toLocaleString('en-IN')}</p>
                <p><strong>Amenities:</strong> {selectedAmenities.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < 6 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl shadow-md flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
              >
                <Check className="w-5 h-5" /> Publish Listing
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
