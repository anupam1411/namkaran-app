"use client";
import { useSearchParams } from "next/navigation";

export default function NameList() {
  const searchParams = useSearchParams();
  const names = JSON.parse(searchParams.get("names"));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generated Names</h1>
      <ul className="list-disc pl-5">
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
