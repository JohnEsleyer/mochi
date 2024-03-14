'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";

interface ResponseMessage{
    message: string,
}


export default function ChatAI(){
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
            if (prevMessage.length <= 1){
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
            }else{
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
            
            <div>
            <h1>Chatbot</h1>
            <div>
                {conversation.map((message, index) => (
                    <p key={index}><strong>{index % 2 === 0 ? 'Bot' : 'You:'}</strong> {message}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="text-black"
                />
                <button type="submit">Send</button>
            </form>
        </div>
            </Template>
    );  
}