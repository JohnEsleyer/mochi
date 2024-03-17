'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Katakana(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <hr/>
            <h1>Katakana</h1>
            </Template>
    );  
}