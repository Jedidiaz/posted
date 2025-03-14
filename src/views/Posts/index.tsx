"use client";
import Post from "@/components/layout/Post";
import { IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";
import React, { useEffect, useRef, useState } from "react";
import emptyState from "@/assets/empty-state.png";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData: IPost[];
  initialUser: IUser[];
}

const FILTER_OPTIONS = [
  { value: "default", label: "Por defecto" },
  { value: "asc", label: "ASC" },
  { value: "desc", label: "DESC" },
];

const Posts = ({ initialData, initialUser }: Props) => {
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default"
  );
  const [postsState, setPostsState] = useState({
    loading: false,
    posts: initialData.slice(0, 10),
    limit: 10,
    allLoaded: false,
  });

  const handleChangeFilter = (value: "default" | "asc" | "desc") =>
    setSortOrder(value);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getSortedPosts = (posts: IPost[]) => {
    if (sortOrder === "asc") {
      return [...posts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      return [...posts].sort((a, b) => b.title.localeCompare(a.title));
    }
    return posts;
  };

  useEffect(() => {
    if (!loadMoreRef.current || postsState.allLoaded) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !postsState.loading) {
          console.log("🔄 Scrolled to bottom: Cargando más posts...");
          setPostsState((prev) => ({ ...prev, loading: true }));

          setTimeout(() => {
            const newLimit = postsState.limit + 10;
            const newPosts = getSortedPosts(initialData.slice(0, newLimit));

            setPostsState({
              loading: false,
              posts: newPosts,
              limit: newLimit,
              allLoaded: newLimit >= initialData.length,
            });
          }, 1000);
        }
      },
      { threshold: 1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [postsState.loading, postsState.allLoaded]);

  useEffect(() => {
    setPostsState((prev) => ({
      ...prev,
      posts: getSortedPosts(prev.posts),
    }));
  }, [sortOrder]);

  return (
    <main className="flex flex-col max-w-screen-md m-auto pb-4 mt-4 w-full">
      <header className="flex justify-start py-2 w-full sticky top-0 bg-black/80 backdrop-blur-sm z-10" >
        <div>
          <Select value={sortOrder} onValueChange={handleChangeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      <section className="flex gap-2 flex-col h-full ">
        {postsState.posts.map((post, index) => {
          const user = initialUser.find(({ id }) => id === post.userId);
          if (user) return <Post key={index} post={post} user={user} />;
          return null;
        })}

        <footer
          ref={loadMoreRef}
          className="min-h-10 w-full flex justify-center items-center"
        >
          {postsState.allLoaded ? (
            <div className="flex flex-col justify-center items-center py-10">
              <Image
                src={emptyState}
                alt="empty state"
                width={150}
                className="object-contain"
                loading="lazy"
              />
              <p className="text-gray-100 text-lg font-medium">
                ¡Estás al día!
              </p>
              <p className="text-gray-500 mt-2">No hay más posts que ver :c</p>
            </div>
          ) : (
            postsState.loading && <span className="loader"></span>
          )}
        </footer>
      </section>
    </main>
  );
};

export default Posts;
