import IconYou from "@/images/contacts/youtube.svg?react";
import IconInst from "@/images/contacts/insta.svg?react";
import IconFb from "@/images/contacts/fb.svg?react";
import IconTg from "@/images/contacts/tg.svg?react";
import { api } from "@/store/rtk/emptyApi";

// console.log(api.endpoints.settings.select()(state));

export const soc = [
  { href: "#", icon: IconYou },
  { href: "#", icon: IconInst },
  { href: "#", icon: IconFb },
  { href: "https://t.me/agvento-test", icon: IconTg },
];

export const law = [
  {
    label: "Политика использования персональных данных",
    href: import.meta.env.VITE_APP_PERSONAL_DATA,
  },
  {
    label: "Политика использования Cookie",
    href: import.meta.env.VITE_APP_COOKIE_DATA,
  },
  {
    label: "Регламент фестиваля",
    href: import.meta.env.VITE_APP_FESTIVAL_DATA,
  },
];
