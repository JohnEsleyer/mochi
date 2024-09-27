'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { colorWordClass } from "@/utils/colors";
import React from "react";
import Image from "next/image";
import ArrowBack from "/public/arrow_back.svg"
import supabase from "@/utils/supabase";
import Loading from "/public/loading.svg"


const defaultData = {
    status: 200,
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
        "こんにちは、私はモチです。あなたの言語学習アシスタントです。何でも聞いてください。"
    ]);
    const [conversationHiragana, setConversationHiragana] = useState<string[]>([
        "こんにちは、わたしはもちです。あなたのげんごがくしゅうアシスタントです。なにでもきいてください。"
    ]);

    const [conversationRomaji, setConversationRomaji] = useState<string[]>([
        "Konnichiwa, watashi wa Mochi desu. Anata no gengo gakushū ashisutanto desu. Nani demo kiite kudasai."
    ]);

    const [conversationEnglish, setConversationEnglish] = useState<string[]>([
        "Hi I am Mochi, your language learning assistant. Feel free to ask me anything."
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
    const [AnalyzerResponse, setAnalyzerResponse] = useState<AnalyzerResponse>(defaultData);
    const [isSaved, setIsSaved] = useState(false);
    const [currentAnalyzed, setCurrentAnalyzed] = useState(0);
    const [currentAnalyzedText, setCurrentAnalyzedText] = useState('');
    const [isChatFailed, setIsChatFailed] = useState(false);

    const handleOrientationChange = () => {
        setIsPortrait((window.innerHeight > window.innerWidth - 400));
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
        setIsChatFailed(false);

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

        const value = localStorage.getItem('sb-wrpppaehjcvmnwbcuxpa-auth-token');
        let parsedValue;
        try {
            parsedValue = JSON.parse(value || '');
            console.log("parsedValue:" + parsedValue.access_token);
        } catch (error) {
            console.error("Error parsing value:", error);
        }
        try {
            const payload = {
                message: {
                    conversation: prevMessage,
                },
                access_token: parsedValue.access_token,
            };
            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const { body, status } = await response.json();
            if (status == 500) {
                setIsChatFailed(true);
                return
            }
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
        setIsSaved(false);


        // Fetch access token stored from local storage.
        const value = localStorage.getItem('sb-wrpppaehjcvmnwbcuxpa-auth-token');
        let parsedValue;
        try {
            parsedValue = JSON.parse(value || '');
        } catch (error) {
            console.error("Error parsing value:", error);
        }

        const payload = {
            message: message,
            access_token: parsedValue.access_token,
        };
        try {
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

            if (status === 500) {
                console.log('Analyze Failed');
                setIsAnalyzeFailed(true);
            } else {
                setIsAnalyzeFailed(false);
                setAnalyzerResponse(response);
            }
        } catch (e) {
            setIsAnalyzeFailed(true);
        }

        setIsLoading(false);
    }


    async function save() {


        const savedData = {
            japanese: currentAnalyzedText,
            meaning: conversationEnglish[currentAnalyzed],
            furigana: conversationHiragana[currentAnalyzed],
            romaji: conversationEnglish[currentAnalyzed],
            context: 'none',
            words: 
                Object.keys(AnalyzerResponse.body.words).map((key) => (


                    AnalyzerResponse.body.words[key]

                )),
        };

        const { data, error } = await supabase
            .from('save')
            .insert([
                {
                    text: JSON.stringify(savedData),
                    language: 'japanese',
                },
            ]);

        if (error) {
            console.log('Failed!')
        } else {
            console.log('Saved!')
            setIsSaved(true);

        }
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
                    <div className={`${index % 2 == 0 ? "bg-purple-300" : "bg-green-300"} p-2 text-black rounded`}>
                        <p className="text-2xl">{message}</p>
                    </div>

                    {index % 2 == 0 && <div>

                        <div className="p-2">
                            {isFurigana && <p>Furigana: <span className="text-red-300">{conversationHiragana[index]}</span></p>}
                            {isRomaji && <p>Romaji: <span className="text-green-300">{conversationRomaji[index]}</span></p>}
                            {isEnglishTranslate && <p>Meaning: <span className="text-amber-200">{conversationEnglish[index]}</span></p>}
                        </div>
                        <div className="flex justify-end p-2">
                            <button
                                className="bg-orange-200 text-black p-1 pr-2 pl-2 rounded"
                                onClick={() => {
                                    handleAnalyze(message);
                                    setCurrentAnalyzed(index);
                                    setCurrentAnalyzedText(message);
                                }}
                            >
                                Use Analyzer
                            </button>
                        </div>

                    </div>}
                </div>
            ))}
        </div>

    }

    const chatUI = () => {
        return (
            <div className="flex flex-col h-full">
                {/* // Header */}
                <div className="h-32 strict-content bg-gray-900 p-1 pl-2 text-xs">
                    <p className="text-xl font-bold  text-purple-300">Chat with Mochi</p>
                    <p>- Learn Japanese by engaging in a conversation with AI.</p>
                    <p>- If you're unsure how to reply in Japanese, you can also use English.</p>
                    <p>- Remember to save unfamiliar phrases so you can review them later. You can do this by tapping the star icon in the analysis section.</p>
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
                            {isChatFailed && <div className="text-red-500">
                                Server error, please try again after a few seconds.
                            </div>}
                        </div>

                    </div>

                    {/* // User input */}
                    <div className="h-14">
                        <form onSubmit={handleSubmit} className="grid grid-rows-1 grid-cols-8 grid-flow-col gap-2">
                            <div className="col-span-6 pl-1">
                                <p className="text-xs">Max Character Limit: {inputText.length} / 100 </p>
                                <input
                                    type="text"
                                    value={inputText}
                                    maxLength={100}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                    className="w-full p-1 text-white border border-white rounded-lg bg-gray-800"
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


    const AnalyzerUI = () => {
        return (
            <div className={isPortrait ? "h-full" : "border-l-4 border-white h-full"}>


                {
                    isAnalyze ?
                        <div className='h-full'>

                            {isLoading ?
                                <div className="h-full flex justify-center items-center">
                                    <Image
                                        src={Loading}
                                        height={50}
                                        width={50}
                                        alt={""} />
                                </div> :
                                <div className="mochiFade h-full flex flex-col opacity-100 transform transition-opacity duration-500 ease-in-out">
                                    {/* // Header */}

                                    <div className="row-span-3 bg-gray-900 shadow-2xl">
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

                                            <div className="flex items-center">
                                                {
                                                    !isAnalyzeFailed && !isSaved &&
                                                    <button onClick={save}>
                                                        <span className="material-symbols-outlined">
                                                            star
                                                        </span>
                                                    </button>
                                                }
                                                {isSaved && <span className="text-amber-300">Saved</span>}
                                            </div>


                                        </div>
                                        <div className="h-28 overflow-y-auto no-scrollbar">
                                            {!isAnalyzeFailed && <span className='font-bold text-3xl mr-4 p-2'>{
                                                Object.keys(AnalyzerResponse.body.words).map((key) => (
                                                    <React.Fragment key={key}>

                                                        <span className={`text-3xl font-bold mb-2 ${AnalyzerResponse.body.words[key].class in colorWordClass ? colorWordClass[AnalyzerResponse.body.words[key].class] : 'text-white-300'}`}>
                                                            {AnalyzerResponse.body.words[key].word}
                                                        </span>
                                                    </React.Fragment>
                                                ))
                                            }</span>}
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto no-scrollbar">

                                        {/* // Words List */}
                                        {isAnalyzeFailed ?
                                            <div className="flex justify-center p-2">
                                                <p>Error occured. Please try again later.</p>
                                            </div> : <div className="h-80 lg:flex lg:flex-wrap">
                                                {Object.keys(AnalyzerResponse.body.words).map((key) => (
                                                    <React.Fragment key={key}>
                                                        <div className='container lg:w-1/2 flex flex-col rounded-lg p-4 shadow-md lg:shadow-lg'>
                                                            <span className={`text-3xl font-bold mb-2 ${AnalyzerResponse.body.words[key].class in colorWordClass ? colorWordClass[AnalyzerResponse.body.words[key].class] : 'text-white-300'}`}>
                                                                {AnalyzerResponse.body.words[key].word}
                                                            </span>
                                                            <span className='text-lg '><b>Romaji</b>: {AnalyzerResponse.body.words[key].romaji}</span>
                                                            <span className='text-lg '><b>Class</b>: {AnalyzerResponse.body.words[key].class}</span>
                                                            <span className='text-lg '><b>Meaning</b>: {AnalyzerResponse.body.words[key].meaning}</span>
                                                            <span className='text-lg '><b>Context</b>: {AnalyzerResponse.body.words[key].context}</span>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>}
                                    </div>
                                </div>
                            }
                        </div>
                        : <div className="bg-gray-800 flex items-center justify-center h-full">
                            <p className="p-2">Press the 'Use Analyzer' button to generate a breakdown of the Japanese text.</p>
                        </div>
                }
            </div>
        );
    }

    const portraitDisplay = () => {
        return (
            <div className="grid grid-cols-1 h-full ">
                {isAnalyze ? AnalyzerUI() : chatUI()}
            </div>
        );
    }
    const landscapeDisplay = () => {
        return (

            <div className="grid grid-cols-2 h-full ">
                {chatUI()}
                {AnalyzerUI()}
            </div>
        );
    };


    return (
        <Template>
            <div className="h-full">

                {
                    isPortrait ? portraitDisplay() : landscapeDisplay()
                }
            </div>

        </Template>
    );
}