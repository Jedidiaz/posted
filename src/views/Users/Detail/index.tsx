"use client";
import { getUserById, getUserPosts } from "@/app/actions";
import Navigator from "@/components/layout/Navigator";
import { IUser } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { Suspense, useMemo } from "react";
import cover from "@/assets/cover-image.jpg";
import {
  AtSign,
  BriefcaseBusiness,
  Link as LinkIcon,
  MapPinCheck,
  Phone,
} from "lucide-react";
import Tag from "@/components/layout/Tag";
import LoadingPost from "@/components/layout/LoadingPost";
import Post from "@/components/layout/Post";

const NAVIGATORS = [{ label: "Usuarios", path: "/users" }];

interface Props {
  initialData: IUser;
}

const Detail = ({ initialData }: Props) => {
  const paths = useMemo(
    () => [
      ...NAVIGATORS,
      { label: initialData.username, path: `/users/${initialData.id}` },
    ],
    []
  );

  const { data: user } = useQuery({
    queryKey: ["users", initialData.id],
    queryFn: () => getUserById(String(initialData.id)),
    initialData,
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["users", initialData.id, "posts"],
    queryFn: () => getUserPosts(String(initialData.id)),
  });

  return (
    <main className="flex max-w-screen-md m-auto w-ful flex-col gap-2 mt-6">
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
      </section>
      {/* Profile */}
      <section className="relative flex flex-col">
        <header className="flex justify-start flex-col pt-10 px-4 relative">
          <picture className="bg-neutral-200 rounded-md min-w-36 min-h-36 absolute bottom-[62px] overflow-hidden ">
            <Image
              src="https://fastly.picsum.photos/id/944/500/500.jpg?hmac=v4PRAAuUQlDmy3UMkqoNz5mZ25xwCzxti-5RVgN23sI"
              alt="cover image"
              fill
              sizes="100%"
              className="object-cover"
            />
          </picture>
          <div className="w-full sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-10">
            <h3 className="font-bold text-xl line">{user.name}</h3>
            <span className="text-sm text-neutral-500">{`@${user.username}`}</span>
          </div>
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
      {/* Posts */}
      <section className="flex flex-col">
        <header className="flex justify-between items-center px-4 py-2">
          <h4 className="font-bold text-lg">Posts</h4>
        </header>
        <Suspense fallback={<LoadingPost />}>
          {isLoading ? (
            <LoadingPost />
          ) : (
            <section className="px-4 flex flex-col gap-4">
              {posts &&
                posts.map((post, index) => (
                  <Post key={index} post={post} user={user} />
                ))}
            </section>
          )}
        </Suspense>
      </section>
    </main>
  );
};

export default Detail;
