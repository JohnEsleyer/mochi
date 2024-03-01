'use client'

import React from "react";
import { ChangeEvent, useState } from "react";
import Image from 'next/image';

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [didUpdate, setDidUpdate] = useState<boolean>(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {


    setIsVisible(false);
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    setIsVisible(false);
    setIsLoading(true);
    const res = await fetch('/api/japan', {
      method: 'POST',
      body: JSON.stringify({ message: inputValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const generatedText: GeneratedText = await res.json();
    setGeneratedText(generatedText);
    setIsLoading(false);
    setIsVisible(true);

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
        <div className={`${isLoading ? "shimmer-effect" : ""} max-w-md p-6 rounded-lg m-16 shadow-lg w-4/5 bg-gray-800`}>
        <div className="flex items-center justify-center">
        <Image src="/mochi.png" width={100} height={100} alt="mochi"/>
          <div className="flex items-center grid">
          <h1 className="text-4xl font-bold mt-4"><span className="text-yellow-500">M</span><span className="text-pink-500">o</span><span className="text-green-500">c</span>h<span className="text-orange-500">i</span></h1>
          <span className="text-sm">Japanese AI Text Analyzer</span>
          {/* <span className="text-xs">Made by <a className="text-orange-300"href="https://www.github.com/johnesleyer">@JohnEsleyer</a></span> */}
          </div>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type word or phrase"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          
          {isLoading ? <p></p> : <button
          
          onClick={handleClick}
          className="w-full p-2 mb-4 rounded text-black bg-orange-200 transition duration-300"
        >
          Analyze Text
        </button>}
          
          <h3 className="text-xl font-semibold mb-2"></h3>


          <div className={`transition-opacity transition-height duration-500 ease-in-out overflow-hidden ${
          isVisible ? 'opacity-100 max-h-full' : `${isLoading ? 'opacity-0 max-h-full' : 'opacity-0 max-h-0'}`
        }`}>
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
      </div>

    </>
  );
}
