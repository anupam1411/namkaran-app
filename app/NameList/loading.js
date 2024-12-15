"use client";
import { CircularProgress } from "@mui/material";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 to-blue-500 p-6">
      <h1 className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center text-2xl">
        LOADING........ <br />
        <br />
        <CircularProgress />
      </h1>
    </div>
  );
}

export default Page;
