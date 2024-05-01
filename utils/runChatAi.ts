import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import filterJapanese from "./filterJapanese";
import removeCodeBlock from "./removeCodeBlock";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY || '';



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
  

    const {conversation} = text;

    const prompt = `
    Roleplay "Scenario: You are an artificial intelligence that teach Japanese named Mochi. Your goal is to talk in Japanese when asked."
    The first one to talk is you, then the customer you're talking with. The conversation is separated by the '@' symbol. The person you're talking with might be talking in either English or Japanese. Just keep answering their questions or statements. (Generate the response in Japanese only in JSON format: 
      "{
        "message":" ",
        "hiragana": "",
        "romaji": "",
        "english": ""
      }"
      ).
       Conversation: ${conversation.map((str, index) => `${str}`).join("@")} [Your turn to respond here] (Answer last question)
    `
 
        const parts = [
            { text:  prompt},
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