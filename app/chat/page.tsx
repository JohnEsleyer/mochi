'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function ChatAI(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <h1>Chat</h1>
            </Template>
    );  
}