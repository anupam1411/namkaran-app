"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

function Page() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate to homepage
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 to-blue-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
        <div className="animate-spin-slow mb-6">
          <CircularProgress />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Page Under Development
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This page is currently being worked on. Check back soon for updates.
        </p>
        <p className="text-sm text-gray-500">
          In the meantime, feel free to browse other parts of the website or
          contact us for more information.
        </p>
        <br />
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-cyan-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition duration-200 ease-in-out"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default Page;
