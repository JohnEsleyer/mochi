'use client'

import React from "react";
import { ChangeEvent, useState } from "react";
import Image from 'next/image';

export interface GeneratedText {
  meaning: string;
  romaji: string;
  furigana: string;
  context: string;
  words: { [key: string]: { word: string, meaning: string } };
}


export default function Home() {
  const defaultData = {
    meaning: '',
    romaji: '',
    furigana: '',
    context: '',
    words: {
      '': {
        word: '',
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
        <div className={`${isLoading ? "shimmer-effect" : ""}  p-6 rounded-lg m-12 shadow-lg w-full md:w-auto bg-gray-800`}>
        <div className="flex items-center justify-center">
        <Image src="/mochi.png" width={100} height={100} alt="mochi"/>
          <div className="flex items-center mb-6 grid">
          <h1 className="text-4xl font-bold mt-4"><span className="text-yellow-300">M</span><span className="text-pink-300">o</span><span className="text-green-300">c</span>h<span className="text-orange-300">i</span></h1>
          <span className="text-sm">Analyze Japanese Texts with AI</span>
          <span className="text-xs">Made by <a className="text-orange-300"href="https://www.github.com/johnesleyer">@JohnEsleyer</a></span>
          </div>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type word or phrase"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          {isLoading ? <p></p> : <button
          
          onClick={handleClick}
          className="w-full p-2 mt-4 mb-4 rounded text-black bg-orange-200 transition duration-300"
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
          <hr className="p-2"/>
          <span className="font-bold text-3xl mr-4 p-2">Words Breakdown</span>
          {Object.keys(responseGeneratedText.words).map((key) => (
            <React.Fragment key={key}>
              <div className="flex items-start justify-start p-2">
                <span className="container w-25 font-bold text-3xl mr-4">{responseGeneratedText.words[key].word}</span>
                <span className="text-lg container">{responseGeneratedText.words[key].meaning}</span>
              </div>

            </React.Fragment>
          ))}

        </div>
        </div>
      </div>

    </>
  );
}
