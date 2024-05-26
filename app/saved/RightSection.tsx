import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import AllSavedText from "./savedTextPreview";
import { useCurrentGroup } from "./providers/CurrentGroupProvider";
import { CurrentGroupContext } from "./types";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";


export default function RightSection() {
    const {currentGroupData, setCurrentGroupData } = useCurrentGroup();
    const [renameValue, setRenameValue] = useState('');

    const handleDeleteGroup = async () => {
        // setShowGroups(false);
        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('id', currentGroupData.id);
        setCurrentGroupData(
            {
                id: -1, // -1 value for no group
                group_name: 'All',
            })
        // setShowGroups(true);

    };

    useEffect(() => {

    }, []);

    const handleRenameGroup = async (event: any) => {
        setRenameValue(event.target.value);
        setCurrentGroupData({
            id: currentGroupData.id,
            group_name: renameValue,
        });
        const { data, error } = await supabase
            .from('groups')
            .update({ group_name: renameValue })
            .eq('id', currentGroupData.id);

        if (error) {
            console.log(error);
        }

    }

    return (
        <div className="col-span-4 overflow-y-scroll lg:col-span-5 p-5">

            <div className="h-10">

                {currentGroupData.id == -1 ? <div></div> : <div>
                <div className="flex flex-col">
                    <input
                        className=" pl-1 text-2xl bg-gray-800 font-bold"
                        name="title"
                        type="text"
                        disabled={false}
                        value={currentGroupData.group_name}
                        onChange={(event) => {
                            console.log("Current Group ID:" + currentGroupData.id);
                            console.log(currentGroupData.group_name);
                            handleRenameGroup(event);
                        }}
                    />
                    <button onClick={handleDeleteGroup}>
                        <span className="flex items-center hover:text-red-500">

                            <span className="material-symbols-outlined">
                                delete
                            </span>
                            Delete Group
                        </span>

                    </button>
                    </div>
                </div>}

                <div className="flex-1 grid grid-cols-3 ">
                    <AllSavedText />

                </div>
            </div>

        </div>

    );
}