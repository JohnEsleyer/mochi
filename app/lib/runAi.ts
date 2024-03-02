import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import filterJapanese from "./filterJapanese";
import removeCodeBlock from "./removeCodeBlock";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY || '';

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
    console.log("Filtered Japanese:" + JSON.stringify(allKanji));
    const parts = [
      { text: `Given a Japanese text: "${text}"
      Give the following JSON (if the given word is gibberish or non-japanese give a single $ sign instead instead):
      {
      "meaning": "The meaning of the text",
      "romaji": "The romaji equivalent of the text",
      "furigana": "The furigana version of the text",
      "context": "Where and when does the text used during conversation?"
      "words": {
        "1": {
          "word": "word (In Japanese)",
          "romaji": "romaji version of the word",
          "class": "strictly choose among the four: (noun, verb, adjective, particle, conjunction, interjection, counter, pronoun, adverb)",
          "meaning": "meaning of the word or how to use the word, if it is particle then how to use the particle?",
          "context": "When and where the word is used? how a particular word is used in a given situation or environment"
        },
      },
      }
      ` },
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    // const parts2 = [
    //   { text: `Given the following JSON response text: "${result.response.text()}"

    //   Check if it matches the following criteria (if not give the proper one): 
    //   Give the following JSON (if the given word is gibberish or non-japanese give a single $ sign instead instead):
    //   {
    //   "meaning": "The meaning of the text",
    //   "romaji": "The romaji equivalent of the text",
    //   "furigana": "The furigana version of the text",
    //   "context": "Where and when does the text used during conversation?"
    //   "words": {
    //     "1": {
    //       "word": "word (In Japanese)",
    //       "romaji": "romaji version of the word",
    //       "category": "is it noun? verb? particle?, etc?",
    //       "meaning": "meaning of the word or how to use the word, if it is particle then how to use the particle?",
    //       "context": "When and where the word is used? how a particular word is used in a given situation or environment"
    //     },
    //   },
    //   }
    //   ` },
    // ];

    // const result2 = await model.generateContent({
    //   contents: [{ role: "user", parts: parts2 }],
    //   generationConfig,
    //   safetySettings,
    // });

  
    const response = result.response;
    console.log(removeCodeBlock(response.text()));
    return removeCodeBlock(response.text());
  }