"use client";
import { getUsers } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Props {
  initialData: IUser[];
}

const Posts = ({ initialData }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: initialData,
  });

  return (
    <main className="flex min-h-[100dvh] max-w-screen-lg m-auto px-4 w-full relative">
      <section className="flex flex-col">
        {data.map(({ email }, index) => (
          <span key={index}>{email}</span>
        ))}
      </section>
    </main>
  );
};

export default Posts;
