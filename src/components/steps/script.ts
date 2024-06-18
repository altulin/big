/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  format,
  isAfter,
  isBefore,
  differenceInDays,
  endOfDay,
  differenceInHours,
} from "date-fns";
// import { formatInTimeZone } from "date-fns-tz";
import style from "./Steps.module.scss";

const frmtDt = (date: Date) => {
  // return formatInTimeZone(new Date(date), "Europe/Moscow", "dd/MM");
  return format(date, "dd/MM");
};

const objDate = (date: string) => {
  return new Date(date);
};

const dates: { [key: string]: { start: Date; end: Date; step: number } } = {
  early: { start: objDate("2024,6,17"), end: objDate("2024,6,30"), step: 1 },
  basic: { start: objDate("2024,7,1"), end: objDate("2024,7,28"), step: 2 },
  final: { start: objDate("2024,7,29"), end: objDate("2024,8,9"), step: 3 },
  empty3: { start: objDate("2024,8,10"), end: objDate("2024,8,25"), step: 3 },
  short: { start: objDate("2024,8,26"), end: objDate("2024,8,26"), step: 4 },
  empty4: { start: objDate("2024,8,27"), end: objDate("2024,9,1"), step: 4 },
  winner: { start: objDate("2024,9,2"), end: objDate("2024,9,2"), step: 5 },
  empty5: { start: objDate("2024,9,3"), end: objDate("2024,9,17"), step: 5 },
  reward: { start: objDate("2024,9,18"), end: objDate("2024,9,18"), step: 6 },
};

export const head = [
  {
    label: "Подача работ",
    name: "job",
    sub_item: [
      {
        date: `${frmtDt(dates.early.start)} – ${frmtDt(dates.early.end)}`,
        title: "Ранняя пташка",
      },
      {
        date: `${frmtDt(dates.basic.start)} – ${frmtDt(dates.basic.end)}`,
        title: "Основной этап",
      },
      {
        date: `${frmtDt(dates.final.start)} – ${frmtDt(dates.final.end)}`,
        title: "Финальный этап",
      },
    ],
  },
  {
    label: "Жюрение",
    name: "jury",
    sub_item: [
      { date: `${frmtDt(dates.short.start)}`, title: "Шорт-листы" },
      { date: `${frmtDt(dates.winner.start)}`, title: "Победители" },
    ],
  },
  {
    label: "Финал",
    name: "final",
    sub_item: [{ date: `${frmtDt(dates.reward.start)}`, title: "Награждение" }],
  },
];

export const schedule = [
  {
    date: `${frmtDt(dates.early.start)} – ${frmtDt(dates.early.end)}`,
    title: "Ранняя пташка",
  },
  {
    date: `${frmtDt(dates.basic.start)} – ${frmtDt(dates.basic.end)}`,
    title: "Основной этап",
  },
  {
    date: `${frmtDt(dates.final.start)} – ${frmtDt(dates.final.end)}`,
    title: "Финальный этап",
  },
  { date: `${frmtDt(dates.short.start)}`, title: "Шорт-листы" },
  { date: `${frmtDt(dates.winner.start)}`, title: "Победители" },
  { date: `${frmtDt(dates.reward.start)}`, title: "Награждение" },
];

export const getLength = (date: Date) => {
  const list = Object.keys(dates);
  const key = list.filter((item) => {
    return (
      isAfter(date, dates[item].start) &&
      isBefore(date, endOfDay(dates[item].end))
    );
  });

  if (["early", "basic", "final"].includes(key[0])) {
    const daysStartToEnd = differenceInDays(
      dates[key[0]].end,
      dates[key[0]].start,
    );
    const daysStartToToday = differenceInDays(date, dates[key[0]].start);
    const base = (100 / 6) * (dates[key[0]].step - 1);
    if (daysStartToToday === 0) return Math.round(base);
    const step = ((daysStartToToday / daysStartToEnd) * 100) / 6;
    return Math.round(base + step);
  }

  if (["empty3", "empty4", "empty5"].includes(key[0])) {
    const base = (100 / 6) * dates[key[0]].step;
    return Math.round(base);
  }

  if (["short", "reward", "winner"].includes(key[0])) {
    const hoursStartToEnd = differenceInHours(
      endOfDay(dates[key[0]].end),
      dates[key[0]].start,
    );
    const hoursStartToToday = differenceInHours(date, dates[key[0]].start);
    const base = (100 / 6) * (dates[key[0]].step - 1);
    if (hoursStartToToday === 0) return Math.round(base);
    const step = ((hoursStartToToday / hoursStartToEnd) * 100) / 6;
    return Math.round(base + step);
  }

  if (isAfter(date, endOfDay(dates.reward.end))) return 100;

  return 0;
};

export const getLengthMob = (date: Date, s: any) => {
  const list = Object.keys(dates);

  let n = 0;
  const key = list.filter((item) => {
    return (
      isAfter(date, dates[item].start) &&
      isBefore(date, endOfDay(dates[item].end))
    );
  });

  if (["early", "basic", "final"].includes(key[0])) {
    while (n < dates[key[0]].step) {
      let length;
      const item = list.filter((item) => dates[item].step === n + 1)[0];

      if (isAfter(date, endOfDay(dates[item].end))) {
        length = 100;
      } else {
        const daysStartToEnd = differenceInDays(
          dates[item].end,
          dates[item].start,
        );
        const daysStartToToday = differenceInDays(date, dates[key[0]].start);
        length = Math.round((daysStartToToday / daysStartToEnd) * 100);
      }
      s.slides[n].querySelector(`.${style.top__bar}`).style.width =
        `${length}%`;

      n++;
    }
    n = 0;
  }

  if (["empty3", "empty4", "empty5"].includes(key[0])) {
    while (n < dates[key[0]].step) {
      let length;
      const item = list.filter((item) => dates[item].step === n + 1)[0];

      if (isAfter(date, endOfDay(dates[item].end))) {
        length = 100;
      } else {
        const daysStartToEnd = differenceInDays(
          dates[item].end,
          dates[item].start,
        );
        const daysStartToToday = differenceInDays(date, dates[key[0]].start);
        length = Math.round((daysStartToToday / daysStartToEnd) * 100);
      }
      s.slides[n].querySelector(`.${style.top__bar}`).style.width =
        `${length}%`;
      n++;
    }
    n = 0;
  }

  if (["short", "reward", "winner"].includes(key[0])) {
    while (n < dates[key[0]].step) {
      let length;
      const item = list.filter((item) => dates[item].step === n + 1)[0];

      if (isAfter(date, endOfDay(dates[item].end))) {
        length = 100;
      } else {
        const hoursStartToEnd = differenceInHours(
          endOfDay(dates[key[0]].end),
          dates[key[0]].start,
        );
        const hoursStartToToday = differenceInHours(date, dates[key[0]].start);
        length = Math.round((hoursStartToToday / hoursStartToEnd) * 100);
      }
      s.slides[n].querySelector(`.${style.top__bar}`).style.width =
        `${length}%`;

      n++;
    }
    n = 0;
  }

  return;
};
