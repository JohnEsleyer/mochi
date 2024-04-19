'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

interface SavedTextPreviewProps {
    text: string;
    meaning: string;
}

interface Words{
    word: string;
    romaji: string;
    class: string;
    meaning: string;
    context: string;
}

interface Body {
    japanese: string;
    meaning: string;
    furigana: string;
    romaji: string;
    context: string;
    words: Record<string, Words>;
}

interface JsonData {
    lang: string;
    body: Body;
}


const SavedTextPreview: React.FC<SavedTextPreviewProps> = ({ text, meaning }) => {
    return (
        <div className="border border-white ">
            <p>{text}</p>
            <p>{meaning}</p>
        </div>
    );
}

interface SaveData {
    created_at: string;
    id: number;
    text: string
}

async function getSavedData() {

    let { data, error } = await supabase
        .from('saved')
        .select('*')

    const saveData = data as SaveData[];
    if (error) {
        console.log(error);
        throw error;
    }
    
    console.log(saveData[0].text);
    
    
    return saveData;
}


export default function Katakana() {


    const [isError, setIsError] = useState(false);
    const [userJsonData, setUserJsonData] = useState<JsonData[]>([]);
    const [userSavedData, setUserSavedData] = useState<SaveData[]>([]);

    useEffect(() => {

        try {

            const savedData = getSavedData();

            if (savedData !== null) {
                console.log(savedData.then((value) => {
                    setUserSavedData(value);
                }));
            }

            let temp: JsonData[] = [];
            savedData.then((value) => {
                value.forEach((value2, index) => {
                    temp.push(JSON.parse(value2.text) as JsonData);
                });
            });

            setUserJsonData(temp);

        
          

        } catch (e) {
            console.log(e);
            setIsError(true);
        }

    }, []);

    return (
        <Template>
            <div className="h-full grid grid-cols-6">
                <div className="col-span-2 lg:col-span-1 bg-gray-900 p-2 pt-4">
                    <p>Groups</p>
                    <div className="grid grid-cols-3 p-2 bg-orange-200 text-black rounded">
                        <p className="col-span-2">New group</p>
                        <span className="col-span-1 material-symbols-outlined flex justify-end">
                            add_box
                        </span>
                    </div>
                </div>
                <div className="col-span-4 lg:col-span-5 p-5">
                    <p className="text-2xl font-bold">Recent</p>
                    <div className="flex-1 grid grid-cols-3">
                        <SavedTextPreview text="こんにちは" meaning="Hello" />
                        {
                            userJsonData.map((value, index) => (
                               
                                <SavedTextPreview text={value.body.japanese} meaning={value.body.meaning} />
                            ))
                        }
                    </div>

                </div>

            </div>

        </Template>
    );
}