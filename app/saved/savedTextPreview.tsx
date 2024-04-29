'use client'

import supabase from "@/utils/supabase";
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "./groupContext";

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
    const { currentGroupData } = useContext(GroupContext)!;

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

    useEffect(() => {
        const fetchSavedData = async () => {
            try {
                let savedData, e;
                if (currentGroupData.id == -1) {
                    const { data, error } = await supabase
                        .from('saved')
                        .select('*');
                    savedData = data;
                    e = error;
                } else {
                    const { data, error } = await supabase
                        .from('saved')
                        .select('*')
                        .eq('group_id', currentGroupData.id);
                    savedData = data;
                    e = error;
                }


                const saveData = savedData as SaveData[];

                let temp: JsonData[] = [];
                saveData.map((value) => {
                    temp.push(JSON.parse(value.text) as JsonData);
                });
                if (e) {
                    throw e;
                }
                setSavedJsonData(temp);

            } catch (e) {
                console.error('Error fetching data');
            }
        };

        fetchSavedData();

    }, [currentGroupData.id]);


    const items = Array.from({ length: 20 }, (_, index) => index); // Create an array [0, 1, 2, ..., 19]

    return (
        <div className="col-span-3 h-10">
            <p>
                Group: {currentGroupData.id}</p>
            <div className="flex flex-row flex-wrap">
                {
                    savedJsonData.map((value, index) => (
                        <div key={index} className="border shadow-xl rounded border-gray-700 p-5 m-2">
                            <p key={index} className="">{value.japanese}</p>
                            <p key={index} className="">{value.meaning}</p>
                        </div>
                    ))
                }

            </div>

        </div>
    );
}


export default AllSavedText;


