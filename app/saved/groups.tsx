import supabase from "@/utils/supabase";
import error from "next/error";
import { useContext, useEffect, useState } from "react";
import { CurrentGroupContext, GroupDataType } from "./types";
import { useGroups } from "./providers/GroupArrayProvider";
import { useCurrentGroup } from "./providers/CurrentGroupProvider";



function Groups() {
    const { currentGroupData, setCurrentGroupData } = useCurrentGroup();
    const { groups, setGroups } = useGroups();

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
                setGroups(data as GroupDataType[]);

            } catch (error) {
                console.log("Error fetching data");
            }

        };
        fetchGroupData();
    }, []);

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
        
        if (error){
            console.log(error);
        }else{
            setGroups((prevValues) => (
                [...prevValues, {
                    id: (data as GroupDataType[])[0].id, 
                    group_name: (data as GroupDataType[])[0].group_name
                }]
            ));
        }
    };


    return (
        <div>
            <p className="text-xl font-bold flex justify-center p-2">Groups</p>
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
                <button className={`hover:bg-gray-400 w-full hover:text-black ${currentGroupData.id == -1 ? 'bg-gray-300 text-black' : ''}`} onClick={() => {
                    setCurrentGroupData({
                        id: -1,
                        group_name: 'Default'
                    });
                }}>
                    Default
                </button>
                {
                    groups.map((value, index) => (
                        <div key={index}>
                            <button className={`hover:bg-gray-400 w-full hover:text-black ${currentGroupData.id == value.id ? 'bg-gray-300 text-black' : ''}`} onClick={() => {
                                setCurrentGroupData({
                                    id: value.id,
                                    group_name: value.group_name,
                                });
                            }}>
                                <p className="truncate">{value.group_name}</p>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );

}

export default Groups;