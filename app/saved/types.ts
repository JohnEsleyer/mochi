import { ReactNode, createContext, useContext, useState } from "react";

// Types
export type GroupDataType = {
    id: number;
    group_name: string;
};

export type GroupContextType = {
    currentGroupData: GroupDataType;
    setCurrentGroupData: React.Dispatch<React.SetStateAction<GroupDataType>>;
};

export interface GroupArrayContextType {
    groups: GroupDataType[];
    setGroups: React.Dispatch<React.SetStateAction<GroupDataType[]>>;
}

export const CurrentGroupContext = createContext<GroupContextType | undefined>(undefined);
export const GroupArrayContext = createContext<GroupArrayContextType | undefined>(undefined);

// Custom Hooks for contexts
export const useGroupArrayContext = () => {
  const context = useContext(GroupArrayContext);
  if (!context){
    throw new Error('useGroupArrayContext must be used within a FirstProvider');
  }
  return context;
};
