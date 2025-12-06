import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_IMAGE_MODEL } from '../constants';

/**
 * Creates a new instance of GoogleGenAI using the environment API key.
 * This function should be called right before making an API call to ensure
 * it always uses the most up-to-date API key from the dialog (if applicable).
 */
const getGeminiClient = () => {
  // CRITICAL: The API key must be obtained exclusively from process.env.API_KEY.
  // Do NOT generate any UI elements for entering or managing the API key.
  // The key's availability is handled externally.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates an image using the Gemini API.
 * @param prompt The text description for the image.
 * @returns A base64 encoded image string.
 * @throws Error if image generation fails or no image is returned.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const ai = getGeminiClient(); // Create a new instance right before the call

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_IMAGE_MODEL,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1", // Default to square, can be expanded
          // For gemini-2.5-flash-image, explicit imageSize like 1K/2K/4K is not typically set
          // in the same way as gemini-3-pro-image-preview. The model often infers resolution
          // or has default behavior based on aspect ratio. Removed to prevent potential conflicts.
        },
        // DO NOT set responseMimeType or responseSchema for nano banana series models.
        // DO NOT use the googleSearch tool with image generation models unless explicitly required and tested.
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
      }
    }

    throw new Error('No image data found in the response.');

  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error('An unknown error occurred during image generation.');
  }
};