// components/NamkaranForm.jsx
"use client";
import "@/public/lib/leafletConfig";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet";
import MapComponent from "@/components/MapComponent";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialCenter = [20.5937, 78.9629]; // Initial center of the map (India)

export default function NamkaranForm() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});

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
    setSelectedPosition(position);
    setValue("latitude", position.lat);
    setValue("longitude", position.lng);
    reverseGeocode(position.lat, position.lng);
  };

  const onSubmit = async (data) => {
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
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Namkaran Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Child Information */}
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Child&#8217;s Date of Birth:
          </label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Child&#8217;s Time of Birth:
          </label>
          <input
            type="time"
            {...register("timeOfBirth", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Map for Birth Place */}
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
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
          <input type="hidden" {...register("latitude", { required: true })} />
          <input type="hidden" {...register("longitude", { required: true })} />
        </div>

        {/* Location Details */}
        <div>
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            Location Details
          </h2>
          <p className="text-sm sm:text-base">
            <strong>Latitude:</strong> {selectedPosition?.lat || "N/A"}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Longitude:</strong> {selectedPosition?.lng || "N/A"}
          </p>
          <p className="text-sm sm:text-base">
            <strong>City:</strong> {locationDetails.city || "N/A"}
          </p>
          <p className="text-sm sm:text-base">
            <strong>State:</strong> {locationDetails.state || "N/A"}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Country:</strong> {locationDetails.country || "N/A"}
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Gender:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Male"
                {...register("gender", { required: true })}
                className="text-blue-500"
              />
              <span className="text-sm sm:text-base">Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Female"
                {...register("gender", { required: true })}
                className="text-blue-500"
              />
              <span className="text-sm sm:text-base">Female</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Other"
                {...register("gender", { required: true })}
                className="text-blue-500"
              />
              <span className="text-sm sm:text-base">Other</span>
            </label>
          </div>
        </div>

        {/* Parent Information */}
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Mother&#8217;s Name:
          </label>
          <input
            type="text"
            {...register("motherName", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Father&#8217;s Name:
          </label>
          <input
            type="text"
            {...register("fatherName", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Contact Number:
          </label>
          <input
            type="tel"
            {...register("contactNumber", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Email Address:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Preferences for Naming */}
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Are there any cultural or religious considerations for the name?
            (e.g., Hindu, Muslim, Christian, etc.)
          </label>
          <textarea
            {...register("culturalConsiderations")}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            Preferred Starting Letter (if any):
          </label>
          <input
            type="text"
            {...register("preferredStartingLetter")}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Consent */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("consent", { required: true })}
            className="w-4 h-4 border-2 rounded-md text-blue-500 focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-sm sm:text-base">
            I consent to using this information to generate a suitable name.
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Generate Name
          </button>
        </div>
      </form>
    </div>
  );
}
