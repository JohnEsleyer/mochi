'use client'

import React from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { colorWordClass } from '../lib/colors';
import Link from 'next/link';


export default function Home() {
  const defaultData = {
    status: 'success',
    body: {
      meaning: '',
      romaji: '',
      furigana: '',
      context: '',
      words: {
        '': {
          word: '',
          romaji: '',
          class: '',
          meaning: '',
          context: '',
        },
      },
    },
   
  };

  
  const [responseJson, setJsonResponse] = useState<JsonResponse>(defaultData);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {


    setIsVisible(false);
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    if (inputValue.length <= 0){
      return 
    }
    setIsFailed(false);
    setIsVisible(false);
    setIsLoading(true);


    try {
      const res = await fetch('/api/japan', {
          method: 'POST',
          body: JSON.stringify({ message: inputValue }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
  
      const response: JsonResponse = await res.json();
      console.log(response.status);
  
      const { status } = response;
  
      if (status === 'Failed') {
          setIsFailed(true);
      } else {
          setIsFailed(false);
          setJsonResponse(response);
      }
  
      setIsLoading(false);
      setIsVisible(true);
  
    } catch (error) {
      console.error("Error parsing response:", error);
      setIsFailed(false);
      setIsLoading(false);
      setIsVisible(true);
    }
  
  
  }

  return (
    <>
      <div className="bg-gray-800">
  <div className={` ${isLoading ? 'shimmer-effect' : ''}  min-h-screen justify-center bg-gray-800 text-white font-sans`}>
    <div>
        {/* // Start of Navigation bar */}
      <nav className="pb-2 pt-2 pl-2 pr-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="p-1">
            <a href="#" className="text-white text-xl font-bold">
              <h1 className='text-s font-bold'>
                <span className='text-pink-300'>M</span>
                <span className='text-grey-200'>o</span>
                <span className='text-green-300'>c</span>
                <span className='text-yellow-200'>h</span>
                <span className='text-orange-300'>i</span>
                <span> AI</span>
              </h1>
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/chat" className="text-purple-300 hover:animate-shake">
              Chat AI
            </Link>
            <Link href="/home" className="text-orange-300 hover:animate-shake">
              Analyzer
            </Link>
            <Link href="/learn" className="text-green-300 hover:animate-shake">
              Learn
            </Link>
            <Link href="/saved" className="text-yellow-300 hover:animate-shake">
              Saved
            </Link>
            <Link href="/kanji" className="text-pink-300 hover:animate-shake">
              Kanji
            </Link>
            <Link href="/hiragana" className="text-amber-300 hover:animate-shake">
              Hiragana
            </Link>
            <Link href="/katakana" className="text-lime-300 hover:animate-shake">
              Katakana
            </Link>
            <Link href="/katakana" className="text-white-300 hover:animate-shake">
              Profile
            </Link>
            <Link href="/signout" className="text-red-300">
              Logout
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
        {/* // End of Navigation Bar */}
        {/* // Body */}
      <div className={` h-max w-full rounded-lg lg:rounded-lg lg:h-full`}>
        <div className={`p-6 `}>
          <div className='flex items-center justify-center'>
            {/* <Image src='/mochi.png' width={100} height={100} alt='mochi'/> */}
            <div className='flex items-center mb-6 grid'>
              <h1 className='text-4xl font-bold mt-4'>
                <span className='text-green-300'>Analyzer</span>
              </h1>
              <span className='text-sm'>Analyze Japanese Text with AI</span>
            </div>
          </div>
          <div>
            <div className='lg:flex lg:justify-center'>
              <div>
                <input
                  type='text'
                  value={inputValue}
                  maxLength={100}
                  onChange={handleInputChange}
                  placeholder='Type a word or phrase'
                  className='w-full lg:w-[32rem] lg:h-14 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className="text-xs p-2">{inputValue.length} / 100</p>
              </div>
            </div>
            {isLoading ? <p></p> :
              <div className='flex justify-center items-center'>
                <button
                  onClick={handleClick}
                  className='w-full lg:w-32 p-2 mt-4 mb-4 rounded text-black bg-orange-200 transition duration-300'
                >
                  Analyze Text
                </button>
              </div>
            }
            <div className='text-center flex justify-center'>
              <div>
                {isFailed && <div>
                  <p>The server did not process your data properly. Please try sending it again after a few seconds.</p>
                </div>}
                <p className="text-yellow-200 text-xs pb-4">Please ensure that the text you input is meaningful and appropriate. Texts containing gibberish content or malicious data will be rejected by the server.</p>
              </div>
            </div>
            {!isFailed &&
              <div className={`transition-opacity transition-height duration-500 ease-in-out overflow-hidden ${isVisible ? 'opacity-100 max-h-full' : `${isLoading ? 'opacity-0 max-h-full' : 'opacity-0 max-h-0'}`}`}>
                <div className='lg:drop-shadow-xl lg:mt-10'>
                  <span className='font-bold text-2xl mr-4 text-3xl'>Input: "{inputValue}"</span>
                  <hr className='h-px my-2 border-0 bg-gray-700' />
                  <div className='flex items-start justify-start p-2'>
                    <span className='font-bold text-xl mr-4 '>Meaning:</span>
                    <span className='text-lg'>{responseJson.body.meaning}</span>
                  </div>
                  <div className='flex items-start justify-start p-2'>
                    <span className='font-bold text-xl mr-4'>Romaji:</span>
                    <span className='text-lg'>{responseJson.body.romaji}</span>
                  </div>
                  <div className='flex items-start justify-start p-2'>
                    <span className='font-bold text-xl mr-4'>Furigana:</span>
                    <span className='text-lg'>{responseJson.body.furigana}</span>
                  </div>
                  <div className='flex items-start justify-start p-2'>
                    <span className='font-bold text-xl mr-4'>Context:</span>
                    <span className='text-lg'>{responseJson.body.context}</span>
                  </div>
                </div>
                <div>
                  <p className='font-bold text-3xl mr-4 p-2 mt-1'>Words Breakdown</p>
                  <span className='font-bold text-3xl mr-4 p-2'>{
                    Object.keys(responseJson.body.words).map((key) => (
                      <React.Fragment key={key}>
                        <span className={`text-3xl font-bold mb-2 ${responseJson.body.words[key].class in colorWordClass ? colorWordClass[responseJson.body.words[key].class] : 'text-white-300'}`}>
                          {responseJson.body.words[key].word}
                        </span>
                      </React.Fragment>
                    ))
                  }</span>
                  <hr className='h-px my-2 border-0 bg-gray-700' />
                  <div className="lg:flex lg:flex-wrap">
                    {Object.keys(responseJson.body.words).map((key) => (
                      <React.Fragment key={key}>
                        <div className='container lg:w-1/2 flex flex-col rounded-lg p-4 shadow-md lg:shadow-lg'>
                          <span className={`text-3xl font-bold mb-2 ${responseJson.body.words[key].class in colorWordClass ? colorWordClass[responseJson.body.words[key].class] : 'text-white-300'}`}>
                            {responseJson.body.words[key].word}
                          </span>
                          <span className='text-lg '><b>Romaji</b>: {responseJson.body.words[key].romaji}</span>
                          <span className='text-lg '><b>Class</b>: {responseJson.body.words[key].class}</span>
                          <span className='text-lg '><b>Meaning</b>: {responseJson.body.words[key].meaning}</span>
                          <span className='text-lg '><b>Context</b>: {responseJson.body.words[key].context}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}