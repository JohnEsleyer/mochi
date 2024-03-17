'use client'
import Template from "@/components/PageTemplate";
import Typewriter from "@/components/typewriter";
import { useEffect, useState } from "react";
import Kanji from "../kanji/page";



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
    

    const [isKanji, setIsKanji] = useState(true);

    const toggleSwitch = () => {
        setIsKanji((prev) => {

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
        if (isKanji){
            return <div>
            {conversationKanji.map((message, index) => (
                <div className="p-2">

                    <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
                        <span className="text-purple-300">🤖Mochi:</span> :
                        <span className="text-green-300">😄You:</span>}</strong>
                        {message == "ERROR" && <span className="text-amber-300">
                            {" " + "Server is overloaded with requests, please try again later"}
                            <button onClick={tryAgain} className="rounded text-xs p-1 text-black bg-orange-200 transition duration-300">Try Again</button></span>}</p>
                    <p className="text-lg">{message}</p>
                    <p className="text-lg">{conversationRomaji[index]}</p>
                    <p className="text-lg">{conversationEnglish[index]}</p>
                </div>
            ))}
            </div>
        }else{
             return <div>
            {conversationHiragana.map((message, index) => (
                <div className="p-2">

                    <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
                        <span className="text-purple-300">🤖Mochi:</span> :
                        <span className="text-green-300">😄You:</span>}</strong>
                        {message == "ERROR" && <span className="text-amber-300">
                            {" " + "Server is overloaded with requests, please try again later"}
                            <button onClick={tryAgain} className="rounded text-xs p-1 text-black bg-orange-200 transition duration-300">Try Again</button></span>}</p>
                    <p className="text-lg">{message}</p>
                    <p className="text-lg">{conversationRomaji[index]}</p>
                    <p className="text-lg">{conversationEnglish[index]}</p>
                    
                </div>
            ))}
            </div>
        }
    }
    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <div className="flex flex-col lg:flex-row">

                {/* // Toggle */}
                <div className="flex items-center">
                    <label className={`mr-2 ${isKanji ? 'text-red-500' : 'text-gray-500'}`}>Kanji</label>
                    <div className="relative">
                        <input
                            id="toggle"
                            type="checkbox"
                            className="hidden"
                            checked={!isKanji}
                            onChange={toggleSwitch}
                        />
                        <label
                            htmlFor="toggle"
                            className="flex items-center cursor-pointer select-none"
                        >
                            <div className={`w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center transition-colors duration-300 ${isKanji ? 'bg-red-500' : 'bg-blue-500'}`}>
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${!isKanji ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                    <label className={`ml-2 ${!isKanji ? 'text-blue-500' : 'text-gray-500'}`}>Furigana</label>
                </div>

                {/* // End of Toggle */}
            </div>

            <div className="">
                <div className="no-scrollbar h-[65vh] lg:h-[75vh] overflow-auto scroll-smooth scrollbar-hide">
                    <div className="pb-2">
                        {chatComponent()}
        
                    </div>
                </div>

                <div className=" ">
                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            className="lg:w-9/12 w-full  p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="lg:w-3/12 w-full p-2 mt-4 lg:mt-0 lg:ml-4 rounded text-black bg-orange-200 transition duration-300"
                        >
                            Send
                        </button>

                    </form>
                </div>

            </div>
        </Template>
    );
}