"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense

export default function NameList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Add Suspense boundary */}
      <NameListContent />
    </Suspense>
  );
}

function NameListContent() {
  const searchParams = useSearchParams();
  const names = JSON.parse(searchParams.get("names"));

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen py-12">
      <div className="container mx-auto p-6 max-w-3xl bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Generated Names
        </h1>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600">
            We’ve created a list of beautiful names based on your preferences
            and inputs. Feel free to explore them!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {names.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
