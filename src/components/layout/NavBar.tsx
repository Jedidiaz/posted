"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/posted-logo-light.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    text: "Posts",
    href: "/posts",
  },
  {
    text: "Usuarios",
    href: "/users",
  },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className="bg-[#0a0a0a] border-b border-[#282828] border-1 sticky">
      <nav className="max-w-screen-lg m-auto px-4 py-2 flex justify-between gap-2">
        <Link href="/posts" className="cursor-pointer">
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
        <ul>
          <li>
            {LINKS.map(({ href, text }, index) => (
              <Button
                key={index}
                variant="link"
                asChild
                className={`${
                  pathname.startsWith(href) ? "text-lime-200" : "text-gray-400"
                }`}
              >
                <Link href={href}>{text}</Link>
              </Button>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
