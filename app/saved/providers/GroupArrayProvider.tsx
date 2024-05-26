// Providers

import { ReactNode, useContext, useState } from "react";
import { GroupDataType, GroupArrayContext, GroupContextType, GroupArrayContextType } from "../types";

interface GroupArrayProviderProps {
  children: ReactNode;
}

export const GroupArrayProvider: React.FC<GroupArrayProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<GroupDataType[]>([]);

  return (
    <GroupArrayContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupArrayContext.Provider>
  );
};

export const useGroups = (): GroupArrayContextType => {
  const context = useContext(GroupArrayContext);
  if (!context){
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}