'use client'

import supabase from "@/utils/supabase";
import { group } from "console";
import { useEffect, useState } from "react";


interface Words {
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

function AllSavedText() {
    const [savedJsonData, setSavedJsonData] = useState<JsonData[]>([]);
 

    useEffect(() => {
        const fetchSavedData = async () => {
            try {
                const { data, error } = await supabase
                    .from('saved')
                    .select('*')

                const saveData = data as SaveData[];

                let temp: JsonData[] = [];
                saveData.map((value) => {
                    temp.push(JSON.parse(value.text) as JsonData);
                });
                if (error) {
                    throw error;
                }
                setSavedJsonData(temp);

            } catch (error) {
                console.error('Error fetching data');
            }
        };

        fetchSavedData();

    }, []);

    return (
        <div className="flex flex-row">
            {
               savedJsonData.map((value, index) => (
                <div className="border border-white ">
                <p key={index} className="">{value.japanese}</p>
                <p key={index} className="">{value.meaning}</p>
                </div>
            ))
            }
        </div>
    );
}


export default AllSavedText;


