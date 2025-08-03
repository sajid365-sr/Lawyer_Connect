import Link from "next/link";
import Image from "next/image";
import { Lawyer } from "@/types";

interface LawyerCardProps {
  lawyer: Lawyer;
}

export default function LawyerCard({ lawyer }: LawyerCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          {lawyer.verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Lawyer Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {lawyer.name}
              </h3>
              <p className="text-sm text-gray-600">{lawyer.title}</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {lawyer.location}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(
                lawyer.availability
              )}`}
            >
              {lawyer.availability}
            </span>
          </div>

          {/* Rating and Experience */}
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(lawyer.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                {lawyer.rating} ({lawyer.reviewCount} reviews)
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {lawyer.experience} years exp.
            </span>
          </div>

          {/* Practice Areas */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-navy-50 text-navy-700 text-xs rounded-full"
                >
                  {area}
                </span>
              ))}
              {lawyer.practiceAreas.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{lawyer.practiceAreas.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Rate and Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-semibold text-gray-900">
              ${lawyer.hourlyRate}/hr
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/lawyer/${lawyer.id}`}
                className="px-4 py-2 text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors text-sm font-medium"
              >
                View Profile
              </Link>
              <Link
                href={`/booking/${lawyer?.id}`}
                className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors text-sm font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
