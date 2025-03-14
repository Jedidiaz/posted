import Image from "next/image";
import React from "react";
import logo from "@/assets/posted-logo-light.svg";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="bg-[#0a0a0a] border-b border-[#282828] border-1 sticky">
      <nav className="max-w-screen-lg m-auto px-4 py-2">
        <Link href="/users" className="cursor-pointer" >
          <picture className="flex gap-1 items-center">
            <Image
              src={logo}
              alt="posted logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <span className="text-gray-100 font-semibold">Posted</span>
          </picture>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
