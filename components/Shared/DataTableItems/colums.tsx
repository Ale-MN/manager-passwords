"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Element } from "@prisma/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal, User } from "lucide-react";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnProps = Element;

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "typeElement",
    header: "Type Element",
  },
  {
    accessorKey: "urlWebsite",
    header: "URL Website",
  },
  {
    accessorKey: "directory",
    header: "Directory",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const password = row.original.password;
      const username = row.original.username;

      const onEditElement = () => {
        window.location.href = `/element/${row.original.id}`;
      };
      const copyItemClipboard = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        if (name === "Password") {
          toast(`${name} copiada 🔑`);
        } else {
          toast(`${name} copiado 👤`);
        }
      };

      return (
        <div className="flex gap-2 justify-center items-center">
          {password && (
            <Copy
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(password, "Password")}
            />
          )}
          {username && (
            <User
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(username, "Username")}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
