import IconNuum from "@/images/pass/pass_nuum.svg?react";
import IconMega from "@/images/form/mega.svg?react";

export const categories = {
  main_category: "main",
  young_talent: "young",
  brand_pitches: "brand_pitches",
  only_tickets: "only_tickets",
};

export const categoriesLabel: { [key: string]: string } = {
  main: "Основная категория",
  young: "Young Talent by Nuum",
  brand_pitches: "Бренд-питчи",
  only_tickets: "Только билеты",
};

export const categoriesPitshes = {
  nuum: "nuum",
  mega: "mega_market",
};

export const radioList = [
  {
    label: categoriesLabel.main,
    value: categories.main_category,
    icon: null,
  },
  {
    label: categoriesLabel.young,
    value: categories.young_talent,
    icon: null,
  },
  {
    label: categoriesLabel.brand_pitches,
    value: categories.brand_pitches,
    icon: null,
  },
];

export const radioListPitch = [
  {
    label: "Питч от",
    icon: IconNuum,
    value: categoriesPitshes.nuum,
  },
  {
    label: "Питч от",
    icon: IconMega,
    value: categoriesPitshes.mega,
  },
];
