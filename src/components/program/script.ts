import img from "@/images/program/img_program.png";

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

export interface IProgram {
  title: string;
  date: string;
  time: string;
  speakers: { avatar: string; name: string }[];
  description: string;
}

const description =
  "Индустрия видеопроизводства в России стремительно развивается. С каждым годом появляется всё больше интересных работ, новых форматов и технических решений. Но имена многих талантов остаются неуслышанными, и рынок не знает в лицо своих героев.";

const time = "21:00-22:00";

export const program: IProgram[] = [
  {
    title: "Big Battle: AI или крафт?",
    date: "04/07",
    time,
    speakers,
    description,
  },
  {
    title: "Наболело: препродакшен.",
    date: "11/07",
    time,
    speakers,
    description,
  },
  {
    title: "Big Pic: 'не будем называть бренд.'",
    date: "18/07",
    time,
    speakers,
    description,
  },
  {
    title: "ШОУ Угадай сколько? квн",
    date: "25/07",
    time,
    speakers,
    description,
  },
  {
    title: "Big Battle: Супер техника или достаточно базы?",
    date: "01/08",
    time,
    speakers,
    description,
  },
  {
    title: "Музыка",
    date: "08/08",
    time,
    speakers,
    description,
  },
  {
    title: "Big Battle: Inhouse продакшен vs independent продакшен",
    date: "15/08",
    time,
    speakers,
    description,
  },
  {
    title: "Брендированный толк",
    date: "22/08",
    time,
    speakers,
    description,
  },
  {
    title: "Производство контента на МегаСкоростях.",
    date: "29/08",
    time,
    speakers,
    description,
  },
  {
    title: "Иммерсивный особняк + награждение",
    date: "12/09",
    time,
    speakers,
    description,
  },
];
