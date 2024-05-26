'use client'

import supabase from "@/utils/supabase";
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import { CurrentGroupContext, GroupsJsonData, JsonData, SavedData, SavedText } from "./types";
import React from "react";
import Image from "next/image";
import ArrowBack from "/public/arrow_back.svg"
import Loading from "/public/loading.svg"
import { colorWordClass } from "@/utils/colors";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useGroups } from "./providers/GroupArrayProvider";
import { useCurrentGroup } from "./providers/CurrentGroupProvider";



function AllSavedText() {
    var heightWidth;
    if (typeof window == "undefined") {
        console.log('Server');
    } else {
        heightWidth = window.innerHeight > window.innerWidth;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(0);
    const [isShowAnalysis, setIsShowAnalysis] = useState(false);
    const [currentAnalysisID, setCurrentAnalysisID] = useState(1);
    const {groups, setGroups} = useGroups();
    const {currentGroupData, setCurrentGroupData} = useCurrentGroup();
    const [savedTexts, setSavedTexts] = useState<SavedText[]>([]);
    

    const fetchSavedData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('save')
                .select('*')

            const saveData = data as SavedData[];
            let temp: SavedText[] = [];
            saveData.map((value) => {
                // Add id to the savedData object
                let jsonDataObj = JSON.parse(value.text) as JsonData;
                console.log(jsonDataObj);

                temp.push({
                    meta: value,
                    body: jsonDataObj,
                } as SavedText);

            });
            if (error) {
                throw error;
            }else{
                setSavedTexts(temp);
            }
    
        
        } catch (error) {
            console.error('Error' + error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        
        

        const fetchGroupData = async () => {
            try {
                let { data, error } = await supabase
                    .from('groups')
                    .select('*')

                if (error) {
                    throw error;
                }
                console.log(data);
                setGroups(data as GroupsJsonData[]);

            } catch (error) {
                console.log("Error fetching data");
            }

        };
        fetchGroupData();
        fetchSavedData();

    }, []);



    useEffect(() => {
       
        fetchSavedData();

    }, [currentGroupData.id]);

    const wait2Seconds = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }


    useEffect(() => {
        console.log('load useEffect executed!');
        setIsShowAnalysis(false);

        setIsLoading(true);
        wait2Seconds();
        setIsLoading(false);
    }, [currentGroupData]);

    const handleDelete = async () => {
        setIsLoading(true);
        const { error } = await supabase
            .from('save')
            .delete()
            .eq('id', currentAnalysisID);
        if (error) {
            console.log(error);
        }
        setIsLoading(false);
        setIsShowAnalysis(false);
    };

    const handleMoveToGroup = (value: any) => {
        
        const updateSavedText = async () => {
            const { data, error } = await supabase
                .from('save')
                .update({ group_id: value.id })
                .eq('id', currentAnalysisID)
                .select();

            if (error) {
                console.log(error);
            }else{
                setSavedTexts((values) =>
                    values.map((val) => {
                      if (currentAnalysisID == val.meta.id) {
                        return {
                          meta: {
                            ...val.meta,
                            group_id: value.id,
                          },
                          body: {...val.body}
                        };
                      } else {
                        return val; // Return the original value unchanged
                      }
                    })
                  );
                
                  setCurrentGroupData(value);
            }
        }

        updateSavedText();
        setIsLoading(true);
        wait2Seconds();
        setIsShowAnalysis(false);
    };

    const items = Array.from({ length: 20 }, (_, index) => index); // Create an array [0, 1, 2, ..., 19]


    if (isLoading) {
        return (<div className="h-96 col-span-3 flex items-center justify-center">
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

                        <div className="border-2 border-gray-700 rounded flex flex-col opacity-100 transform transition-opacity duration-500 ease-in-out">
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
                                            <div className="flex flex-wrap">
                                                <button onClick={handleDelete} >
                                                    <span className="p-1 hover:text-red-500 flex justify-center material-symbols-outlined">
                                                        delete
                                                    </span>
                                                </button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger><span className="p-2 text-xs hover:border">
                                                        Change Group
                                                    </span></DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-gray-700 p-2">
                                                        {groups.map((value, index) => (
                                                            <DropdownMenuItem key={index}
                                                                className="hover:bg-orange-200 hover:text-black"
                                                                onClick={() => {
                                                                  handleMoveToGroup(value);

                                                                }}
                                                            >
                                                                {value.group_name}
                                                            </DropdownMenuItem>

                                                        ))}

                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            </div>

                                        </span>

                                    </div>

                                </div>
                                <div>
                                    <span className='font-bold text-3xl mr-4 p-2'>{

                                        savedTexts.map((savedText) => (
                                            savedText.meta.id == currentAnalysisID && Object.keys(savedText.body.words).map((value, index) => (
                                                <React.Fragment key={index}>
                                                    <span className={`text-3xl font-bold mb-2 ${savedText.body.words[index].class in colorWordClass ?
                                                        colorWordClass[savedText.body.words[index].class] : 'text-white-300'}`}>
                                                        {savedText.body.words[index].word}
                                                    </span>
                                                </React.Fragment>
                                            ))
                                        ))

                                        
                                    }</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar">

                                {/* // Words List */}

                                <div className="h-80 lg:flex lg:flex-wrap">

                                    {
                                    savedTexts.map((savedText) => (
                                        savedText.meta.id == currentAnalysisID && Object.keys(savedText.body.words).map((value, index) => (
                                                <div className='container lg:w-1/2 flex flex-col rounded-lg p-4 shadow-md lg:shadow-lg'>
                                                    <span className={`text-3xl font-bold mb-2 ${savedText.body.words[index].class in colorWordClass ?
                                                        colorWordClass[savedText.body.words[index].class] : 'text-white-300'}`}>
                                                        {savedText.body.words[index].word}
                                                    </span>
                                                    <span className='text-lg '><b>Romaji</b>: {savedText.body.words[index].romaji}</span>
                                                    <span className='text-lg '><b>Class</b>: {savedText.body.words[index].class}</span>
                                                    <span className='text-lg '><b>Meaning</b>: {savedText.body.words[index].meaning}</span>
                                                    <span className='text-lg '><b>Context</b>: {savedText.body.words[index].context}</span>
                                                </div>
  
                                        ))
                                    ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>


                }
            </div> :
                <div className="flex flex-row flex-wrap">
                    {savedTexts.length > 0 ? <div>
                    {
                        savedTexts.map((value, index) => {
                            if (value.body){
                                if(currentGroupData.id == value.meta.group_id){
                                return (
                                    <button key={index} onClick={() => {
                                        setCurrentAnalysisID(value.meta.id);
                                        setIsShowAnalysis(true);
    
                                    }}>
                                        <div className="border hover:bg-gray-900 shadow-xl rounded border-gray-700 p-5 m-2">
                                            <p className="">{value.body.japanese}</p>
                                            <p className="">{value.body.meaning}</p>
                                            <p>{value.meta.id}</p>
    
                                        </div>
                                    </button>)
                                }
                            }

                        })
                    }
                    </div> : <div className="w-full h-96 flex items-center justify-center text-gray-400">
                            <p>Your analyzed texts awaityou here. Start saving with a tap on the star icon during analysis.</p>
                        </div>
                        }
                    
                </div>}
               
        </div>
    );
}


export default AllSavedText;


