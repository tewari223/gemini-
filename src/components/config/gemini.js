import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("API key is missing. Ensure VITE_GEMINI_API_KEY is set in your .env file.");
    throw new Error("Missing API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt, history = []) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: history.map((item) => ({
                role: item.role, 
                content: item.content,
            })),
        });

        const result = await chatSession.sendMessage(prompt);

        console.log("API response:", result);

      
        return result.response?.text || "No response text available";
    } catch (error) {
        console.error("Error during API call:", error.message, error.stack);
        return `An error occurred while generating a response: ${error.message}`;
    }
}

export default run;
