import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import filterJapanese from "./filterJapanese";
import removeCodeBlock from "./removeCodeBlock";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.GEMINI_API_KEY || '';

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
      Give the following JSON (if the given text is gibberish or non-japanese give a single $ sign instead instead.). Do not add quotations inside the values of any JSON key-value pair to avoid parsing errors:
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
          "meaning": "english meaning of the japanese text",
          "context": "When and where the word is used? how a particular word is used in a given situation or environment"
        },
      },
      }

      Example: 
      {
        "meaning": "Studying is difficult",
        "romaji": "Benkyou wa taihen desu",
        "furigana": "べんきょうはたいへんです",
        "context": "This phrase is often used by students to express the difficulty of their studies.",
        "words": {
        "1": {
        "word": "勉強",
        "romaji": "benkyou",
        "class": "noun",
        "meaning": "study",
        "context": "This word is used to refer to the act of studying."
      },
        "2": {
        "word": "は",
        "romaji": "wa",
        "class": "particle",
        "meaning": "is",
        "context": "This particle is used to mark the subject of a sentence."
      },
        "3": {
        "word": "大変",
        "romaji": "taihen",
        "class": "adjective",
        "meaning": "difficult",
        "context": "This word is used to describe something that is difficult to do."
      },
        "4": {
        "word": "です",
        "romaji": "desu",
        "class": "verb",
        "meaning": "is",
        "context": "This verb is used to indicate that something is true."
      }
      }
      }
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