import supabase from "@/utils/supabase";
import error from "next/error";
import { useEffect, useState } from "react";

interface GroupsJsonData {
    id: number;
    created_at: string;
    group_name: string;
}

function Groups() {
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
            {
                groups.map((value, index) => (
                    <div key={index}>
                        {value.group_name}
                    </div>
                ))
            }
        </div>
    );

}

export default Groups;