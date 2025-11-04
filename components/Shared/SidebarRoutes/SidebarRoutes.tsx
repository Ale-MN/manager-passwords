"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart, DoorClosed, House, RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { SingleItem } from "../SingleItem";
import {
  dataSidebarElements,
  dataSidebarConfiguration,
} from "./SidebarRoutes.data";
import { Span } from "next/dist/trace";
import { signOut } from "next-auth/react";

export function SidebarRoutes() {
  return (
    <div>
      <SingleItem href="/" icon={House} label="Inicio" />
      {dataSidebarElements.map(({ title, icon: Icon, children }) => (
        <Accordion
          type="single"
          collapsible
          key={title}
          className="w-full px-2"
        >
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger>
              <div className="flex gap-2 items-center text-[15px]">
                <div className="bg-blue-100/20 p-2 rounded-md">
                  <Icon size={20} />
                </div>
                {title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {children.map(({ item, href, icon: Icon }) => (
                <div key={item}>
                  <Link
                    href={href}
                    className="px-6 py-2 flex gap-2 items-center hover:to-blue-100/20 duration-300 transition-al rounded-md"
                  >
                    <Icon size={20} />
                    {item}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <SingleItem
        href="/generator"
        label="Generador"
        icon={RectangleEllipsis}
      />

      {dataSidebarConfiguration.map(({ title, icon: Icon, children }) => (
        <Accordion
          type="single"
          collapsible
          key={title}
          className="w-full px-2"
        >
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger>
              <div className="flex gap-2 items-center text-[15px]">
                <div className="bg-blue-100/20 p-2 rounded-md">
                  <Icon size={20} />
                </div>
                {title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {children.map(({ item, href, icon: Icon, premium }) => (
                <div
                  className="flex items-center justify-between mt-2 hover:bg-blue-100/20 duration-300 transition-all rounded-md pr-1"
                  key={item}
                >
                  <Link
                    href={href}
                    className="px-6 py-2 flex gap-2 items-center"
                  >
                    <Icon size={20} />
                    {item}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <SingleItem href="/analytics" label="Analytics" icon={BarChart} />
      <SingleItem
        onClick={() => signOut()}
        href="#"
        label="Cerrar Sesión"
        icon={DoorClosed}
      />
    </div>
  );
}

export default SidebarRoutes;
