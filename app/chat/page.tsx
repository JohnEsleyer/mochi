'use client'
import Template from "@/components/PageTemplate";
import Typewriter from "@/components/typewriter";
import { useEffect, useState } from "react";


export default function ChatAI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState<string[]>([
        "当店の寿司レストランへようこそ。ご注文はお決まりでしょうか、それともおすすめをお聞きになりますか？"
    ]);

    const [isKanji, setIsKanji] = useState(true);

    const toggleSwitch = () => {
        setIsKanji((prev) => {
            if (!prev == true){
                setConversation(
                    ["当店の寿司レストランへようこそ。ご注文はお決まりでしょうか、それともおすすめをお聞きになりますか"]
                )
            }else{
                setConversation(
                    ["とうてんのすしれすとらんへようこそ。ごちゅうもんはおきまりでしょうか、それともおすすめをおききになりますか"]
                )
            }
            return !prev
        });

        
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setConversation([...conversation, `${inputText}`]);
        setInputText('');
        const prevMessage = [...conversation, `${inputText}`];
        try {
            if (prevMessage.length <= 1) {
                const response = await fetch('/api/chat', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: {
                            isEmpty: true,
                            conversation: prevMessage,
                        },
                    }),
                });
                const { body } = await response.json();
                setTimeout(() => {
                    setConversation([...prevMessage, `${body.message}`]);
                }, 500);
            } else {
                const response = await fetch('/api/chat', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: {
                            isEmpty: false,
                            conversation: prevMessage,
                        },
                    }),
                });
                const { body } = await response.json();
                setTimeout(() => {
                    setConversation([...prevMessage, body.message]);
                }, 500);
            }

        } catch (error) {
            console.error('Error:', error);
        }

    };


    const tryAgain = async () => {
        setConversation([...conversation, `${inputText}`]);
        setInputText('');
        const prevMessage = [...conversation, `${inputText}`];
        try {
            if (prevMessage.length <= 1) {
                const response = await fetch('/api/chat', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: {
                            isEmpty: true,
                            conversation: prevMessage,
                        },
                    }),
                });
                const { body } = await response.json();
                setTimeout(() => {
                    setConversation([...prevMessage, `${body.message}`]);
                }, 500);
            } else {
                const response = await fetch('/api/chat', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: {
                            isEmpty: false,
                            conversation: prevMessage,
                        },
                    }),
                });
                const { body } = await response.json();
                setTimeout(() => {
                    setConversation([...prevMessage, body.message]);
                }, 500);
            }

        } catch (error) {
            console.error('Error:', error);
        }

    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

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
                    <label className={`ml-2 ${!isKanji ? 'text-blue-500' : 'text-gray-500'}`}>Hiragana</label>
                </div>

                {/* // End of Toggle */}
            </div>

            <div className="">
                <div className="no-scrollbar h-[65vh] lg:h-[75vh] overflow-auto scroll-smooth scrollbar-hide">
                    <div className="pb-2">
                        {conversation.map((message, index) => (
                            <div className="p-2">

                                <p className="text-lg" key={index}><strong>{index % 2 === 0 ?
                                    <span className="text-purple-300">🤖Mochi:</span> :
                                    <span className="text-green-300 typewriter">😄You:</span>}</strong>
                                    {message == "ERROR"  && <span className="text-amber-300">
                                        {" " + "Server is overloaded with requests, please try again later"}
                                        <button onClick={tryAgain} className="rounded text-xs p-1 text-black bg-orange-200 transition duration-300">Try Again</button></span>}</p>
                                <p className="text-lg typewriter">{message}</p>
                            </div>
                        ))}
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