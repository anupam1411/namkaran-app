"use client";
import React, { useState } from "react";
// import axios from "axios";
import { useMapEvents } from "react-leaflet";

function MapComponent({ onMapClick }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onMapClick({ lat, lng });
    },
  });

  return null;
}

export default MapComponent;
