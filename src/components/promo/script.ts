// import IconBrand_1 from "@/images/promo/brand-carboncore.svg?react";
// import IconBrand_1 from "@/images/promo/brand-carboncore-new.svg?react";
import IconBrand_1 from "@/images/promo/carbon.svg?react";
// import IconBrand_2 from "@/images/promo/brand-2.svg?react";
import IconBrand_hype from "@/images/promo/brand-3.svg?react";
// import IconBrand_4 from "@/images/promo/brand-4.svg?react";
import IconNuum from "@/images/promo/brand-nuum.svg?react";
import IcconMega from "@/images/promo/brand-mega.svg?react";
import IconBase from "@/images/promo/brand-base.svg?react";
import { paths } from "@/service/paths";
import IconGrape from "@/images/promo/grape.svg?react";

export const brands = [
  { href: "https://www.carboncore.ru/", alt: "logo", icon: IconBrand_1 },
  { href: "https://www.hypepro.tv/", alt: "logo", icon: IconBrand_hype },
  { href: "https://nuum.ru/", alt: "logo", icon: IconNuum },
  { href: "#", alt: "", icon: IcconMega, section: paths.pitch },
  { href: "https://bazelevs.ru/", alt: "logo", icon: IconBase },

  // { href: "#", alt: "", icon: IconBrand_2 },
  // { href: "#", alt: "", icon: IconBrand_4 },
];

export const grape = {
  href: "",
  alt: "grape",
  icon: IconGrape,
};

export const girls = [
  {
    name: "Миня Хлечян",
    job: "Второй режиссер",
    img: "minya.png",
  },
  {
    name: "Катя Жаворонкова",
    job: "Совладелец, генеральный продюсер Reason Pictures",
    img: "katya.png",
  },
  {
    name: "Анна Коновалова",
    job: "Senior MarCom&Brand Avito ",
    img: "ann.png",
  },
  {
    name: "Ира Лаврова",
    job: "Head of production Friends",
    img: "ira.png",
  },
];
