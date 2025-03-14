import { IPost } from "@/interfaces/posts.interface";
import { notFound } from "next/navigation";
import React from "react";
import { getPosts, getUsers } from "../actions";
import { IUser } from "@/interfaces/user.interface";
import Posts from "@/views/Posts/index";

const PostsPage = async () => {
  let posts: IPost[] = [];
  let users: IUser[] = [];
  try {
    posts = await getPosts();
    users = await getUsers();
  } catch (error) {
    notFound();
  }
  return <Posts initialData={posts} initialUser={users} />;
};

export default PostsPage;
