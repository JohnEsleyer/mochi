'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

interface SavedTextPreviewProps {
    text: string;
    meaning: string;
    key: number;
    id: number;
}

interface Words{
    word: string;
    romaji: string;
    class: string;
    meaning: string;
    context: string;
}

interface JsonData {
    japanese: string;
    meaning: string;
    furigana: string;
    romaji: string;
    context: string;
    words: Record<string, Words>;
}


interface SaveData {
    created_at: string;
    id: number;
    text: string
    group_id: number;
}

async function getSavedData() {

    let { data, error } = await supabase
        .from('saved')
        .select('*')

    const saveData = data as SaveData[];
    
    
    return saveData;
}


const SavedTextPreview: React.FC<SavedTextPreviewProps> = ({ text, meaning, id }) => {
    // Executes when user has no saved texts
    if (id == null) {
        return <div></div>;
    }

    return (
        <div id={id.toString()} className="border border-white">
            <p>{text}</p>
            <p>{meaning}</p>
        </div>
    );
};

async function newGroup() {
    
    const { data, error } = await supabase
    .from('groups')
    .insert([
    { group_name: 'someValue'},
    ])
    .select()
  
    
};

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
           
                    <div className="bg-orange-200 text-black rounded">
                        <button 
                        className="grid grid-cols-3 p-2 w-full"
                        onClick={newGroup}
                        >
                        <p className="col-span-2">New group</p>
                        <span className="col-span-1 material-symbols-outlined flex justify-end">
                            add_box
                        </span>
                        </button>
                    </div>
               
                </div>
                <div className="col-span-4 lg:col-span-5 p-5">
                    <p className="text-2xl font-bold">Recent</p>
                    <div className="flex-1 grid grid-cols-3">
                        {
                            
                            userJsonData.map((value, index) => (
                                <SavedTextPreview key={index} id={index} text={value.japanese} meaning={value.meaning} />
                            ))
                            
                        }
                    </div>
                </div>
            </div>

        </Template>
    );
}