import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Translates text using Gemini.
 */
export const translateText = async (
  text: string, 
  targetLanguage: string, 
  context: string = 'neutral'
): Promise<string> => {
  if (!text || !text.trim()) return '';

  try {
    const prompt = `
      You are a professional translator and writing assistant. 
      Task: Translate the following text into ${targetLanguage}.
      Tone/Context: ${context}.
      
      Rules:
      1. Only output the translated text. 
      2. Do not include introductory phrases like "Here is the translation".
      3. Maintain the original formatting if possible.
      
      Text to translate:
      "${text}"
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Translation error:", error);
    return "Error: Could not translate text. Please check your connection or API key.";
  }
};

/**
 * Refines or rewrites text for the writing assistant.
 */
export const refineText = async (
  text: string,
  instruction: string
): Promise<string> => {
   if (!text || !text.trim()) return '';

   try {
    const prompt = `
      You are a professional writing editor.
      Task: Rewrite the following text based on this instruction: "${instruction}".
      
      Rules:
      1. Only output the rewritten text.
      
      Original Text:
      "${text}"
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text.trim();
   } catch (error) {
     console.error("Refine error:", error);
     return text; // Return original on error
   }
}
