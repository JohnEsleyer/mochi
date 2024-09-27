'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import LandingPageNavbar from '@/components/landingPageNavbar';


export default function LandingPage() {

  const [conversationKanji, setConversationKanji] = useState<string[]>([
    "こんにちは、私はモチです。あなたの言語学習アシスタントです。何でも聞いてください。",
    "こんにちは、モチ、私の名前はRalphです。",
    "こんにちは、ラルフさん。私は日本語を教えるお手伝いをします。",
    "How do I say thank you?",
    "ありがとうございます"
  ]);
  const [conversationHiragana, setConversationHiragana] = useState<string[]>([
    "こんにちは、わたしはもちです。あなたのげんごがくしゅうアシスタントです。なにでもきいてください。",
    '',
    "こんにちは、らるふさん。わたしはにほんごをおしえるおてつだいします。",
    '',
    "ありがとうございする"
  ]);

  const [conversationRomaji, setConversationRomaji] = useState<string[]>([
    "Konnichiwa, watashi wa Mochi desu. Anata no gengo gakushū ashisutanto desu. Nani demo kiite kudasai.",
    '',
    " Konnichiwa, Rarufusan. Watashi wa nihongo o oshieru otetsudai shimasu.",
    '',
    "arigatou gozaimasu"
  ]);

  const [conversationEnglish, setConversationEnglish] = useState<string[]>([
    "Hi I am Mochi, your language learning assistant. Feel free to ask me anything.",
    '',
    "Hello, Ralph. I will help you learn Japanese",
    '',
    "Thank you"
  ]);

  const [isFurigana, setIsFurigana] = useState(true);
  const [isEnglishTranslate, setIsEnglishTranslate] = useState(true);
  const [isRomaji, setIsRomaji] = useState(true);



  const chatComponent = () => {

    return <div>

      {conversationKanji.map((message, index) => (
        <div className="p-2 shadow-lg" key={index}>

          <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
            <span className="text-purple-300 ">Mochi:</span> :
            <span className="text-green-300">You:</span>}</strong>
          </p>
          <div className={`${index % 2 == 0 ? "bg-purple-300" : "bg-green-300"} p-2 text-black rounded`}>
            <p className="text-xl">{message}</p>
          </div>

          {index % 2 == 0 && <div>

            <div className="p-2">
              {isFurigana && <p>Furigana: <span className="text-red-300">{conversationHiragana[index]}</span></p>}
              {isRomaji && <p>Romaji: <span className="text-green-300">{conversationRomaji[index]}</span></p>}
              {isEnglishTranslate && <p>Meaning: <span className="text-amber-200">{conversationEnglish[index]}</span></p>}
            </div>
            <div className="flex justify-end p-2">
              <button
                disabled={true}
                className="bg-orange-200 text-black p-1 pr-2 pl-2 rounded"

              >
                Use Analyzer
              </button>
            </div>

          </div>}
        </div>
      ))}
    </div>

  }


  const toggleFurigana = () => {
    setIsFurigana((prev) => {

      return !prev
    });
  };

  const toggleEnglish = () => {
    setIsEnglishTranslate((prev) => {
      return !prev
    });
  };

  const toggleRomaji = () => {
    setIsRomaji((prev) => {
      return !prev
    });
  };
  const chatUI = () => {
    return (
      <div className="flex flex-col h-full bg-gray-900 border border-4 rounded-xl border-gray-200">
        {/* // Header */}
        <div className="h-32 strict-content rounded-xl bg-gray-900 p-1 pl-2 text-xs">
          <p className="text-xl font-bold  text-purple-300">Chat with Mochi</p>
          <p>- If you're unsure how to reply in Japanese, you can also use English.</p>
          <div className="flex justify-start text-xs pt-1">

            {/* // Toggle Furigana */}
            <div className="flex items-center">
              <label className={`pl-2 mr-2 ${isFurigana ? 'text-red-300' : 'text-gray-500'}`}>Furigana</label>
              <div className="relative scale-75">
                <input
                  id="toggleFurigana"
                  type="checkbox"
                  className="hidden"
                  checked={!isFurigana}
                  onChange={toggleFurigana}

                />
                <label
                  htmlFor="toggleFurigana"
                  className="flex items-center cursor-pointer select-none"
                >
                  <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${isFurigana ? 'bg-red-300' : 'bg-gray-400'}`}>
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${!isFurigana ? 'translate-x-6' : 'translate-x-0'
                        }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            {/* // End of Toggle Furigana */}
            {/* // Start of Toggle to show translation */}
            <div className="flex items-center">
              <label className={`pl-2  mr-2 ${isEnglishTranslate ? 'text-amber-200' : 'text-gray-500'}`}>English Translation</label>
              <div className="relative scale-75">
                <input
                  id="toggleEnglish"
                  type="checkbox"
                  className="hidden"
                  checked={!isEnglishTranslate}
                  onChange={toggleEnglish}
                />
                <label
                  htmlFor="toggleEnglish"
                  className="flex items-center cursor-pointer select-none"
                >
                  <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${isEnglishTranslate ? 'bg-amber-200' : 'bg-gray-400'}`}>
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${!isEnglishTranslate ? 'translate-x-6' : 'translate-x-0'
                        }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            {/* // End of Toggle to show translation */}
            {/* // Start of toggle to show romaji */}
            <div className="flex items-center">
              <label className={`pl-2  mr-2 ${isRomaji ? 'text-green-300' : 'text-gray-500'}`}>Romaji</label>
              <div className="relative scale-75">
                <input
                  id="toggleRomaji"
                  type="checkbox"
                  className="hidden"
                  checked={!isRomaji}
                  onChange={toggleRomaji}
                />
                <label
                  htmlFor="toggleRomaji"
                  className="flex items-center cursor-pointer select-none"
                >
                  <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${isRomaji ? 'bg-green-300' : 'bg-gray-400'}`}>
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${!isRomaji ? 'translate-x-6' : 'translate-x-0'
                        }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            {/* // End of toggle to show romaji */}

          </div>
        </div>


        {/* // Chat */}
        <div className="flex flex-col h-full">
          {/* // Chatbox */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="h-10 ">
              {chatComponent()}

            </div>

          </div>

          {/* // User input */}
          <div className="h-14 pt-2">
            <form className="grid grid-rows-1 grid-cols-8 grid-flow-col gap-2">
              <div className="col-span-6 pl-1">
                <input
                  type="text"

                  maxLength={100}
                  disabled={true}
                  placeholder="Type your message here..."
                  className="w-full p-1 text-white border border-white rounded-lg bg-gray-800"
                />
              </div>
              <div className="col-span-2 flex items-end ">
                <button
                  disabled={true}
                  type="submit"
                  className=" w-full p-1 rounded text-black bg-orange-200 transition duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  };


  return (
    <div className="bg-gray-800 h-screen flex flex-col overflow-y-auto">
      <LandingPageNavbar/>
      <div className="h-full flex flex-wrap">
        <div className="flex-1 flex flex-col justify-start w-64 py-12 px-4 sm:px-6 lg:px-8">
          <span className="text-6xl font-bold text-white">
            <span className="text-green-300">Chat</span>
            <span className="text-orange-300"> Your</span>
            <span className="text-pink-300"> Way</span> to
            <span className="text-yellow-300"> Japanese</span> with  <span className='text-pink-300'>M</span>
            <span className='text-grey-200'>o</span>
            <span className='text-green-300'>c</span>
            <span className='text-yellow-200'>h</span>
            <span className='text-orange-300'>i</span>
          </span>
          <p className="text-white mt-4">
            Powered by Google <span className="text-purple-400">Gemini</span>
          </p>
          <p className="text-white">
          </p>

        </div>
        <div className="text-xs text-white h-full  p-8">
          {chatUI()}
        </div>
      </div>

    </div>
  );
}
