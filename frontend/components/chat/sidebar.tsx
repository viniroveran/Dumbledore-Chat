"use client";

import Image from "next/image";
import Logout from "@components/chat/sidebar/logout";
import {User} from "@lib/definitions";
import { useSidebarContext } from "@context/sidebar-context";

export default function ChatSidebar(user: User) {
  const { isSidebarOpen } = useSidebarContext();
  return (
  <div
    className={`${isSidebarOpen ? '' : '-translate-x-full '}absolute bg-base-300 w-56 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300`}>
    <div className="p-4 mt-4">
      <div className="flex avatar justify-center">
        <div className="w-24 rounded-full">
          <Image alt={user.name} src={user.image} width={128} height={128}/>
        </div>
      </div>
      <ul className="mt-4 text-base-content text-center text-sm">
        <li className="mb-2"><a href="#" className="block hover:text-primary">{user.name}</a></li>
        <li className="mb-2"><a href="#" className="block text-xs hover:text-primary">{user.email}</a></li>
        <li className="mt-4"><Logout/></li>
      </ul>
    </div>
  </div>
  );
}