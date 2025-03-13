import { getCommentsByPostId, getPostById, getUserById } from "@/app/actions";
import { IComment, IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";
import PostDetail from "@/views/Posts/Detail";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const PostDetailPage = async ({ params: { id } }: Props) => {
  let post: IPost;
  let user: IUser;
  try {
    post = await getPostById(id);
    user = await getUserById(String(post.userId));
  } catch (error) {
    notFound();
  }
  return <PostDetail post={post} user={user} />;
};

export default PostDetailPage;
