import {
  CreditCard,
  Earth,
  LayoutList,
  Settings,
  Star,
  UserPen,
} from "lucide-react";

export const dataSidebarElements = [
  {
    title: "Elementos",
    icon: LayoutList,
    children: [
      {
        item: "Favoritos",
        href: "/favourites",
        icon: Star,
      },
      {
        item: "Logins",
        href: "/logins-elements",
        icon: Earth,
      },
      {
        item: "Tarjetas",
        href: "/credit-card",
        icon: CreditCard,
      },
    ],
  },
];

export const dataSidebarConfiguration = [
  {
    title: "Configuración",
    icon: Settings,
    children: [
      {
        item: "Perfil",
        href: "/profile",
        icon: UserPen,
        premium: false,
      },
    ],
  },
];
