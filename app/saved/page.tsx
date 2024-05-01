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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export default function Saved() {
    const [currentGroupData, setCurrentGroupData] = useState({
        id: -1, // -1 value for no group
        group_name: 'Default',
    });
    const [showGroups, setShowGroups] = useState(true);
    const [renameValue, setRenameValue] = useState('');

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

    const handleRenameGroup = async () => {
        setShowGroups(false);
        const { data, error } = await supabase
        .from('groups')
        .update({ group_name: renameValue })
        .eq('id', currentGroupData.id);

        setShowGroups(true);
                
    }

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
      
                        <div className="pt-2">
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
                        
                    </div>
                    <div className="col-span-4 overflow-y-scroll lg:col-span-5 p-5">
                      
                            <div className="h-10">
                            
                                {currentGroupData.id == -1 ? <div></div>: <div><button onClick={handleDeleteGroup}>
                                
                                </button>
                                <AlertDialog>
                                <AlertDialogTrigger>
                                <span className="material-symbols-outlined hover:text-red-500">
                                    delete
                                </span>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-900 text-white">
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:text-white" onClick={handleDeleteGroup}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                                
                                <AlertDialog>
                                <AlertDialogTrigger><span className="material-symbols-outlined hover:text-green-500">
                                                                    edit
                                                                </span></AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-900 text-white">
                                    <AlertDialogHeader>
                                    <AlertDialogTitle className="flex justify-center">Rename Group</AlertDialogTitle>
                                    <AlertDialogDescription className="flex justify-center">
                                        <input className="w-64 h-8 rounded text-black"
                                            placeholder="Group 1"
                                            onChange={(event) => {
                                            setRenameValue(event.target.value);
                                        }}>
                                        </input>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleRenameGroup}className="bg-green-500 hover:bg-green-500">Rename</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog> </div> }
                               
                                {showGroups ? <p className="text-2xl font-bold">{currentGroupData.group_name}</p> : <div>...</div>}
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