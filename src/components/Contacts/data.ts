// import IconYou from "@/images/contacts/youtube.svg?react";
// import IconInst from "@/images/contacts/insta.svg?react";
// import IconFb from "@/images/contacts/fb.svg?react";
import IconTg from "@/images/contacts/tg.svg?react";
import IconNuum from "@/images/contacts/nuum.svg?react";
import IconVk from "@/images/contacts/vk.svg?react";
// import { api } from "@/store/rtk/emptyApi";

// console.log(api.endpoints.settings.select()(state));

export const soc = [
  // { href: "#", icon: IconYou },
  // { href: "#", icon: IconInst },
  { href: "#", icon: IconNuum },
  { href: "#", icon: IconTg },
  { href: "#", icon: IconVk },
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
