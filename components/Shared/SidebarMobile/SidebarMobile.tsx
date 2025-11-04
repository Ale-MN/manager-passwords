"use client";
import React from "react";
import { Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-blue-800 text-white">
        <SheetHeader className="text-left mb-5">
          <SheetTitle className="text-2xl text-white">
            Administrar Pass
          </SheetTitle>
          <SheetDescription className="text-slate-100"></SheetDescription>
        </SheetHeader>
        <SidebarRoutes />
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
