'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Learn(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template className={isLoading ? 'shimmer-effect' : ''}>
            <h1>Learn</h1>
            </Template>
    );  
}