/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories, categoriesLabel } from "../Pass/script.ts";
import { useSettigsQuery } from "@/store/rtk/main/settings.ts";
import { toZonedTime } from "date-fns-tz";

import { isAfter, parseISO } from "date-fns";
import { useGetCurrentTimeQuery } from "@/store/rtk/time/time.ts";

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
  const dataTime = useGetCurrentTimeQuery({});

  if (!isSuccess) {
    return { isDeadline: false };
  }
  const day = data_settings.voting_deadline;
  const toZoned = (date: Date) => {
    return toZonedTime(date, "Europe/Moscow");
  };

  let now;
  const date = parseISO(day);

  if (!dataTime.isSuccess) {
    now = new Date();
  } else {
    now = dataTime.data.utc_datetime;
  }

  // console.log(now);

  // console.log("now: " + toZoned(now));
  // console.log("date :" + date);

  const isShort = isAfter(toZoned(now), toZoned(date));
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
