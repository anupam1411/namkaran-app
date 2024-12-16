// components/NamkaranForm.jsx
"use client";
import "@/public/lib/leafletConfig";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// import MapComponent from "@/components/MapComponent";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});
const initialCenter = [20.5937, 78.9629]; // Initial center of the map (India)

export default function NamkaranForm() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formSubmitted, setFormSubmitted] = useState(false); // Track submission state
  const reloadRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && reloadRef.current) {
      window.location.reload();
      reloadRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Trigger the reload after some condition or delay
    reloadRef.current = true;
  }, []);
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      setLocationDetails({
        city:
          data.address.city || data.address.town || data.address.village || "",
        state: data.address.state || "",
        country: data.address.country || "",
      });
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const onMapClick = (position) => {
    if (formSubmitted) return;
    setSelectedPosition(position);
    setValue("latitude", position.lat);
    setValue("longitude", position.lng);
    reverseGeocode(position.lat, position.lng);
  };

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading to true when submitting
    setFormSubmitted(true); // Mark form as submitted
    try {
      const response = await axios.post("/api/generate-names", {
        ...data,
        city: locationDetails.city,
        state: locationDetails.state,
        country: locationDetails.country,
      });

      if (response.status === 200) {
        const generatedNames = response.data.names;
        console.log("Generated Names:", generatedNames);
        router.push(
          `/NameList?names=${encodeURIComponent(
            JSON.stringify(generatedNames)
          )}`
        );
      } else {
        console.error("Failed to generate names.");
      }
    } catch (error) {
      console.error("Error generating names:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the API call finishes
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen py-12">
      <div className="container mx-auto px-6 py-8 max-w-3xl bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Namkaran Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Child Information */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Child&#8217;s Date of Birth:
            </label>
            <input
              disabled={formSubmitted}
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Child&#8217;s Time of Birth:
            </label>
            <input
              disabled={formSubmitted}
              type="time"
              {...register("timeOfBirth", { required: true })}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Map for Birth Place */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Child&#8217;s Place of Birth (Select on Map):
            </label>
            <MapContainer
              style={{ height: "300px", width: "100%" }}
              center={initialCenter}
              zoom={5}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapComponent onMapClick={onMapClick} />
              {selectedPosition && (
                <Marker position={selectedPosition}>
                  <Popup>
                    Latitude: {selectedPosition.lat} <br />
                    Longitude: {selectedPosition.lng}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
            <input
              disabled={formSubmitted}
              type="hidden"
              {...register("latitude", { required: true })}
            />
            <input
              disabled={formSubmitted}
              type="hidden"
              {...register("longitude", { required: true })}
            />
          </div>

          {/* Location Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Location Details
            </h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <strong>Latitude:</strong> {selectedPosition?.lat || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Longitude:</strong> {selectedPosition?.lng || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>City:</strong> {locationDetails.city || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>State:</strong> {locationDetails.state || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Country:</strong> {locationDetails.country || "N/A"}
              </p>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Gender:
            </label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2">
                <input
                  disabled={formSubmitted}
                  type="radio"
                  value="Male"
                  {...register("gender", { required: true })}
                  className="text-blue-500"
                />
                <span className="text-base">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  disabled={formSubmitted}
                  type="radio"
                  value="Female"
                  {...register("gender", { required: true })}
                  className="text-blue-500"
                />
                <span className="text-base">Female</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  disabled={formSubmitted}
                  type="radio"
                  value="Other"
                  {...register("gender", { required: true })}
                  className="text-blue-500"
                />
                <span className="text-base">Other</span>
              </label>
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Mother&#8217;s Name:
            </label>
            <input
              disabled={formSubmitted}
              type="text"
              {...register("motherName", { required: true })}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Father&#8217;s Name:
            </label>
            <input
              disabled={formSubmitted}
              type="text"
              {...register("fatherName", { required: true })}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Contact Number:
          </label>
          <input disabled={formSubmitted}
            type="tel"
            {...register("contactNumber", { required: true })}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div> */}

          {/* <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email Address:
          </label>
          <input disabled={formSubmitted}
            type="email"
            {...register("email", { required: true })}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div> */}

          {/* Preferences for Naming */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Please specify the religion and cultural tradition of the parents
              if any or any preffered meanings of the name:
            </label>
            <textarea
              disabled={formSubmitted}
              {...register("culturalConsiderations")}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Preferred Starting Letter (if any):
            </label>
            <input
              maxLength={1}
              disabled={formSubmitted}
              type="text"
              {...register("preferredStartingLetter")}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Consent */}
          <div className="flex items-center space-x-4">
            <input
              disabled={formSubmitted}
              type="checkbox"
              {...register("consent", { required: true })}
              className="w-5 h-5 border-2 rounded-md text-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <label className="text-base text-gray-600">
              I consent to using this information to generate a suitable name.
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || formSubmitted}
              className={`w-full py-4 px-8 bg-blue-500 text-white rounded-md focus:outline-none ${
                isLoading || formSubmitted
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isLoading ? "Generating..." : "Generate Name"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
