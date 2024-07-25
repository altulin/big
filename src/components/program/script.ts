/* eslint-disable @typescript-eslint/no-explicit-any */
import img from "@/images/program/img_program.png";

export interface IProgram {
  title: string[];
  date: string;

  speakers: { avatar: string; name: string; info_prof?: string }[];
  description: string;
  logo?: any;
  place: {
    info: string;
    address: string;
    time: string;
  };
  link_reg?: { href: string; label: string };
  is_description: boolean;
}

const info = "Место и время:";

export const program: IProgram[] = [
  {
    title: ["Препродакшн:", "говорим как есть."],
    date: "01/08",
    place: {
      info,
      address: "",
      time: "coming soon",
    },

    speakers: [
      {
        avatar: img,
        name: "Катя Жаворонкова",
        info_prof: "Совладелец, генеральный продюсер Reason Pictures",
      },
      {
        avatar: img,
        name: "Мина Хлечян",
        info_prof: "Второй режиссер",
      },
      {
        avatar: img,
        name: "Анна Коновалова",
        info_prof: "Senior MarCom&Brand Avito",
      },
      {
        avatar: img,
        name: "Ира Лаврова",
        info_prof: "Head of production Friends",
      },
    ],
    description:
      "Подготовка к съемкам — процесс нервный. Обсудим с разными участниками процесса, у кого что наболело, и как эти больные места лечить.",
    link_reg: {
      href: "https://bpf2024.timepad.ru/event/2961533/",
      label: "Регистрация",
    },
    is_description: true,
  },
  {
    title: ["LED-экраны:", "съёмка без", "ограничений?"],
    date: "08/08",
    place: {
      info,
      address: "Киностудия им.Горького",
      time: "18:30",
    },
    speakers: [
      {
        avatar: img,
        name: "Андрей Шавкеро",
        info_prof: "Режиссер",
      },
      {
        avatar: img,
        name: "Алексей Куприянов",
        info_prof: "Оператор",
      },
      {
        avatar: img,
        name: "Иван Яковенко",
        info_prof: "продюсер «Заграница»",
      },
      {
        avatar: img,
        name: "Ника Кадо",
        info_prof: "Заведующая. Виртуальная студия Горького",
      },
    ],
    description:
      "Что делать, когда «нам нужно снять лето зимой», а ЮАР — дорого? Снимать на экранах!",
    link_reg: {
      href: "https://bpf2024.timepad.ru/event/2967461/",
      label: "Регистрация",
    },
    is_description: true,
  },
  {
    title: ["Big Battle:", "AI или крафт?"],
    date: "15/08",
    place: {
      info,
      address: "ул. Усачева, 11к",
      time: "18:30",
    },
    speakers: [
      {
        avatar: img,
        name: "Мурад Османн",
        info_prof: "Co-Founder HYPE",
      },
      {
        avatar: img,
        name: "Влад Ситников",
        info_prof: "Партнер GRAPE",
      },
      {
        avatar: img,
        name: "Саша Доброкотов",
        info_prof: "Независимый креативный директор",
      },
      {
        avatar: img,
        name: "Даниил Трабун",
        info_prof: "Независимый креативный директор",
      },
      {
        avatar: img,
        name: "Эдуард Маас",
        info_prof: "Руководитель цифровой лаборатории D.Lab",
      },
    ],
    description:
      "Рукотворный трудозатратный крафт versus грамотные промпты: когда нейронкам стоит делегировать задачи, а когда лучше сделать самому? Ну и, конечно, классика: кого уволят первым?",
    is_description: true,
  },
  {
    title: ["COMING SOON"],
    date: "22/08",
    place: {
      info,
      address: "",
      time: "",
    },
    speakers: [
      {
        avatar: img,
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
  {
    title: ["COMING SOON"],
    date: "29/08",
    place: {
      info,
      address: "",
      time: "",
    },
    speakers: [
      {
        avatar: img,
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
  {
    title: ["Производство", "контента на", "МегаСкоростях:", "как выжить?"],
    date: "05/09",
    place: {
      info,
      address: "ул. Образцова, 7 ",
      time: "18:30",
    },
    speakers: [
      {
        avatar: img,
        name: "Ольга Казьмина",
        info_prof: "Head of Brand & Marcom Мегамаркет",
      },
      {
        avatar: img,
        name: "Паша Карыхалин",
        info_prof: "Креативный продюсер и co-founder Stereotactic",
      },
      {
        avatar: img,
        name: "Антон Мельников",
        info_prof: "Креативный директор EMG",
      },
      {
        avatar: img,
        name: "Саша Медведко",
        info_prof: "Генеральный директор Stereotactic",
      },
      {
        avatar: img,
        name: "Алеша",
        info_prof: "Режиссер",
      },
    ],
    description:
      "Производство контента в 2024 выходит на новые скорости: как к ним адаптироваться и не потерять в качестве креатива?",
    link_reg: {
      href: "https://bpf2024.timepad.ru/event/2967459/",
      label: "Регистрация",
    },
    is_description: true,
  },
  {
    title: ["COMING SOON"],
    date: "11/09",
    place: {
      info,
      address: "",
      time: "",
    },
    speakers: [
      {
        avatar: img,
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
  {
    title: [
      "Big Pic:",
      "«не будем",
      "называть бренд»",
      "или неловкие",
      "моменты",
      "на площадке.",
    ],
    date: "19/09",
    place: {
      info,
      address: "",
      time: "",
    },
    speakers: [
      {
        avatar: img,
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
  {
    title: ["ЦЕРЕМОНИЯ", "НАГРАЖДЕНИЯ"],
    date: "03/10",
    place: {
      info,
      address: "",
      time: "",
    },
    speakers: [
      {
        avatar: img,
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
];
