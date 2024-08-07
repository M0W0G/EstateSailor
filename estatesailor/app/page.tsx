"use client";

import Image from "next/image";
import { useAuth } from "@/context/authContext";

export default function Home() {

  const user = useAuth();

  return (
    <main className="">
      <div className="space-y-2 mt-20 ml-20">
        {user && (
          <h1 className="text-xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-black">
            Hi! {user.user_metadata.full_name}
          </h1>
        )}
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
            Put some wind in your sails<br /> with automated marketing & listing
          </h1>
        <p className="max-w-[600px] text-[#000000]">
          Our automated marketing & listing platform is here to help you sell your estate sale items faster and easier than ever before.
        </p>
      </div>
    </main>
  );
}