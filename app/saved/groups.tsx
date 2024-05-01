import supabase from "@/utils/supabase";
import error from "next/error";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "./groupContext";

interface GroupsJsonData {
    id: number;
    created_at: string;
    group_name: string;
}


function Groups() {
    const {currentGroupData, setCurrentGroupData } = useContext(GroupContext)!;
    const [groups, setGroups] = useState<GroupsJsonData[]>([]);

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
    }, []);

    

    return (
        <div>
            <button className={`hover:bg-orange-200 rounded w-full hover:text-black ${currentGroupData.id == -1 ? 'bg-orange-200 text-black' : ''}`} onClick={() => {
                            setCurrentGroupData({
                                id:-1,
                                group_name: 'All'
                            });
                        }}>
                        All
                        </button>
            {
                groups.map((value, index) => (
                    <div key={index}>
                        <button className={`hover:bg-orange-200 rounded w-full hover:text-black ${currentGroupData.id == value.id ? 'bg-orange-200 text-black' : ''}`} onClick={() => {
                            setCurrentGroupData({
                                id: value.id,
                                group_name: value.group_name,
                            });
                        }}>
                        {value.group_name}
                        </button>
                    </div>
                ))
            }
        </div>
    );

}

export default Groups;