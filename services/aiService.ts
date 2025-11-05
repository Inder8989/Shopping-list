import { ShoppingListItem } from '../types';

export const extractIngredientsFromRecipe = async (recipeText: string): Promise<Omit<ShoppingListItem, 'id' | 'purchased'>[]> => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable not set. Please add it to the .env file.");
    }

    const API_URL = "https://api.openai.com/v1/chat/completions";

    const systemPrompt = `You are an expert recipe assistant. Extract the ingredients from the user's recipe text.
    Return them as a valid JSON object with a single key "ingredients" which is an array of objects.
    Each object in the "ingredients" array must have a "name" (string) and "quantity" (string) property.
    If a quantity isn't specified, use "1" as the default.
    Only include ingredients, ignore instructions, cooking times, and other non-ingredient text.
    Ensure the output is only the JSON object and nothing else.`;

    const payload = {
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: recipeText }
        ],
        response_format: { type: "json_object" },
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API error:", errorData);
            throw new Error(`Failed to fetch from OpenAI: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("Received an empty response from the AI.");
        }

        const parsedJson = JSON.parse(content);
        const ingredients = parsedJson.ingredients;

        if (!Array.isArray(ingredients)) {
             throw new Error("AI did not return a valid array of ingredients.");
        }

        // Validate structure of parsed objects
        return ingredients.filter(item => typeof item.name === 'string' && typeof item.quantity === 'string');

    } catch (error) {
        console.error("Error extracting ingredients with OpenAI:", error);
        throw new Error("Failed to parse ingredients from the recipe. Please check the recipe text and try again.");
    }
};