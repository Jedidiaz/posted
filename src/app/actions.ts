import instance from "@/api/instance";
import { IUser } from "@/interfaces/user.interface";

export const getUsers = async () => {
  const { data } = await instance.get<IUser[]>("users");
  return data;
};
