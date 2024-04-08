'use client'
import Template from "@/components/PageTemplate";
import Typewriter from "@/components/typewriter";
import { useEffect, useState } from "react";
import Kanji from "../kanji/page";
import Link from "next/link";
import { colorWordClass } from "@/utils/colors";
import React from "react";
import Image from "next/image";
import ArrowBack from "/public/arrow_back.svg"

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


export default function ChatAI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [inputText, setInputText] = useState('');
    const [conversationKanji, setConversationKanji] = useState<string[]>([
        "当店の寿司レストランへようこそ。ご注文はお決まりでしょうか、それともおすすめをお聞きになりますか？"
    ]);
    const [conversationHiragana, setConversationHiragana] = useState<string[]>([
        "とうてんのすしれすとらんへようこそ。ごちゅうもんはおきまりでしょうか、それともおすすめをおききになりますか?"
    ]);

    const [conversationRomaji, setConversationRomaji] = useState<string[]>([
        "tōten no sushi resutoran e yōkoso. gochūmon wa okimari deshō ka, soretomo osusume o o-kiki ni narimasu ka?"
    ]);

    const [conversationEnglish, setConversationEnglish] = useState<string[]>([
        "Welcome to our sushi restaurant. Have you decided on your order, or would you like to hear our recommendations?"
    ]);


    const [isFurigana, setIsFurigana] = useState(true);
    const [isEnglishTranslate, setIsEnglishTranslate] = useState(true);
    const [isRomaji, setIsRomaji] = useState(true);

    var heightWidth;
    if (typeof window == "undefined") {
        console.log('Server');
    } else {
        heightWidth = window.innerHeight > window.innerWidth;
    }

    const [isPortrait, setIsPortrait] = useState(heightWidth);
    const [isAnalyze, setIsAnalyze] = useState(false);
    const [isAnalyzeFailed, setIsAnalyzeFailed] = useState(false);
    const [analyzerResponse, setAnalyzerResponse] = useState<AnalyzerResponse>(defaultData);

    const handleOrientationChange = () => {
        setIsPortrait((window.innerHeight > window.innerWidth - 180));
    };


    useEffect(() => {
        window.addEventListener('resize', handleOrientationChange);
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);



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

    const submitMessage = async () => {
        var prevMessage: string[] = [];
        var prevHiragana: string[] = [];
        var prevRomaji: string[] = [];
        var prevEnglish: string[] = [];

        setConversationKanji([...conversationKanji, `${inputText}`]);
        setInputText('');
        prevMessage = [...conversationKanji, `${inputText}`];
        setConversationHiragana([...conversationHiragana, `${inputText}`]);
        prevHiragana = [...conversationHiragana, `${inputText}`];

        prevRomaji = [...conversationRomaji, ' '];
        prevEnglish = [...conversationEnglish, ' ']

        try {

            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: {

                        conversation: prevMessage,
                    },
                }),
            });
            const { body } = await response.json();
            setTimeout(() => {

                setConversationKanji([...prevMessage, `${body.message}`]);
                setConversationRomaji([...prevRomaji, `${body.romaji}`]);
                setConversationHiragana([...prevHiragana, `${body.hiragana}`]);
                setConversationEnglish([...prevEnglish, `${body.english}`]);
            }, 500);


        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputText.length > 0) {
            submitMessage();
        }

    };


    const tryAgain = async () => {
        submitMessage();
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(conversationHiragana);
        setInputText(event.target.value);
    };

    const handleAnalyze = async (message: string) => {
        setIsLoading(true);
        setIsAnalyze(true);
        const payload = {
            message: message
        };

        try{
            const res = await fetch('/api/japan', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            const response: AnalyzerResponse = await res.json();
            console.log(response.status);
        
            const { status } = response;
        
            if (status === 'Failed') {
                console.log('Analyze Failed');
                setIsAnalyzeFailed(true);
            } else {
                setIsAnalyzeFailed(false);
                setAnalyzerResponse(response);
            }
        }catch(e){
            setIsAnalyzeFailed(true);
        }

       setIsLoading(false);
    }

    const chatComponent = () => {

        return <div>
            
            {conversationKanji.map((message, index) => (
                <div className="p-2 shadow-lg" key={index}>
                    
                    <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
                        <span className="text-purple-300 text-xl">Mochi:</span> :
                        <span className="text-green-300 text-xl">You:</span>}</strong>
                        {message == "ERROR" && <span className="text-amber-300">
                            {" " + "Server is overloaded with requests, please try again later"}
                            <button onClick={tryAgain} className="rounded text-xs p-1 text-black bg-orange-200 transition duration-300">Try Again</button></span>}</p>
                    <p className="text-lg font-bold">{message}</p>
                    
                    {index % 2 == 0 && <div>
                        <div>
                           <button 
                           className="bg-orange-200 text-xs text-black p-1 pr-2 pl-2 rounded"
                           onClick={() => {handleAnalyze(message)}}
                           >
                            Analyze
                           </button>
                        </div>
                        <div className="p-2">
                        {isFurigana && <p>Furigana: <span className="text-purple-300">{conversationHiragana[index]}</span></p>}
                        {isRomaji && <p>Romaji: <span className="text-green-300">{conversationRomaji[index]}</span></p>}
                        {isEnglishTranslate && <p>English: <span className="text-amber-200">{conversationEnglish[index]}</span></p>}
                        </div>

                    </div>}
                </div>
            ))}
        </div>

    }

    const chatUI = () => {
        return (
            <div className="grid grid-rows-8 h-full">
     
                {/* // Header */}
                <div className="row-span-1 bg-gray-900">
                    <p className="text-xl font-bold pl-2">Roleplay: "Ordering a sushi at a sushi restaurant."</p>
                    <div className="flex justify-start text-xs pt-1">

                        {/* // Toggle Furigana */}
                        <div className="flex items-center">
                            <label className={`pl-2 mr-2 ${isFurigana ? 'text-purple-300' : 'text-gray-500'}`}>Furigana</label>
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
                                    <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${isFurigana ? 'bg-purple-300' : 'bg-gray-400'}`}>
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
                <div className="bg-gray-800 row-span-7 grid grid-rows-8 ">
                    {/* // Chatbox */}
                    <div className="row-span-7 overflow-auto">
                        {chatComponent()}
                    </div>
                    {/* // User input */}
                    <div className="row-span-1 ">
                        <form onSubmit={handleSubmit} className="grid grid-rows-1 grid-cols-8 grid-flow-col gap-2">
                            <div className="col-span-6 pl-1">
                                <p className="text-xs">Max Character Limit: {inputText.length} / 50 </p>
                                <input
                                    type="text"
                                    value={inputText}
                                    maxLength={50}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                    className="w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 flex items-end ">
                                <button
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


    const analyzerUI = () => {
        return (
                <div className={isPortrait ? "h-full" : "border-l-4 border-white h-full"}>
                  
            
                    {
                        isAnalyze ? 
                        <div className={`${isLoading ? 'shimmer-effect' : ''} h-full`}>
                            
                            {isLoading ? 
                            <div></div> : 
                            <div className="mochiFade h-full grid grid-rows-9 opacity-100 transform transition-opacity duration-500 ease-in-out">
                            {/* // Header */}
                      
                            <div className="row-span-3 bg-gray-900">
                                <div className="flex justify-start">
                                    
                                    {isPortrait && <button
                                            onClick={() => {
                                                setIsAnalyze(false);
                                            }}
                                            ><Image
                                                src={ArrowBack}
                                                width={30}
                                                height={30} alt={""} 
                                                                               /></button>}
                                
                            <p className='font-bold text-3xl mr-4 p-2 mt-1'>
                                
                                Words Breakdown
                                </p>
                                </div>
                            <span className='font-bold text-3xl mr-4 p-2'>{
                              Object.keys(analyzerResponse.body.words).map((key) => (
                                <React.Fragment key={key}>
                                  <span className={`text-3xl font-bold mb-2 ${analyzerResponse.body.words[key].class in colorWordClass ? colorWordClass[analyzerResponse.body.words[key].class] : 'text-white-300'}`}>
                                    {analyzerResponse.body.words[key].word}
                                  </span>
                                </React.Fragment>
                              ))
                            }</span>
                            </div>
                            {/* // Words List */}
                            <div className="row-span-7 lg:flex lg:flex-wrap overflow-auto">
                              {Object.keys(analyzerResponse.body.words).map((key) => (
                                <React.Fragment key={key}>
                                  <div className='container lg:w-1/2 flex flex-col rounded-lg p-4 shadow-md lg:shadow-lg'>
                                    <span className={`text-3xl font-bold mb-2 ${analyzerResponse.body.words[key].class in colorWordClass ? colorWordClass[analyzerResponse.body.words[key].class] : 'text-white-300'}`}>
                                      {analyzerResponse.body.words[key].word}
                                    </span>
                                    <span className='text-lg '><b>Romaji</b>: {analyzerResponse.body.words[key].romaji}</span>
                                    <span className='text-lg '><b>Class</b>: {analyzerResponse.body.words[key].class}</span>
                                    <span className='text-lg '><b>Meaning</b>: {analyzerResponse.body.words[key].meaning}</span>
                                    <span className='text-lg '><b>Context</b>: {analyzerResponse.body.words[key].context}</span>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                            }
                        </div> 
                        : <div className="bg-gray-800 flex items-center justify-center h-full">
                            <p className="p-2">Press the 'Analyze' button to generate a breakdown of the Japanese text.</p>
                        </div>
                    }
                </div>
        );
    }

    const portraitDisplay = () => {
        return (
            <div className="grid grid-rows-1 grid-cols-1 h-full ">
                {isAnalyze ? analyzerUI() : chatUI()}
            </div>
        );
    }
    const landscapeDisplay = () => {
        return (

            <div className="grid grid-rows-1 grid-cols-2 h-full ">
                {chatUI()}
                {analyzerUI()}
            </div>
        );
    };


    return (
        <Template>
            {
                isPortrait ? portraitDisplay() : landscapeDisplay()
            }

        </Template>
    );
}