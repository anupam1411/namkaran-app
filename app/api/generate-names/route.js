import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse incoming JSON data

    const {
      dateOfBirth,
      timeOfBirth,
      latitude,
      longitude,
      city,
      state,
      country,
      gender,
      motherName,
      fatherName,
      contactNumber,
      email,
      culturalConsiderations,
      preferredStartingLetter,
      desiredMeaning,
    } = body;

    const prompt = `
      Generate 15-20 names based on the following details:
      - Child's Date of Birth: ${dateOfBirth}
      - Child's Time of Birth: ${timeOfBirth}
      - Place of Birth: ${latitude}, ${longitude}
      - City: ${city}
      - State: ${state}
      - Country: ${country}
      - Gender: ${gender}
      - Mother's Name: ${motherName}
      - Father's Name: ${fatherName}
      - Contact Number: ${contactNumber}
      - Email Address: ${email}
      - Cultural/Religious Considerations: ${culturalConsiderations}
      - Preferred Starting Letter: ${preferredStartingLetter}
      - Desired Meaning: ${desiredMeaning}

      Please generate a list of 15-20 suitable names based on the above information.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ names: text.split("\n") }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating names:", error);
    return new Response(JSON.stringify({ error: "Failed to generate names" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
