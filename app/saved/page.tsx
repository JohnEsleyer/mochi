'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Saved(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <hr/>
            <h1>Saved</h1>
            </Template>
    );  
}