"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        router.push("/auth/signin");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    return user.role === "LAWYER" ? "/dashboard/lawyer" : "/dashboard/client";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy-900">
              Find Your Lawyer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
            >
              Browse Lawyers
            </Link>
            <Link
              href="/register-lawyer"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
            >
              Join as Lawyer
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          {!loading && (
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={getDashboardLink()}
                    className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-navy-600 font-medium transition-colors"
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    <span>{user.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            title="Mobile Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-navy-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/browse"
                className="text-gray-700 hover:text-navy-600 font-medium"
              >
                Browse Lawyers
              </Link>
              <Link
                href="/register-lawyer"
                className="text-gray-700 hover:text-navy-600 font-medium"
              >
                Join as Lawyer
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-navy-600 font-medium"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-navy-600 font-medium"
              >
                Contact
              </Link>

              {!loading && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <Link
                        href={getDashboardLink()}
                        className="px-4 py-2 text-center text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="px-4 py-2 text-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        className="px-4 py-2 text-center text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="px-4 py-2 text-center bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
