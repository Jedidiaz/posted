import instance from "@/api/instance";
import { IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";

export const getUsers = async () => {
  const { data } = await instance.get<IUser[]>("users");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await instance.get<IUser>(`users/${id}`);
  return data;
};

export const getUserPosts = async (id: string) => {
  const { data } = await instance.get<IPost[]>(`users/${id}/posts`);
  return data;
};
