// Providers

import { ReactNode, useContext, useState } from "react";
import { CurrentGroupContext, GroupArrayContext, GroupContextType, GroupDataType } from "../types";

interface GroupProviderProps {
    children: ReactNode;
}

export const GroupArrayProvider: React.FC<GroupProviderProps> = ({ children }) => {
    const defaultData = {
        id: -1, // -1 value for no group
        group_name: 'Default',
    }
    const [currentGroupData, setCurrentGroupData] = useState<GroupDataType>(defaultData);

    return (
        <CurrentGroupContext.Provider value={{ currentGroupData, setCurrentGroupData }}>
            {children}
        </CurrentGroupContext.Provider>
    );
};

export const useCurrentGroup = (): GroupContextType => {
    const context = useContext(CurrentGroupContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
}