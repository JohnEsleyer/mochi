'use client'
import Template from "@/components/PageTemplate";
import { Suspense, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import SavedTextPreview from "./savedTextPreview";
import AllSavedText from "./savedTextPreview";
import Groups from "./groups";


async function newGroup() {
    const { data, error } = await supabase
        .from('groups')
        .insert([
            {
                group_name: 'untitled',
                language: 'japanese'
            },
        ])
        .select()


};

export default function Saved() {


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
                    <Groups />
                </div>
                <div className="col-span-4 lg:col-span-5 p-5">
                    <div>

                        <p className="text-2xl font-bold">Recent</p>
                        <div className="flex-1 grid grid-cols-3">
                            <AllSavedText />


                        </div>
                    </div>

                </div>
            </div>

        </Template>
    );
}