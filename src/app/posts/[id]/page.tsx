import { getPostById, getUserById } from "@/app/actions";
import { IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";
import PostDetail from "@/views/Posts/Detail";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  try {
    const data = await getPostById(id);
    return {
      title: data.title,
      description: data.body,
    };
  } catch  {
    notFound();
  }
};

const PostDetailPage = async ({ params: { id } }: Props) => {
  let post: IPost;
  let user: IUser;
  try {
    post = await getPostById(id);
    user = await getUserById(String(post.userId));
  } catch  {
    notFound();
  }
  return <PostDetail post={post} user={user} />;
};

export default PostDetailPage;
