"use client";
import React from "react";
import { Icon, Menu } from "lucide-react";
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

export type SidebarMobileProps = {
  // types...
};

const SidebarMobile: React.FC<SidebarMobileProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-blue-800 text-white">
        <SheetHeader className="text-left mb-5">
          <SheetTitle className="text-2xl">AlePassword</SheetTitle>
          <SheetDescription className="text-slate-100"></SheetDescription>
        </SheetHeader>
        <SidebarRoutes />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
