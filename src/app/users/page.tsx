import { IUser } from "@/interfaces/user.interface";
import Users from "@/views/Users";
import { notFound } from "next/navigation";
import { getUsers } from "../actions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Posted | Usuarios",
  description: "Aquí puedes ver todos los usuarios.",
}

const UsersPage = async () => {
  let data: IUser[] = [];
  try {
    data = await getUsers();
  } catch  {
    notFound();
  }
  return <Users initialData={data} />;
};

export default UsersPage;
