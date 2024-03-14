'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";

interface ResponseMessage {
    message: string,
}


export default function ChatAI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState<string[]>([
        "Hi, my name is Mochi. I am your personal Japanese conversation partner. Let's talk"
    ]);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>


            <div className="">
                <div className="no-scrollbar h-[65vh] lg:h-[80vh] overflow-auto scroll-smooth scrollbar-hide">
                    <h1>Chatbot</h1>
                    <div>
                        {conversation.map((message, index) => (
                            <p key={index}><strong>{index % 2 === 0 ? 'Bot' : 'You:'}</strong> {message}</p>
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