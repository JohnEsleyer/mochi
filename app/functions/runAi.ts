import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import filterJapanese from "./filterJapanese";
import removeCodeBlock from "./removeCodeBlock";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCYa3-6mEBS4qJ-FYA24ruXHaiXYj1t4iQ";

export default async function runAi(text: string) {
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
  
    const allKanji = filterJapanese(text);
    console.log("All Kanji" + JSON.stringify(allKanji));
    const parts = [
      { text: `Given a Japanese text "${text}"
      Give the following JSON:
      {
      "meaning": "The meaning of the text",
      "romaji": "The romaji equivalent of the text",
      "furigana": "The furigana version of the text",
      "context": "Where and when does the text used during conversation?"
      "words": {
        "1": {
          "word": "word",
          "meaning": "meaning of the word or how to use the word, if it is particle then how to use the particle?"
        },
      },
      }` },
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