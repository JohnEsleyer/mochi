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
      body: JSON.stringify({ message: inputValue }),
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
            Analyze
          </button>
          <h3 className="text-xl font-semibold mb-2"></h3>

          <span className="font-bold text-xl mr-4">"{inputValue}"</span>

          <div className="flex items-start justify-start p-2">
            <span className="font-bold text-xl mr-4">Meaning:</span>
            <span className="text-lg">{responseGeneratedText.meaning}</span>
          </div>
          <div className="flex items-start justify-start p-2">
            <span className="font-bold text-xl mr-4">Romaji:</span>
            <span className="text-lg">{responseGeneratedText.romaji}</span>
          </div>
          <div className="flex items-start justify-start p-2">
            <span className="font-bold text-xl mr-4">Furigana:</span>
            <span className="text-lg">{responseGeneratedText.furigana}</span>
          </div>
          <div className="flex items-start justify-start p-2">
            <span className="font-bold text-xl mr-4">Context:</span>
            <span className="text-lg">{responseGeneratedText.context}</span>
          </div>
          <span className="font-bold text-2xl mr-4">Kanji</span>
          {Object.keys(responseGeneratedText.kanji).map((key) => (
            <React.Fragment key={key}>
              <div className="flex items-start justify-start p-2">
                <span className="font-bold text-4xl mr-4">{responseGeneratedText.kanji[key].kanji}</span>
                <span className="text-lg">{responseGeneratedText.kanji[key].meaning}</span>
              </div>

            </React.Fragment>
          ))}

        </div>
      </div>

    </>
  );
}
