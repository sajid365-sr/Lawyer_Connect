"use client";

import React, { useState } from "react";
import { ClientDashboardData, Booking, Payment, Lawyer } from "@/types";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ClientDashboard: React.FC = () => {
  const { data } = useSession();

  console.log(data?.user);

  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "payments" | "favorites"
  >("overview");

  // Mock data
  const dashboardData: ClientDashboardData = {
    upcomingBookings: [
      {
        id: "1",
        clientId: "client1",
        lawyerId: "lawyer1",
        date: "2025-08-05",
        time: "10:00",
        duration: 60,
        status: "confirmed",
        type: "consultation",
        notes: "Initial consultation for divorce proceedings",
        meetingLink: "https://meet.example.com/room1",
        totalAmount: 200,
        paymentStatus: "paid",
        createdAt: "2025-08-01T10:00:00Z",
      },
      {
        id: "2",
        clientId: "client1",
        lawyerId: "lawyer2",
        date: "2025-08-08",
        time: "14:00",
        duration: 90,
        status: "pending",
        type: "meeting",
        notes: "Contract review meeting",
        totalAmount: 300,
        paymentStatus: "pending",
        createdAt: "2025-08-02T09:00:00Z",
      },
    ],
    pastBookings: [
      {
        id: "3",
        clientId: "client1",
        lawyerId: "lawyer1",
        date: "2025-07-28",
        time: "15:00",
        duration: 60,
        status: "completed",
        type: "consultation",
        notes: "Legal advice consultation",
        totalAmount: 200,
        paymentStatus: "paid",
        createdAt: "2025-07-25T10:00:00Z",
      },
    ],
    totalSpent: 500,
    favoriteLaywers: [
      {
        id: "lawyer1",
        name: "Sarah Johnson",
        title: "Family Law Attorney",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        rating: 4.9,
        reviewCount: 127,
        experience: 12,
        location: "New York, NY",
        practiceAreas: ["Family Law", "Divorce"],
        bio: "Experienced family law attorney",
        education: ["Harvard Law School"],
        languages: ["English", "Spanish"],
        hourlyRate: 200,
        availability: "Available",
        verified: true,
      },
    ],
    recentPayments: [
      {
        id: "pay1",
        bookingId: "1",
        clientId: "client1",
        lawyerId: "lawyer1",
        amount: 200,
        platformFee: 30,
        lawyerEarnings: 170,
        status: "completed",
        paymentMethod: "card",
        transactionId: "txn_123",
        createdAt: "2025-08-01T10:00:00Z",
        completedAt: "2025-08-01T10:01:00Z",
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b flex justify-between">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Client Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your legal consultations and bookings
            </p>
          </div>
        </div>
        {data?.user && (
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
            alt=""
            width={50}
            height={50}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Upcoming Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.upcomingBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Completed Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.pastBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CreditCardIcon className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData.totalSpent}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <HeartIcon className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Favorite Lawyers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.favoriteLaywers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Overview", icon: CalendarDaysIcon },
                { id: "bookings", name: "My Bookings", icon: CalendarDaysIcon },
                { id: "payments", name: "Payments", icon: CreditCardIcon },
                { id: "favorites", name: "Favorite Lawyers", icon: HeartIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Upcoming Bookings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Bookings
                  </h3>
                  {dashboardData.upcomingBookings.length === 0 ? (
                    <p className="text-gray-500">No upcoming bookings</p>
                  ) : (
                    <div className="space-y-4">
                      {dashboardData.upcomingBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {getStatusIcon(booking.status)}
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    booking.status
                                  )}`}
                                >
                                  {booking.status.charAt(0).toUpperCase() +
                                    booking.status.slice(1)}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900">
                                {booking.type.charAt(0).toUpperCase() +
                                  booking.type.slice(1)}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {booking.notes}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {format(new Date(booking.date), "MMMM d, yyyy")}{" "}
                                at {booking.time} ({booking.duration} min)
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              {booking.meetingLink && (
                                <button
                                  type="button"
                                  title="Join Call"
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                  <VideoCameraIcon className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                type="button"
                                title="Chat with Lawyer"
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                              >
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Payment completed
                        </p>
                        <p className="text-xs text-gray-500">
                          Consultation with Sarah Johnson - $200
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Booking confirmed
                        </p>
                        <p className="text-xs text-gray-500">
                          Meeting scheduled for August 5th
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    All Bookings
                  </h3>
                  <div className="space-y-4">
                    {[
                      ...dashboardData.upcomingBookings,
                      ...dashboardData.pastBookings,
                    ].map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(booking.status)}
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  booking.status
                                )}`}
                              >
                                {booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {booking.type.charAt(0).toUpperCase() +
                                  booking.type.slice(1)}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900">
                              {booking.notes}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {format(new Date(booking.date), "MMMM d, yyyy")}{" "}
                              at {booking.time} ({booking.duration} min)
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-2">
                              ${booking.totalAmount} -{" "}
                              {booking.paymentStatus === "paid"
                                ? "Paid"
                                : "Pending Payment"}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {booking.status === "confirmed" &&
                              booking.meetingLink && (
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                  Join Call
                                </button>
                              )}
                            {booking.status === "pending" && (
                              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentPayments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Booking #{payment.bookingId}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {payment.transactionId}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm font-medium text-gray-900">
                                ${payment.amount}
                              </p>
                              <p className="text-sm text-gray-500">
                                via {payment.paymentMethod}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  payment.status === "completed"
                                    ? "text-green-600 bg-green-100"
                                    : payment.status === "pending"
                                    ? "text-yellow-600 bg-yellow-100"
                                    : "text-red-600 bg-red-100"
                                }`}
                              >
                                {payment.status.charAt(0).toUpperCase() +
                                  payment.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(
                                new Date(payment.createdAt),
                                "MMM d, yyyy"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Favorite Lawyers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardData.favoriteLaywers.map((lawyer) => (
                      <div key={lawyer.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={lawyer.image}
                            alt={lawyer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {lawyer.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {lawyer.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm font-medium">
                              {lawyer.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({lawyer.reviewCount})
                            </span>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
