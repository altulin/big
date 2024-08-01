// import IconNuum from "@/images/form/nuum.svg?react";
import IconMega from "@/images/form/mega.svg?react";

export const categories = {
  main_category: "main",
  young_talent: "young",
  brand_pitches: "brand_pitches",
};

export const categoriesPitshes = {
  // nuum: "nuum_category",
  nuum: "nuum",
  // mega: "mega_category",
  mega: "mega_market",
};

export const radioList = [
  {
    label: "Основная категория",
    value: categories.main_category,
    icon: null,
  },
  {
    label: "Young Talent by Nuum",
    value: categories.young_talent,
    icon: null,
  },
  {
    label: "Бренд-питчи",
    value: categories.brand_pitches,
    icon: null,
  },
];

export const radioListPitch = [
  // {
  //   label: "Питч от",
  //   icon: IconNuum,
  //   value: categoriesPitshes.nuum,
  // },
  {
    label: "Питч от",
    icon: IconMega,
    value: categoriesPitshes.mega,
  },
];
