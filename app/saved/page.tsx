'use client'
import Template from "@/components/PageTemplate";
import { Suspense, createContext, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import SavedTextPreview from "./savedTextPreview";
import AllSavedText from "./savedTextPreview";
import Groups from "./groups";
import { GroupContext } from "./groupContext";
import Loading from '/public/loading.svg';
import Image from "next/image";

export default function Saved() {
    const [currentGroupData, setCurrentGroupData] = useState({
        id: -1, // -1 value for no group
        group_name: 'All',
    });
    const [showGroups, setShowGroups] = useState(true);



    const newGroup = async () =>  {
        setShowGroups(false);
        const { data, error } = await supabase
            .from('groups')
            .insert([
                {
                    group_name: 'untitled',
                    language: 'japanese'
                },
            ])
            .select();

        setShowGroups(true)

    };

    const handleDeleteGroup = async () => {
        setShowGroups(false);
        const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', currentGroupData.id);
        setCurrentGroupData(
            {id: -1, // -1 value for no group
        group_name: 'All',})
        setShowGroups(true);
                
    };

    
    return (
        <Template>
            <GroupContext.Provider value={{ currentGroupData, setCurrentGroupData }}>
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
                        {
                            showGroups ? <Groups /> : <div className="flex items-center justify-center">
                                <Image src={Loading}
                                    width={50}
                                    height={50}
                                    alt="Loading"
                                />
                            </div>
                        }
                    </div>
                    <div className="col-span-4 overflow-y-scroll lg:col-span-5 p-5">
                        <div className="h-10">
                            <p className="text-2xl font-bold">
                                <button onClick={handleDeleteGroup}>
                                <span className="material-symbols-outlined ">
                                    delete
                                </span>
                                </button>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>{currentGroupData.group_name}</p>
                            <div className="flex-1 grid grid-cols-3 ">
                                <AllSavedText />

                            </div>
                        </div>

                    </div>
                </div>
            </GroupContext.Provider>
        </Template>
    );
}