'use client'

import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

interface SavedTextPreviewProps {
    text: string;
    meaning: string;
    key: number;
    id: number;
}

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
               savedJsonData.map(saved => (
                <p className="border border-white">{saved.japanese}</p>
               ))
            }
        </div>
    );
}


export default AllSavedText;


