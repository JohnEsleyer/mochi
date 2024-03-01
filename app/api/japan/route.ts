const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

import runAi from "@/app/functions/runAi";



export interface GeneratedText {
  meaning: string;
  romaji: string;
  furigana: string;
  context: string;
  words: { [key: string]: { 
    word: string, 
    romaji: string, 
    category: string, 
    meaning: string, 
    context: string
  } 
};
}


export async function POST(request: Request) {
    const {message} = await request.json();
    const maxAttempts = 5; // Set the maximum number of attempts

    let attempt = 1;
    let jsonObject;
    
    while (attempt <= maxAttempts) {
      try {
        jsonObject = JSON.parse(await runAi(message));
        // If parsing is successful, break out of the loop
        break;
      } catch (error) {
        console.error(`Error parsing JSON (Attempt ${attempt})`);
        attempt++;
        // Add a 1-second delay before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (attempt > maxAttempts) {
      console.error(`Failed to parse JSON after ${maxAttempts} attempts. Check the JSON format.`);
      return Response.json({
        status: "Failed",
      });
    } else {
      // Use the parsed jsonObject as needed
      console.log("Successfully parsed JSON:", jsonObject);
    }
      
    return Response.json(jsonObject);
}
