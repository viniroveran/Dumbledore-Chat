import {auth} from "@/auth"
import {redirect} from "next/navigation";
import MessageContainer from "@components/chat/message-container";
import Header from "@components/chat/header";
import {User} from "@lib/definitions";
import {SocketProvider} from "@context/socket-context";
import {SidebarProvider} from "@context/sidebar-context";
import MessageInput from "@components/chat/message-input";
import Sidebar from "@components/chat/sidebar";
import {getMessages} from "@actions/get-messages";

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user: User = {
    name: session?.user.name || "",
    email: session?.user.email || "",
    image: session?.user.image || ""
  }

  const previousMsgs = await getMessages(0, 100);

  return (
    <SocketProvider>
      <SidebarProvider>
        <div className="bg-gray-100 h-screen flex flex-col mx-auto">
          <Header/>
          <MessageContainer email={user.email} image={user.image} name={user.name} previousMsgs={previousMsgs}/>
          <MessageInput email={user.email} image={user.image} name={user.name}/>
          <Sidebar email={user.email} image={user.image} name={user.name}/>
        </div>
      </SidebarProvider>
    </SocketProvider>
  );
}
