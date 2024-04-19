'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

interface SavedTextPreviewProps {
    text: string;
    meaning: string;
}

const SavedTextPreview: React.FC<SavedTextPreviewProps> = ({text, meaning}) => {
    return (
        <div className="border border-white ">
            <p>{text}</p>
            <p>{meaning}</p>
        </div>
    );
}


async function getSavedData() {

    let { data: saved, error } = await supabase
    .from('saved')
    .select('*')
    
    if (error){
     
        throw error;
    }

    return saved;
}

export default function Katakana(){

    const [isError, setIsError] = useState(false);


    useEffect(() => {
        
       try{
        const saved = getSavedData();
        console.log(saved);
       }catch(e){
        console.log(e);
        setIsError(true);
       }
                
    }, []);

    return (
        <Template>
            <div className="h-full grid grid-cols-6 bg-blue-300">
            <div className="col-span-2 lg:col-span-1 bg-gray-900 p-2 pt-4">
                <p>Groups</p>
                <div className="grid grid-cols-3 p-2 bg-orange-200 text-black rounded">
                <p className="col-span-2">New group</p>
                <span className="col-span-1 material-symbols-outlined flex justify-end">
                    add_box
                </span>
                </div>
            </div>
            <div className="col-span-4 lg:col-span-5 p-5 bg-green-300">
                <p className="text-2xl font-bold bg-green-300">Recent</p>
                <div className="flex-1 grid grid-cols-3 bg-yellow-300">
                    <SavedTextPreview text="こんにちは" meaning="Hello" />
                </div>
                
            </div>
            </div>
            
            </Template>
    );  
}