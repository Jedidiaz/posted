import { IPost } from "@/interfaces/posts.interface";
import { notFound } from "next/navigation";
import React from "react";
import { getPosts, getUsers } from "../actions";
import { IUser } from "@/interfaces/user.interface";
import Posts from "@/views/Posts/index";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Posted | Posts",
  description: "Aquí puedes ver todos los usuarios.",
}

const PostsPage = async () => {
  let posts: IPost[] = [];
  let users: IUser[] = [];
  try {
    posts = await getPosts();
    users = await getUsers();
  } catch  {
    notFound();
  }
  return <Posts initialData={posts} initialUser={users} />;
};

export default PostsPage;
