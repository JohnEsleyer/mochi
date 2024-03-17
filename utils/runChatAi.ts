import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import filterJapanese from "./filterJapanese";
import removeCodeBlock from "./removeCodeBlock";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY || '';

interface Conversation{
    isEmpty: boolean,
    conversation: string[],
}

export default async function runAi(text: Conversation) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.2,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    // const allKanji = filterJapanese(text);
    // console.log("Filtered Japanese:" + JSON.stringify(allKanji));
    
    const {isEmpty, conversation} = text;


 
        const parts = [
            { text: `
            Roleplay "Scenario: You are a waiter of a sushi restaurant and your name is Mochi. A customer comes in to order."
            The first one to talk is you, then the user. (Generate the response in JSON format: "{"message":" "}"): ${conversation.map((str, index) => `${str}`).join("\n")} [Your turn to respond here]
            ` },
          ];
          const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
          });
        
          const response = result.response;
          console.log(removeCodeBlock(response.text()));
          return removeCodeBlock(response.text());

  }