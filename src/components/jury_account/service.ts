/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories, categoriesLabel } from "../Pass/script.ts";

export const optionsCategory = () => {
  const list = Object.values(categories);

  return list.map((item) => ({
    value: item,
    label: (categoriesLabel as any)[`${item}`],
  }));
};

export const optionsReviewed = [
  {
    value: "true",
    label: "Рассмотрено",
  },
  {
    value: "false",
    label: "Не рассмотрено",
  },
];
