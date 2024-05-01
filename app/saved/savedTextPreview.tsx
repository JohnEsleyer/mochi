'use client'

import supabase from "@/utils/supabase";
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "./groupContext";
import React from "react";
import Image from "next/image";
import ArrowBack from "/public/arrow_back.svg"
import Loading from "/public/loading.svg"
import { colorWordClass } from "@/utils/colors";

interface Word {
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
    words: Word[];
}

interface SavedData {
    created_at: string;
    id: number;
    text: string
    group_id: number;
}

function AllSavedText() {
    const { currentGroupData } = useContext(GroupContext)!;

    var heightWidth;
    if (typeof window == "undefined") {
        console.log('Server');
    } else {
        heightWidth = window.innerHeight > window.innerWidth;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [savedJsonData, setSavedJsonData] = useState<JsonData[]>([]);
    const [savedData, setSavedData] = useState<SavedData[]>([]);
    const [toDeleteId, setToDeleteId] = useState(0);
    const [isShowAnalysis, setIsShowAnalysis] = useState(false);
    const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(24);


    useEffect(() => {
        const fetchSavedData = async () => {
            try {
                const { data, error } = await supabase
                    .from('saved')
                    .select('*')

                const saveData = data as SavedData[];
                setSavedData(saveData);
                let temp: JsonData[] = [];
                saveData.map((value) => {
                    console.log('map:' + value.id);
                    // Add id to the savedData object
                    let jsonDataObj = JSON.parse(value.text) as JsonData;
        
                    
                    temp.push(jsonDataObj);
                   
                });
                if (error) {
                    throw error;
                }

                setSavedJsonData(temp);


            } catch (error) {
                console.error('Error' + error);
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


                const saveData = savedData as SavedData[];

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


    useEffect(() => {
        console.log('load useEffect executed!');
        setIsShowAnalysis(false);

        const wait2Seconds = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            setIsLoading(false);
        }

        setIsLoading(true);
        wait2Seconds();
        
    }, [currentGroupData]);

    const handleDelete = async () => {
        setIsLoading(true);
        console.log("toDelete:" + toDeleteId);
        const { error } = await supabase
        .from('saved')
        .delete()
        .eq('id', savedData[currentAnalysisIndex].id);
        if (error){
            console.log(error);
        }
        setIsLoading(false);
        setIsShowAnalysis(false);
    };

    const items = Array.from({ length: 20 }, (_, index) => index); // Create an array [0, 1, 2, ..., 19]

    
    if (isLoading) {
        console.log('isLoading executed');
        return (<div className="h-full col-span-3 flex items-center justify-center">
        <Image src={Loading}
            width={50}
            height={50}
            alt="Loading"
        />
    </div>);
    }

    return (
        <div className="col-span-3 h-10">
            {isShowAnalysis ? <div className="h-full ">
                {
                
                        <div className='h-full'>

                            <div className="border-2 rounded flex flex-col opacity-100 transform transition-opacity duration-500 ease-in-out">
                                {/* // Header */}

                                <div className="row-span-3 bg-gray-900 shadow-2xl overflow-y-auto no-scrollbar">
                                    <div className="flex justify-start">

                                       <button
                                            onClick={() => {
                                               setIsShowAnalysis(false);
                                            }}
                                        ><Image
                                                src={ArrowBack}
                                                width={30}
                                                height={30} alt={""}
                                            /></button>

                                        <p className='font-bold text-3xl mr-4 p-2 mt-1'>

                                            Words Breakdown
                                        </p>

                                        <div className="flex items-center">

                                            <span>
                                            <button onClick={handleDelete}>
                                                <span className="hover:text-red-500 material-symbols-outlined">
                                                        delete
                                                </span>
                                                </button>
                                                
                                               
                                            </span>

                                        </div>


                                    </div>
                                    <div>
                                        <span className='font-bold text-3xl mr-4 p-2'>{
                                            Object.keys(savedJsonData[currentAnalysisIndex].words).map((value, index) => (
                                                <React.Fragment key={index}>
                                                    <span className={`text-3xl font-bold mb-2 ${
                                                        savedJsonData[currentAnalysisIndex].words[index].class in colorWordClass ? 
                                                        colorWordClass[savedJsonData[currentAnalysisIndex].words[index].class] : 'text-white-300'}`}>
                                                        {savedJsonData[currentAnalysisIndex].words[index].word}
                                                    </span>
                                                </React.Fragment>
                                            ))
                                        }</span>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto no-scrollbar">
                                           
                                    {/* // Words List */}

                                    <div className="h-80 lg:flex lg:flex-wrap">
                                        
                                        {Object.keys(savedJsonData[currentAnalysisIndex].words).map((value, index) => (
                                            <React.Fragment key={index}>
                                                <div className='container lg:w-1/2 flex flex-col rounded-lg p-4 shadow-md lg:shadow-lg'>
                                                    <span className={`text-3xl font-bold mb-2 ${savedJsonData[currentAnalysisIndex].words[index].class in colorWordClass ? 
                                                        colorWordClass[savedJsonData[currentAnalysisIndex].words[index].class] : 'text-white-300'}`}>
                                                        {savedJsonData[currentAnalysisIndex].words[index].word}
                                                    </span>
                                                    <span className='text-lg '><b>Romaji</b>: {savedJsonData[currentAnalysisIndex].words[index].romaji}</span>
                                                    <span className='text-lg '><b>Class</b>: {savedJsonData[currentAnalysisIndex].words[index].class}</span>
                                                    <span className='text-lg '><b>Meaning</b>: {savedJsonData[currentAnalysisIndex].words[index].meaning}</span>
                                                    <span className='text-lg '><b>Context</b>: {savedJsonData[currentAnalysisIndex].words[index].context}</span>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                     
                }
            </div> :
                <div className="flex flex-row flex-wrap">
                    {
                        savedJsonData.map((value, index) => (
                            <button key={index} onClick={() => {
                                setCurrentAnalysisIndex(index);
                                setIsShowAnalysis(true);
                                
                            }}>
                                <div className="border hover:bg-gray-900 shadow-xl rounded border-gray-700 p-5 m-2">
                                    <p className="">{value.japanese}</p>
                                    <p className="">{value.meaning}</p>

                                </div>
                            </button>

                        ))
                    }

                </div>}
        </div>
    );
}


export default AllSavedText;


