"use client";

import React, {useContext, useState} from "react";

export interface SidebarProviderProps {
  children?: React.ReactNode;
}

export interface ISidebarContext {
  isSidebarOpen: boolean,
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<ISidebarContext | null>(null);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  }

  return (
    <SidebarContext.Provider value={{isSidebarOpen, toggleSidebar}}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const state = useContext(SidebarContext);
  if (!state) throw new Error(`Sidebar state is undefined`);

  return state;
};
