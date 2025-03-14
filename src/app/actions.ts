import instance from "@/api/instance";
import { IComment, IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";

//users
export const getUsers = async () => {
  const { data } = await instance.get<IUser[]>("users");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await instance.get<IUser>(`users/${id}`);
  return data;
};

//Posts
export const getPosts = async () => {
  const { data } = await instance.get<IPost[]>("posts");
  return data;
};

export const getUserPosts = async (id: string) => {
  const { data } = await instance.get<IPost[]>(`users/${id}/posts`);
  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await instance.get<IPost>(`posts/${id}`);
  return data;
};

//Comments
export const getCommentsByPostId = async (id: string) => {
  const { data } = await instance.get<IComment[]>(`posts/${id}/comments`);
  return data;
};
