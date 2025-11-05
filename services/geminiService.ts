
import { GoogleGenAI, Type } from "@google/genai";
import { ShoppingListItem } from '../types';

export const extractIngredientsFromRecipe = async (recipeText: string): Promise<Omit<ShoppingListItem, 'id' | 'purchased'>[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `You are an expert recipe assistant. Extract the ingredients from the following text.
    Return them as a valid JSON array of objects.
    Each object must have a "name" (string) and "quantity" (string) property.
    If a quantity isn't specified, use "1" as the default.
    Only include ingredients, ignore instructions, cooking times, and other non-ingredient text.
    Ensure the output is only the JSON array and nothing else.

    Recipe:
    ---
    ${recipeText}
    ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: {
                                type: Type.STRING,
                                description: "The name of the ingredient.",
                            },
                            quantity: {
                                type: Type.STRING,
                                description: "The amount of the ingredient, e.g., '1 cup', '2 tbsp', 'a pinch'."
                            }
                        },
                        required: ["name", "quantity"]
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const ingredients = JSON.parse(jsonText);

        if (!Array.isArray(ingredients)) {
             throw new Error("Gemini did not return a valid array.");
        }

        // Validate structure of parsed objects
        return ingredients.filter(item => typeof item.name === 'string' && typeof item.quantity === 'string');

    } catch (error) {
        console.error("Error extracting ingredients with Gemini:", error);
        throw new Error("Failed to parse ingredients from the recipe. Please check the recipe text and try again.");
    }
};
