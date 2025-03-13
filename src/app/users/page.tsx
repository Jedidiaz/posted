import { IUser } from "@/interfaces/user.interface";
import Users from "@/views/Users";
import { notFound } from "next/navigation";
import { getUsers } from "../actions";

const UsersPage = async () => {
  let data: IUser[] = [];
  try {
    data = await getUsers();
  } catch (error) {
    notFound();
  }
  return <Users initialData={data} />;
};

export default UsersPage;
