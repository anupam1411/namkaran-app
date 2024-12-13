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
    - Cultural/Religious Considerations: ${culturalConsiderations}
    - Preferred Starting Letter: ${preferredStartingLetter}
    - Desired Meaning: ${desiredMeaning}
  
    RULES:
      - Please generate a list of 15-20 suitable names along with their meanings based on the above information.
      - DO NOT FORGET TO UTILIZE INFORMATION LIKE DATE, TIME, LOCATION OF BIRTH, GENDER, and CULTURAL PREFERENCES BECAUSE THEY ARE VERY IMPORTANT.
      - All the names must start with the preferred starting letter.
      - If no cultural or religious considerations are provided (such as "None", "No", or an empty field), infer the likely religion and cultural background based on the parent's names and other details.
      - If the parent's names suggest a specific religion (e.g., common Muslim names like 'Ibrahim' or 'Zeenat', or Hindu names like 'Raj' or 'Anita'), suggest names that align with the inferred religion.
      - The names should be meaningful and appropriate based on the inferred cultural and religious background.
      - Avoid using names from a different religion if it's likely to cause discomfort based on the context of the parent's names or other details.
    
    Ensure that the names and meanings are listed clearly, without any special formatting like bold or italics.
    Format the names and their meanings like this:
      1. Name: Meaning
      2. Name: Meaning
      3. Name: Meaning
      ...
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
