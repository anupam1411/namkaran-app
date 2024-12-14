// pages/landing.jsx

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-indigo-300 to-blue-500">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to the Namkaran App
        </h1>
        <p className="text-lg text-white mb-6">
          A unique way to choose a name for your child based on their birth
          details
        </p>
        <Link href="/Namkaran">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          App Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <Image
              src="/AI.gif"
              alt="Feature 1"
              width={100}
              height={100}
              className="  "
            />
            <h3 className="text-3xl font-semibold text-cyan-900 mt-6">
              Generate Unique Names
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Get personalized name suggestions based on cultural preferences.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <Image
              src="/location.gif"
              alt="Feature 2"
              width={100}
              height={100}
              className="  "
            />
            <h3 className="text-3xl font-semibold text-cyan-900 mt-6">
              Location-based Naming
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Select the birth location on the map to personalize the name.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <Image
              src="/ease.gif"
              alt="Feature 3"
              width={100}
              height={100}
              className="  "
            />
            <h3 className="text-3xl font-semibold text-cyan-900 mt-6">
              Easy to Use
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Enjoy a simple and intuitive interface for a smooth user
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">
              Step 1: Enter Child’s Details
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Provide the child’s date and time of birth.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">
              Step 2: Select Birth Location
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Choose the place of birth on an interactive map.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">
              Step 3: Get Name Suggestions
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-sm">
              Receive a list of suggested names based on the details provided.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2024 Namkaran App. All rights reserved.</p>
        <div className="mt-4">
          <Link
            href="/UnderDevelopment"
            className="text-gray-400 hover:text-white mx-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="/UnderDevelopment"
            className="text-gray-400 hover:text-white mx-4"
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
