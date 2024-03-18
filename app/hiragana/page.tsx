'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Hiragana(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template>
            <hr/>
            <h1>Hiragana</h1>
            </Template>
    );  
}