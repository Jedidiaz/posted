"use client";
import { getUsers } from "@/app/actions";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Navigator from "@/components/layout/Navigator";
import Link from "next/link";

interface Props {
  initialData: IUser[];
}

const TABLE_HEADERS = ["Id", "Nombre", "Email", "Teléfono"];
const NAVIGATORS = [{ label: "Usuarios", path: "/users" }];

const Users = ({ initialData }: Props) => {
  const {
    data: allUsers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData,
  });

  const [searchState, setSearchState] = useState({
    searchTerm: "",
    filteredUsers: allUsers,
    typingTimeout: null as NodeJS.Timeout | null,
  });

  const filterUsers = useCallback(
    (term: string) => {
      if (!term.trim()) {
        setSearchState((prev) => ({
          ...prev,
          filteredUsers: allUsers,
        }));
        return;
      }

      const normalizedTerm = term.toLowerCase();
      const filtered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(normalizedTerm) ||
          user.username.toLowerCase().includes(normalizedTerm)
      );

      setSearchState((prev) => ({
        ...prev,
        filteredUsers: filtered,
      }));
    },
    [allUsers]
  );

  //debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchState.typingTimeout) {
      clearTimeout(searchState.typingTimeout);
    }
    const timeout = setTimeout(() => {
      filterUsers(value);
    }, 300);

    setSearchState((prev) => ({
      ...prev,
      searchTerm: value,
      typingTimeout: timeout,
    }));
  };
  const handleRfresh = () => refetch();
  return (
    <main className="flex max-w-screen-lg m-auto px-4 w-ful flex-col gap-2 mt-6">
      <header className="flex flex-col gap-3">
        <Navigator paths={NAVIGATORS} />
        <hr className="border-[#282828]" />
        <section className="flex gap-2">
          <Input
            placeholder="Busca por nombre o username"
            className="max-w-80"
            value={searchState.searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="outline"
            className="bg-transparent border-[#282828] px-2"
            onClick={handleRfresh}
            aria-label="Refresh"
            disabled={isLoading}
          >
            <RotateCw className={`${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </section>
      </header>
      <Table>
        <TableHeader>
          <TableRow className="rounded-md">
            {TABLE_HEADERS.map((label, index) => (
              <TableHead key={index}>{label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchState.filteredUsers.length > 0 ? (
            searchState.filteredUsers.map(
              ({ id, name, username, email, phone }, index) => (
                <TableRow key={index} >
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center ">
                      <Avatar className="bg-gray-100 p-2 relative items-center justify-center text-black font-semibold">
                        <AvatarFallback>
                          {username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <Link href={`/users/${id}`} className="hover:text-lime-200 hover:underline" >{name}</Link>
                        <span className="text-sm text-gray-500">{`@${username}`}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone}</TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow key={0} className="hover:bg-transparent">
              <TableCell
                colSpan={TABLE_HEADERS.length}
                className="text-center text-gray-300"
              >
                No se encontraron usuarios
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={TABLE_HEADERS.length}
              className="text-end text-gray-500"
            >
              Total de usuarios: {searchState.filteredUsers.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default Users;
