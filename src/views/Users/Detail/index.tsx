"use client";
import { getUserById } from "@/app/actions";
import Navigator from "@/components/layout/Navigator";
import { IUser } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";
import cover from "@/assets/cover-image.jpg";
import {
  AtSign,
  BriefcaseBusiness,
  Link as LinkIcon,
  MapPinCheck,
  Phone,
} from "lucide-react";
import Tag from "@/components/layout/Tag";

const NAVIGATORS = [{ label: "Usuarios", path: "/" }];

interface Props {
  initialData: IUser;
}

const Detail = ({ initialData }: Props) => {
  const paths = useMemo(
    () => [
      ...NAVIGATORS,
      { label: initialData.username, path: `/${initialData.id}` },
    ],
    []
  );

  const { data: user } = useQuery({
    queryKey: ["users", initialData.id],
    queryFn: () => getUserById(String(initialData.id)),
    initialData,
  });


  return (
    <main className="flex max-w-screen-lg m-auto w-ful flex-col gap-2 mt-6">
      <header className="flex flex-col gap-3 px-4">
        <Navigator paths={paths} />
      </header>
      <section className="flex gap-2 flex-col h-full relative mt-4 px-4 ">
        {/* Cover image */}
        <picture className="w-full aspect-2/1 sm:aspect-3/1">
          <Image
            src={cover}
            alt="cover image"
            fill
            sizes="100%"
            className="object-cover"
          />
        </picture>
        {/* Profile */}
      </section>
      <section className="relative flex flex-col">
        <header className="flex justify-start flex-col pt-10 px-4 relative ">
          <picture className="bg-neutral-200 rounded-md min-w-36 min-h-36 absolute bottom-[62px] overflow-hidden ">
            <Image
              src="https://picsum.photos/500/500"
              alt="cover image"
              fill
              sizes="100%"
              className="object-cover"
            />
          </picture>
          <h3 className="font-bold text-xl line">{user.name}</h3>
          <span className="text-sm text-neutral-500">{`@${user.name}`}</span>
        </header>
        <section className="px-4 mt-2 flex flex-col gap-2">
          <p className=" text-sm max-w-screen-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <Tag label={user.company.name} Icon={BriefcaseBusiness} />
            <Tag label={user.address.city} Icon={MapPinCheck} />
            <Tag label={user.website} Icon={LinkIcon} link />
          </div>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <Tag label={user.email} Icon={AtSign} />
            <Tag label={user.phone} Icon={Phone} />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Detail;
