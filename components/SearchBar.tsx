'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { legalAreas } from '@/lib/mockData';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const [legalArea, setLegalArea] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (legalArea) params.set('area', legalArea);
    if (location) params.set('location', location);
    
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Legal Area Select */}
        <div>
          <label htmlFor="legal-area" className="block text-sm font-medium text-gray-700 mb-2">
            Legal Area
          </label>
          <select
            id="legal-area"
            value={legalArea}
            onChange={(e) => setLegalArea(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white"
          >
            <option value="">Select Legal Area</option>
            {legalAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Lawyers</span>
          </button>
        </div>
      </div>
    </form>
  );
}