import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { WatchColors } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateThemeFromPrompt = async (prompt: string): Promise<WatchColors> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a color palette for a Casio AE-1200 watch face modification based on this theme: "${prompt}".
      
      The watch has 5 specific zones to color:
      1. Dial (Top Left Analog clock filter)
      2. Indicator (Top Right status filter)
      3. Map (Middle Right world map filter)
      4. Lower (Bottom main time display filter)
      5. Strap (The physical watch band color)
      
      Return 5 hex color codes that fit the vibe. 
      - For "Cyberpunk", think neon filters with a dark or purple strap.
      - For "Stealth", think dark green/grey filters with an olive drab strap.
      - For "Luxury", think gold filters with a leather-colored or black strap.
      
      Ensure the LCD filter colors (dial, indicator, map, lower) are vibrant enough to look good as backlight filters. The strap color should be opaque.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dial: { type: Type.STRING, description: "Hex code for the analog dial filter" },
            indicator: { type: Type.STRING, description: "Hex code for the indicator filter" },
            map: { type: Type.STRING, description: "Hex code for the map filter" },
            lower: { type: Type.STRING, description: "Hex code for the lower main display filter" },
            strap: { type: Type.STRING, description: "Hex code for the watch strap/band" }
          },
          required: ["dial", "indicator", "map", "lower", "strap"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as WatchColors;
  } catch (error) {
    console.error("Error generating theme:", error);
    // Fallback to a default if error
    return {
      dial: "#84cc16",
      indicator: "#ef4444",
      map: "#3b82f6",
      lower: "#eab308",
      strap: "#1f2937"
    };
  }
};