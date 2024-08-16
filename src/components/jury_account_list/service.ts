/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { categories, categoriesLabel } from "../Pass/script.ts";
import { paths } from "@/service/paths.ts";

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

export const useCheckShort = () => {
  const location = useLocation();
  return { isShort: location.state?.page === paths.jury_account_list_short };
};
