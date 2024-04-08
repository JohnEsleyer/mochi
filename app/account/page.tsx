'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Account(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template>
            <hr/>
            <h1>Account</h1>
            </Template>
    );  
}