import { IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

interface Props {
  post: IPost;
  user: IUser;
}

const Post = ({ post, user }: Props) => {
  const dateNow = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <article className="p-2">
      <header className="flex gap-3 flex-wrap justify-start">
        <Image
          src="https://fastly.picsum.photos/id/944/500/500.jpg?hmac=v4PRAAuUQlDmy3UMkqoNz5mZ25xwCzxti-5RVgN23sI"
          alt="profile image"
          className="object-cover bg-neutral-100 rounded-sm max-w-10 max-h-10"
          width={40}
          height={40}
          priority
        />
        <section className="block">
          <span className="text-gray-500 text-sm">
            <span className="text-gray-100 text-base font-semibold">
              {user.name}
            </span>{" "}
            {`@${user.username} · ${dateNow}`}
          </span>
          {/* content */}
          <p className="font-semibold text-md max-w-screen-sm">{post.title}</p>
          <p className="text-md max-w-screen-md mt-2">{post.body}</p>
        </section>
      </header>
      <hr className="border-[#282828] my-2" />
      <footer className="flex gap-2">
        <button className="bg-neutral-50/15 p-2 rounded-full relative overflow-hidden transition-colors hover:bg-neutral-50/20">
          <Heart size={16} />
        </button>
        <Link
          href={`/post/${post.id}`}
          className="bg-neutral-50/15 p-2 rounded-full relative overflow-hidden transition-colors hover:bg-neutral-50/20"
        >
          <MessageCircle size={16} />
        </Link>
      </footer>
    </article>
  );
};

export default Post;
