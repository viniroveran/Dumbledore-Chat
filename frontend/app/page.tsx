import {auth} from "@/auth";
import {redirect} from "next/navigation";
import Image from "next/image";
import LoginForm from "@components/LoginForm";

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect("/chat");
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat
      bg-[url('/bg.png')]"
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <div className="mask mask-hexagon w-24">
              <Image src={"/dumbledore.png"} alt={"Dumbledore"} width={150} height={150}/>
            </div>
            <h1 className="mt-3 mb-14 text-2xl">Dumbledore Chat</h1>
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}