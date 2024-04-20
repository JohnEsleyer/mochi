import supabase from "@/utils/supabase";
import error from "next/error";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "./GroupContext";

interface GroupsJsonData {
    id: number;
    created_at: string;
    group_name: string;
}


function Groups() {
    const { setCurrentGroupData } = useContext(GroupContext)!;
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
            <button className="hover:bg-white w-full hover:text-black" onClick={() => {
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
                        <button className="hover:bg-white w-full hover:text-black" onClick={() => {
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