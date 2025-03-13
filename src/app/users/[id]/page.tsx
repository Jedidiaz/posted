import { getUserById } from "@/app/actions";
import { IUser } from "@/interfaces/user.interface";
import Detail from "@/views/Users/Detail";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const DetailPage = async ({ params: { id } }: Props) => {
  let data: IUser;
  try {
    data = await getUserById(id);
  } catch (error) {
    notFound();
  }
  return <Detail initialData={data} />;
};

export default DetailPage;
