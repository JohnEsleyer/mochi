'use client'
import Template from "@/components/PageTemplate";
import { Suspense, createContext, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import SavedTextPreview from "./savedTextPreview";
import AllSavedText from "./savedTextPreview";
import Groups from "./groups";
import { GroupArrayContext, GroupContextType, CurrentGroupContext } from "./types";
import Loading from '/public/loading.svg';
import Image from "next/image";

import { GroupArrayProvider } from "./providers/GroupArrayProvider";
import RightSection from "./RightSection";


export default function Saved() {
    const [currentGroupData, setCurrentGroupData] = useState({
        id: -1, // -1 value for no group
        group_name: 'Default',
    });
    const [showGroups, setShowGroups] = useState(true);

    const newGroup = async () => {
        const { data, error } = await
            supabase
                .from('groups')
                .insert([
                    {
                        group_name: 'untitled',
                        language: 'japanese'
                    },
                ])
                .select();

    };


    return (
        <Template>
            <GroupArrayProvider>
                <CurrentGroupContext.Provider value={{ currentGroupData, setCurrentGroupData }}>
                    <div className="h-full grid grid-cols-6">
                        <div className="col-span-2 lg:col-span-1 bg-gray-900 p-2 pt-4">
                            <Groups />
                        </div>
                        <RightSection />
                    </div>
                </CurrentGroupContext.Provider>
            </GroupArrayProvider>
        </Template>
    );
}