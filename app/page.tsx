import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import LawyerCard from "@/components/LawyerCard";
import { mockLawyers, legalAreas, testimonials } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const featuredLawyers = mockLawyers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find the Right Lawyer for Your Legal Needs
            </h1>
            <p className="text-xl md:text-2xl text-navy-100 mb-12 leading-relaxed">
              Connect with verified, experienced lawyers in your area. Get
              expert legal advice and representation you can trust.
            </p>

            {/* Search Bar */}
            <SearchBar className="max-w-4xl mx-auto" />

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-400">1000+</div>
                <div className="text-navy-200">Verified Lawyers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">50+</div>
                <div className="text-navy-200">Practice Areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">10k+</div>
                <div className="text-navy-200">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">4.8★</div>
                <div className="text-navy-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Finding the right lawyer has never been easier. Follow these
              simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-navy-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Search & Filter
              </h3>
              <p className="text-gray-600">
                Use our advanced search to find lawyers by practice area,
                location, and other criteria that matter to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-navy-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Review Profiles
              </h3>
              <p className="text-gray-600">
                Browse detailed lawyer profiles with reviews, experience,
                education, and verified credentials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-navy-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Connect & Consult
              </h3>
              <p className="text-gray-600">
                Book a consultation directly through our platform and get the
                legal help you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Legal Practice Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find specialized lawyers across all major areas of law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalAreas.map((area) => (
              <Link
                key={area.id}
                href={`/browse?area=${area.id}`}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-navy-200 transition-colors">
                    <i className={`${area.icon} text-navy-600 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {area.name}
                  </h3>
                </div>
                <p className="text-gray-600">{area.description}</p>
                <div className="mt-4 text-navy-600 font-medium group-hover:text-navy-700">
                  Find {area.name} Lawyers →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Lawyers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet some of our top-rated legal professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.name} lawyer={lawyer} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/browse"
              className="inline-flex items-center px-8 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
            >
              View All Lawyers
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
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
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Lawyer?
          </h2>
          <p className="text-xl text-navy-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found the perfect legal
            representation through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Find a Lawyer
            </Link>
            <Link
              href="/register-lawyer"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-navy-900 transition-colors font-medium"
            >
              Join as a Lawyer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
