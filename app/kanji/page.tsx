'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Kanji(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template>
            <hr/>
            <h1>Kanji</h1>
            </Template>
    );  
}