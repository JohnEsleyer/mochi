
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

import runAi from "@/utils/runChatAi";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export const runtime = "edge"

export async function POST(request: Request) {
  const { message, access_token } = await request.json();
  const { data: { user } } = await supabase.auth.getUser(access_token);
  console.log("Access Token:" + access_token);
  
  if (!user){
   
    console.log("Failed");
    return NextResponse.json({
      status: 500,
      body: ""
    });
  }else{
    console.log("Success");
    const maxAttempts = 1; // Set the maximum number of attempts
    


    console.log("Received Requests:" + JSON.stringify(message));
    let attempt = 1;
    let jsonObject;
    
    while (attempt <= maxAttempts) {
      try {
        jsonObject = JSON.parse(await runAi(message));
        console.log(jsonObject.text);
        // If parsing is successful, break out of the loop
        break;
      } catch (error) {
        console.error(`Error parsing JSON (Attempt ${attempt}) ${error}`);
        attempt++;
        // Add a 1-second delay before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (attempt > maxAttempts) {
      console.error(`Failed to parse JSON after ${maxAttempts} attempts. Check the JSON format.`);
      
      return Response.json({
        status: 500,
        body: {
          
        },
      });
    } else {
      // Use the parsed jsonObject as needed
      console.log("Successfully parsed JSON:", jsonObject);
    }
      
    return NextResponse.json({
      status: 200,
      body: jsonObject
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      }
    }
      );
  }
    
}
