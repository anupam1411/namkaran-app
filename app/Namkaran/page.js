"use client";
import "@/public/lib/leafletConfig";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet";
import MapComponent from "@/components/MapComponent";
// import L from "leaflet";
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
        // alert(`Generated Names: ${generatedNames.join(", ")}`);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Namkaran Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Child Information */}
        <div className="mb-4">
          <label className="block mb-2">Child&#8217;s Date of Birth:</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Child&#8217;s Time of Birth:</label>
          <input
            type="time"
            {...register("timeOfBirth", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Child&#8217;s Place of Birth (Select on Map):
          </label>
          <MapContainer
            style={{ height: "400px", width: "100%" }}
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
        <div className="mb-4">
          <h2 className="text-xl font-bold">Location Details</h2>
          <p>
            <strong>Latitude:</strong> {selectedPosition?.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {selectedPosition?.lng}
          </p>
          <p>
            <strong>City:</strong> {locationDetails.city}
          </p>
          <p>
            <strong>State:</strong> {locationDetails.state}
          </p>
          <p>
            <strong>Country:</strong> {locationDetails.country}
          </p>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="Male"
                {...register("gender", { required: true })}
                className="mr-2"
              />
              Male
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="Female"
                {...register("gender", { required: true })}
                className="mr-2"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                {...register("gender", { required: true })}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        {/* Parent Information */}
        <div className="mb-4">
          <label className="block mb-2">Mother&#8217;s Name:</label>
          <input
            type="text"
            {...register("motherName", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Father&#8217;s Name:</label>
          <input
            type="text"
            {...register("fatherName", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Contact Number:</label>
          <input
            type="tel"
            {...register("contactNumber", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email Address:</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Preferences for Naming */}
        <div className="mb-4">
          <label className="block mb-2">
            Any cultural or religious considerations for the name?
          </label>
          <textarea
            {...register("culturalConsiderations")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Preferred Starting Letter (if any):
          </label>
          <input
            type="text"
            {...register("preferredStartingLetter")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Desired meaning or significance for the name:
          </label>
          <textarea
            {...register("desiredMeaning")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Authorization */}
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              {...register("consent", { required: true })}
              className="mr-2"
            />
            I consent to using this information to generate a suitable name.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Generate Name
          </button>
        </div>
      </form>
    </div>
  );
}
