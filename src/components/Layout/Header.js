import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header({ userName = "Guest User" }) {
  return (
    <>
      <header className=" flex h-16 justify-between bg-slate-950 p-4 text-white">
        <div className=" flex items-center gap-4 ">
          <Link href={"/"} className="hover:animate-rotate-center">
            <Image
              src={"/timecard.svg"}
              width={30}
              height={30}
              alt="Logo for Attendance Manager"
            />
          </Link>
          <span className="cursor-default text-xl font-semibold">
            Attendance Manager
          </span>
        </div>
        <button className="flex items-center gap-3 hover:underline">
          <span>Hello, {userName}!</span>
          <Image
            src={"/userIcon.svg"}
            width={30}
            height={30}
            alt="Logo for user"
          />
        </button>
      </header>
    </>
  );
}

export default Header;
