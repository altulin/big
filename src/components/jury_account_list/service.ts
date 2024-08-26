/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { categories, categoriesLabel } from "../Pass/script.ts";
import { paths } from "@/service/paths.ts";
import { useSettigsQuery } from "@/store/rtk/main/settings.ts";
import { toZonedTime } from "date-fns-tz";

import { endOfDay, isAfter, parse } from "date-fns";

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

export const useCheckDeadline = () => {
  const { data: data_settings, isSuccess } = useSettigsQuery(undefined);

  if (!isSuccess) {
    return { isDeadline: false };
  }

  const day = data_settings.voting_deadline;
  // const day = "2024-08-20";
  const toZoned = (date: Date) => {
    return toZonedTime(date, "Europe/Moscow");
  };
  const now = new Date();
  const date = parse(day, "yyyy-MM-dd", new Date());
  const isShort = isAfter(toZoned(now), endOfDay(date));
  return { isShort };
};

export const getCategory = (index: number) => {
  switch (index) {
    case 0:
      return categories.main_category;
    case 1:
      return categories.young_talent;
  }
};

export const tabs = ["Основная", "Young Talent"];
