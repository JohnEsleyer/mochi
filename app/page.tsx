'use client'

import { useState } from "react";


export interface GeneratedText {
  meaning:  string;
  romaji:   string;
  furigana: string;
  examples: { [key: string]: string };
}

export default function Home() {
  const [responseText, setResponseText] = useState<string>('');


  const handleClick = async () => {
    const text = '今日';
    const res = await fetch('/api/japan', {
      method: 'POST',
      body: JSON.stringify({ message: text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const generatedText: GeneratedText = await res.json();
    setResponseText(`${generatedText.meaning} \n ${generatedText.romaji} \n ${generatedText.furigana}`);

    console.log(generatedText);
  }
  return (
    <>
      <div>
        <h1>Trigger API Route</h1>
        <button onClick={handleClick}>Trigger</button>
        <p>Response: {responseText}</p>
      </div>
    </>
  );
}
