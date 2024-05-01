import { createContext } from "react";

interface GroupDataType {
    id: number;
    group_name: string;
}

interface GroupContextType {
    currentGroupData: GroupDataType;
    setCurrentGroupData: React.Dispatch<React.SetStateAction<GroupDataType>>;

}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);
