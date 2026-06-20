/**
 * geminiClient.js
 * 
 * Service to interact with the Google Gemini API (gemini-pro).
 * Uses fetch for a lightweight integration.
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


// List of models to try in order of preference/speed
const MODELS = [
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-1.5-flash",
    "gemini-pro"
];

const generateWithModel = async (model, prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    console.log(`Attempting Gemini model: ${model}...`);

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || response.statusText);
    }

    return response.json();
};

export const generateContent = async (prompt) => {
    if (!API_KEY) {
        console.error("Gemini API Key is missing. Check VITE_GEMINI_API_KEY.");
        return "I'm having trouble connecting to my brain (API Key missing). Please tell the developer.";
    }

    let lastError = null;

    for (const model of MODELS) {
        try {
            const data = await generateWithModel(model, prompt);
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || "I couldn't come up with a response right now.";
        } catch (error) {
            console.warn(`Model ${model} failed:`, error.message);
            lastError = error;
            // Continue to next model
        }
    }

    console.error("All Gemini models failed. Last error:", lastError);
    return `I seem to be offline. Error details: ${lastError?.message || "Unknown Connection Error"}`;
};
