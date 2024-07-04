/* eslint-disable @typescript-eslint/no-explicit-any */
import img from "@/images/program/img_program.png";
import IconMega from "@/images/profile/mega.svg?react";

const speakers = [
  {
    avatar: img,
    name: "Adam Bentel",
  },
  {
    avatar: img,
    name: "Тим Черный",
  },
  {
    avatar: img,
    name: "Марьям Ахунова",
  },
];

const place = {
  info: "Место и время проведения:",
  address: "Плюс Дача",
  time: "21:00",
};

export interface IProgram {
  title: string[];
  date: string;

  speakers: { avatar: string; name: string }[];
  description: string;
  logo?: any;
  place: {
    info: string;
    address: string;
    time: string;
  };
}

const description =
  "Индустрия видеопроизводства в России стремительно развивается. С каждым годом появляется всё больше интересных работ, новых форматов и технических решений. Но имена многих талантов остаются неуслышанными, и рынок не знает в лицо своих героев.";

const time = "21:00-22:00";

export const program: IProgram[] = [
  {
    title: ["Big Battle:", "AI или крафт?"],
    date: "04/07",
    place,
    speakers,
    description,
  },
  {
    title: ["Наболело:", "препродакшен."],
    date: "11/07",
    place,
    speakers,
    description,
  },
  {
    title: ["Big Pic:", "не будем", "называть", "бренд."],
    date: "18/07",
    place,
    speakers,
    description,
  },
  {
    title: ["ШОУ Угадай", "сколько?", "квн"],
    date: "25/07",
    place,
    speakers,
    description,
  },
  {
    title: ["Big Battle:", "Супер", "техника или", "достаточно", "базы?"],
    date: "01/08",
    place,
    speakers,
    description,
  },
  {
    title: ["Музыка"],
    date: "08/08",
    place,
    speakers,
    description,
  },
  {
    title: [
      "Big Battle:",
      "Inhouse",
      "продакшен vs",
      "independent",
      "продакшен",
    ],
    date: "15/08",
    place,
    speakers,
    description,
  },
  {
    title: ["Брендированный", "толк"],
    date: "22/08",
    place,
    speakers,
    description,
  },
  {
    title: ["Производство", "контента на", "МегаСкоростях."],
    date: "29/08",
    place,
    speakers,
    description,
    logo: IconMega,
  },
  {
    title: ["Иммерсивный", "особняк +", "награждение"],
    date: "12/09",
    place,
    speakers,
    description,
  },
];
