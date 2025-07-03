import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual API Key
const api_Key = "AIzaSyBMw21OwibezpEkIMNRfoLRJuthnC0TqK8";
const genAI = new GoogleGenerativeAI(api_Key);

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); //  Switched to flash

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default run;
