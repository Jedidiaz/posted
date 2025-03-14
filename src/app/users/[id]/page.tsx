import { getUserById } from "@/app/actions";
import { IUser } from "@/interfaces/user.interface";
import Detail from "@/views/Users/Detail";
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
    const data = await getUserById(id);
    return {
      title: data.username,
      description: "Usuario de posted",
    };
  } catch  {
    notFound();
  }
};

const DetailPage = async ({ params: { id } }: Props) => {
  let data: IUser;
  try {
    data = await getUserById(id);
  } catch  {
    notFound();
  }
  return <Detail initialData={data} />;
};

export default DetailPage;
