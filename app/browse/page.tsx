"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LawyerCard from "@/components/LawyerCard";
import { mockLawyers, legalAreas } from "@/lib/mockData";
import { Lawyer, SearchFilters } from "@/types";

export default function BrowseLawyers() {
  const searchParams = useSearchParams();
  const [lawyers, setLawyers] = useState<Lawyer[]>(mockLawyers);
  const [filters, setFilters] = useState<SearchFilters>({
    legalArea: searchParams.get("area") || "",
    location: searchParams.get("location") || "",
    minRating: 0,
    maxRate: 1000,
    availability: "",
    experience: 0,
  });
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    let filteredLawyers = [...mockLawyers];

    // Apply filters
    if (filters.legalArea) {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.practiceAreas.some(
          (area) =>
            area.toLowerCase().includes(filters.legalArea!.toLowerCase()) ||
            legalAreas
              .find((la) => la.id === filters.legalArea)
              ?.name.toLowerCase()
              .includes(area.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minRating > 0) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.rating >= filters.minRating!
      );
    }

    if (filters.maxRate < 1000) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.hourlyRate <= filters.maxRate!
      );
    }

    if (filters.availability) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.availability === filters.availability
      );
    }

    if (filters.experience > 0) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.experience >= filters.experience!
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filteredLawyers.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        filteredLawyers.sort((a, b) => b.experience - a.experience);
        break;
      case "rate-low":
        filteredLawyers.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "rate-high":
        filteredLawyers.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "reviews":
        filteredLawyers.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setLawyers(filteredLawyers);
  }, [filters, sortBy]);

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      legalArea: "",
      location: "",
      minRating: 0,
      maxRate: 1000,
      availability: "",
      experience: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Lawyers
          </h1>
          <p className="text-xl text-navy-100">
            Find the perfect lawyer for your legal needs from our verified
            professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-navy-600 hover:text-navy-700"
                >
                  Clear All
                </button>
              </div>

              {/* Legal Area Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Area
                </label>
                <select
                  value={filters.legalArea}
                  onChange={(e) =>
                    handleFilterChange("legalArea", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value="">All Areas</option>
                  {legalAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    handleFilterChange("minRating", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>

              {/* Rate Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Hourly Rate
                </label>
                <select
                  value={filters.maxRate}
                  onChange={(e) =>
                    handleFilterChange("maxRate", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value={1000}>Any Rate</option>
                  <option value={200}>Under $200/hr</option>
                  <option value={300}>Under $300/hr</option>
                  <option value={400}>Under $400/hr</option>
                  <option value={500}>Under $500/hr</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) =>
                    handleFilterChange("availability", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value="">Any Availability</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Experience
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) =>
                    handleFilterChange("experience", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value={0}>Any Experience</option>
                  <option value={5}>5+ Years</option>
                  <option value={10}>10+ Years</option>
                  <option value={15}>15+ Years</option>
                  <option value={20}>20+ Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {lawyers.length} Lawyers Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing results based on your criteria
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="rate-low">Lowest Rate</option>
                  <option value="rate-high">Highest Rate</option>
                </select>
              </div>
            </div>

            {/* Lawyers Grid */}
            {lawyers.length > 0 ? (
              <div className="space-y-6">
                {lawyers.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No lawyers found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
