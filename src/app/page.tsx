import Posts from "@/Views/Posts";
import { getUsers } from "./actions";
import { IUser } from "@/interfaces/user.interface";
import { notFound } from "next/navigation";

const Users = async () => {
  let data: IUser[] = [];
  try {
    data = await getUsers();
  } catch (error) {
    notFound();
  }
  return <Posts initialData={data} />;
};

export default Users;
