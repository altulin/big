/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  format,
  isAfter,
  isBefore,
  differenceInDays,
  endOfDay,
  differenceInHours,
  addDays,
} from "date-fns";
// import { formatInTimeZone } from "date-fns-tz";
import style from "./Steps.module.scss";

export const frmtDt = (date: Date) => {
  // return formatInTimeZone(new Date(date), "Europe/Moscow", "dd/MM");
  return format(date, "dd/MM");
};

const objDate = (date: string) => {
  return new Date(date);
};

const useControlDate = (data: any) => {
  if (data.status !== "fulfilled") return;

  const result = data.data.results;

  const early = result.filter((item: any) => item.title === "Ранняя пташка")[0];
  const basic = result.filter((item: any) => item.title === "Основной этап")[0];
  const final = result.filter(
    (item: any) => item.title === "Финальный этап",
  )[0];
  const short = result.filter((item: any) => item.title === "Шорт-листы")[0];
  const winner = result.filter((item: any) => item.title === "Победители")[0];
  const reward = result.filter((item: any) => item.title === "Награждение")[0];

  const dates: {
    [key: string]: { start: Date; end: Date; step: number; title?: string };
  } = {
    early: {
      start: objDate(early.stage_start_at),
      end: objDate(early.stage_end_at),
      title: "Ранняя пташка",
      step: 1,
    },
    basic: {
      start: objDate(basic.stage_start_at),
      end: objDate(basic.stage_end_at),
      step: 2,
      title: "Основной этап",
    },
    final: {
      start: objDate(final.stage_start_at),
      end: objDate(final.stage_end_at),
      step: 3,
      title: "Финальный этап",
    },
    empty3: {
      start: addDays(objDate(final.stage_end_at), 1),
      end: addDays(objDate(short.stage_start_at), -1),
      step: 3,
    },
    short: {
      start: objDate(short.stage_start_at),
      end: objDate(short.stage_end_at),
      step: 4,
      title: "Шорт-листы",
    },
    empty4: {
      start: addDays(objDate(short.stage_end_at), 1),
      end: addDays(objDate(winner.stage_start_at), -1),
      step: 4,
    },
    winner: {
      start: objDate(winner.stage_start_at),
      end: objDate(winner.stage_end_at),
      step: 5,
      title: "Победители",
    },
    empty5: {
      start: addDays(objDate(winner.stage_end_at), 1),
      end: addDays(objDate(reward.stage_start_at), -1),
      step: 5,
    },
    reward: {
      start: objDate(reward.stage_start_at),
      end: objDate(reward.stage_end_at),
      step: 6,
      title: "Награждение",
    },
  };

  console.log(dates);

  const head = [
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
        { date: `${frmtDt(dates.short.end)}`, title: "Шорт-листы" },
        { date: `${frmtDt(dates.winner.end)}`, title: "Победители" },
      ],
    },
    {
      label: "Финал",
      name: "final",
      sub_item: [{ date: `${frmtDt(dates.reward.end)}`, title: "Награждение" }],
    },
  ];

  const schedule = [
    {
      date: `${frmtDt(dates.early.start)} – ${frmtDt(dates.early.end)}`,
      title: dates.early.title,
    },
    {
      date: `${frmtDt(dates.basic.start)} – ${frmtDt(dates.basic.end)}`,
      title: dates.basic.title,
    },
    {
      date: `${frmtDt(dates.final.start)} – ${frmtDt(dates.final.end)}`,
      title: dates.final.title,
    },
    { date: `${frmtDt(dates.short.end)}`, title: dates.short.title },
    { date: `${frmtDt(dates.winner.end)}`, title: dates.winner.title },
    { date: `${frmtDt(dates.reward.end)}`, title: dates.reward.title },
  ];

  const getLength = (date: Date) => {
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

  const getLengthMob = (date: Date, s: any) => {
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
          const hoursStartToToday = differenceInHours(
            date,
            dates[key[0]].start,
          );
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

  return { getLength, head, schedule, getLengthMob };
};

export default useControlDate;
