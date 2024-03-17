'use client'
import Template from "@/components/PageTemplate";
import Typewriter from "@/components/typewriter";
import { useEffect, useState } from "react";
import Kanji from "../kanji/page";
import Link from "next/link";



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
       submitMessage();
    };


    const tryAgain = async () => {
        submitMessage();
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(conversationHiragana);
        setInputText(event.target.value);
    };

    const chatComponent = () => {

            return <div>
            {conversationKanji.map((message, index) => (
                <div className="p-2">

                    <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
                        <span className="text-purple-300">🤖Mochi:</span> :
                        <span className="text-green-300">😄You:</span>}</strong>
                        {message == "ERROR" && <span className="text-amber-300">
                            {" " + "Server is overloaded with requests, please try again later"}
                            <button onClick={tryAgain} className="rounded text-xs p-1 text-black bg-orange-200 transition duration-300">Try Again</button></span>}</p>
                    <p className="text-lg font-bold">{message}</p>
                    {index % 2 == 0 && <div className="p-2">
                    {isFurigana && <p>Furigana: <span className="text-purple-300">{conversationHiragana[index]}</span></p>}
                    {isRomaji &&<p>Romaji: <span className="text-green-300">{conversationRomaji[index]}</span></p>}
                    {isEnglishTranslate && <p>English: <span className="text-amber-200">{conversationEnglish[index]}</span></p>}
                    <div className="pt-2">
                       <a target="_blank" href={"/analyzer?text=" + message} className="rounded text-black bg-orange-200 p-1 transition duration-300">
                        Use Analyzer
                       </a>
                    </div>
                    
                    </div>}
                </div>
            ))}
            </div>

    }
    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <div className="flex lg:flex-row p-2">
                {/* // Toggle Furigana */}
                <div className="flex items-center">
                    <label className={`pl-2 mr-2 ${isFurigana ? 'text-purple-300' : 'text-gray-500'}`}>Furigana</label>
                    <div className="relative">
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
                    <div className="relative">
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
                    <div className="relative">
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

            <div className="w-full">
                <div className="no-scrollbar h-[68vh] lg:h-[68vh] overflow-auto scroll-smooth scrollbar-hide">
                    <div className="pb-2">
                        {chatComponent()}
                    </div>
                </div>

        
                <form onSubmit={handleSubmit} className="grid grid-rows-1 grid-flow-col justify-stretch">
                        <div className="col-span-4 h-[10vh]">
                        <input
                            type="text"
                            value={inputText}
                            maxLength={100}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            className="w-full  h-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p>Max Character Limit: {inputText.length} / 100 </p>
                        </div>
                        <div className="h-[10vh]">
                        <button
                            type="submit"
                            className=" w-full h-full rounded text-black bg-orange-200 transition duration-300"
                        >
                            Send
                        </button>
                        </div>
                </form>
            </div>
        </Template>
    );
}