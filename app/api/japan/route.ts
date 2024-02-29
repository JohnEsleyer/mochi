const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
import removeCodeBlock from "@/app/functions/removeCodeBlock";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCYa3-6mEBS4qJ-FYA24ruXHaiXYj1t4iQ";

export interface GeneratedText {
    meaning:  string;
    romaji:   string;
    furigana: string;
    examples: { [key: string]: string };
}
  

async function run(text: string) {
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

  const parts = [
    { text: `Explain the following Japanese word:\"${text}\" The output would be json: {\"meaning\": \"\", \"romaji\":\"\", \"furigana\":\"\", \"examples\": {\"1\": \"\", \"2\": \"\"}} Give 2 example usage` },
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

export async function POST(request: Request) {
    const {message} = await request.json();
    const generatedText = await run(message);
    const jsonObject: GeneratedText = JSON.parse(generatedText)
    return Response.json(jsonObject);
}
