'use client'

import React from "react";
import { ChangeEvent, useState } from "react";

export interface GeneratedText {
  meaning: string;
  romaji: string;
  furigana: string;
  context: string;
  kanji: { [key: string]: { kanji: string, meaning: string } };
}


export default function Home() {
  const defaultData = {
    meaning: '',
    romaji: '',
    furigana: '',
    context: '',
    kanji: {
      '': {
        kanji: '',
        meaning: '',
      },
    },
  };
  const [responseGeneratedText, setGeneratedText] = useState<GeneratedText>(defaultData);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
  
    const res = await fetch('/api/japan', {
      method: 'POST',
      body: JSON.stringify({ message: inputValue}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const generatedText: GeneratedText = await res.json();
    setGeneratedText(generatedText);

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
  <div className="max-w-md p-6 rounded-lg shadow-lg bg-gray-800">
    <h1 className="text-4xl font-bold mb-4">Mochi</h1>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Type word or phrase"
      className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
    />
    <button
      onClick={handleClick}
      className="w-full p-2 mb-4 rounded bg-blue-500 hover:bg-blue-600 transition duration-300"
    >
      Trigger
    </button>
    <h3 className="text-xl font-semibold mb-2"></h3>
   
    <ul className="list-disc pl-6">
      <li className="mb-2">Meaning: {responseGeneratedText.meaning}</li>
      <li className="mb-2">Romaji: {responseGeneratedText.romaji}</li>
      <li className="mb-2">Furigana: {responseGeneratedText.furigana}</li>
      <li className="mb-2">Context: {responseGeneratedText.context}</li>

      {Object.keys(responseGeneratedText.kanji).map((key) => (
        <React.Fragment key={key}>
          <li className="mb-2">{responseGeneratedText.kanji[key].kanji}</li>
          <li className="mb-2">{responseGeneratedText.kanji[key].meaning}</li>
        </React.Fragment>
      ))}
    </ul>
  </div>
</div>

    </>
  );
}
