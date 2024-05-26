
import AllSavedText from "./savedTextPreview";
import { useCurrentGroup } from "./providers/CurrentGroupProvider";
import { CurrentGroupContext } from "./types";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useGroups } from "./providers/GroupArrayProvider";
import Loading from '/public/loading.svg';
import Image from 'next/image';
import OverlayDialog from "@/components/OverlayDialog";

// This is the component displayed on the right section of the 'Save' page.
// Displays the Japanese texts saved by the users
export default function RightSection() {
    const { currentGroupData, setCurrentGroupData } = useCurrentGroup();
    const [renameValue, setRenameValue] = useState('');
    const { groups, setGroups } = useGroups();
    const [loadDelete, setLoadDelete] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    const handleDeleteGroup = async () => {
        setLoadDelete(true);
        handleOpenDialog();
        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('id', currentGroupData.id);

        if (error) {
            console.log(error);
        } else {
            setCurrentGroupData(
                {
                    id: -1, // -1 value for no group
                    group_name: 'All',
                })

            setGroups(groups.filter((value) => (
                value.id !== currentGroupData.id
            )));

        }

    };

    useEffect(() => {
        if (loadDelete) {
            setTimeout(() => {
                setLoadDelete(false);
            }, 2000);
        }
    }, [loadDelete]);


    const handleRenameGroup = async (event: any) => {
        setRenameValue(event.target.value);
        setCurrentGroupData({
            id: currentGroupData.id,
            group_name: event.target.value,
        });
        const { data, error } = await supabase
            .from('groups')
            .update({ group_name: event.target.value })
            .eq('id', currentGroupData.id);

        if (error) {
            console.log(error);
        } else {
            setGroups((prevValues) => (
                prevValues.map((value) => (
                    value.id == currentGroupData.id ? { id: currentGroupData.id, group_name: event.target.value } : value
                ))
            ));
        }

    }

    useEffect(() => {
        setRenameValue(currentGroupData.group_name);
    }, [currentGroupData]);

    return (
        <div className="col-span-4 overflow-y-scroll lg:col-span-5 p-5">
            <OverlayDialog 
                open={dialogOpen} 
                onClose={handleCloseDialog} 
                title={"Delete Group"} 
                textContent="Are you sure you want to delete this group?"
                continueColor="red"
                closeColor="" 
                onContinue={async () => {
                    handleDeleteGroup();
                    handleCloseDialog();
            }} />
            
            <div className="h-10">
                {currentGroupData.id == -1 ? <div className="font-bold text-xl">Default</div> : <div>
                    <div className="flex flex-col">
                        <input
                            className=" pl-1 text-2xl bg-gray-800 font-bold"
                            name="title"
                            type="text"
                            disabled={false}
                            value={renameValue}
                            onChange={(event) => {
                                handleRenameGroup(event);
                            }}
                        />
                        <button onClick={handleOpenDialog}>
                            <span className="flex items-center text-xs w-32 hover:text-red-500">

                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                                Delete Group
                                {loadDelete && <Image
                                    className="pl-1"
                                    src={Loading}
                                    height={20}
                                    width={20}
                                    alt="loading"
                                />}
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