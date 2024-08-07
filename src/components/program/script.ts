/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProgram {
  title: string[];
  date: string;

  speakers: { name: string; info_prof?: string }[];
  description: string;
  logo?: any;
  place: {
    visiting: string;
    address: string;
    time: string;
  };
  link_reg?: { href: string; label: string };
  link_online?: { href: string; label: string };
  is_description: boolean;
  is_mega?: boolean;
}

export const program: IProgram[] = [
  {
    title: ["Препродакшн:", "говорим как есть."],
    date: "01/08",
    place: {
      visiting: "REASON PICTURES",
      address: "Котельная на Хлебозаводе / Новодмитровская ул., 1, стр. 23",
      time: "18:30",
    },

    speakers: [
      {
        name: "Катя Жаворонкова",
        info_prof: "Совладелец, генеральный продюсер Reason Pictures",
      },
      {
        name: "Мина Хлечян",
        info_prof: "Второй режиссер",
      },
      {
        name: "Анна Коновалова",
        info_prof: "Senior MarCom&Brand Avito",
      },
      {
        name: "Ира Лаврова",
        info_prof: "Head of production Friends",
      },
      {
        name: "Александра Галиус",
        info_prof: "Старший продюсер Fetish Film",
      },
      {
        name: "Гоша Евдокимов",
        info_prof: "Режиссер",
      },
      {
        name: "Таир Полад-заде",
        info_prof: "Режиссер",
      },
      {
        name: "Елена Игошина",
        info_prof: "Producer Мегафон&Yota",
      },
      {
        name: "Заур Фардзинов",
        info_prof:
          "Сo-founder and creative director Showrunners, Mass delusion",
      },
    ],
    description:
      "Подготовка к съемкам — процесс масштабный и сложносоставной. Обсудим с представителями индустрии, кого что не устраивает и как это исправить. Начнем с паблик-тока, продолжим легкой вечеринкой!",
    link_reg: {
      href: "https://nuum.ru/videos/2970304-pablik-tok-preprodakshn-govorim-kak-est-by-bpf-reason-pictures",
      label: "смотреть запись",
    },
    // link_online: {
    //   href: "https://nuum.ru/channel/bigpicturefestival/streams",
    //   label: "Смотреть онлайн",
    // },
    is_description: true,
  },
  {
    title: ["LED-экраны:", "съёмка без", "ограничений?"],
    date: "08/08",
    place: {
      visiting: "ЗАГРАНИЦА & Виртуальный продакшен Горького",
      address: `ПАВИЛЬОН: "55.8" ВИРТУАЛЬНАЯ СТУДИЯ / 2ая Магистральная ул. Д16с7`,
      time: "19:30",
    },
    speakers: [
      {
        name: "Алексей Куприянов",
        info_prof: "Оператор-постановщик",
      },
      {
        name: "Иван Степин",
        info_prof: "Руководитель продакшна «Заграница»",
      },
      {
        name: "Георгий Грановский",
        info_prof: "Оператор",
      },
      {
        name: "Иван Оганесов",
        info_prof: "Режиссер",
      },
      {
        name: "Ника Кадо",
        info_prof: "Руководитель Виртуального продакшена Горького",
      },
      {
        name: "Елена Егорова",
        info_prof: "Руководитель группы продюсирования Яндекс Еда",
      },
      {
        name: "Борис Петров",
        info_prof: "исполнительный продюсер Яндекс Еда",
      },
      {
        name: "Максим Ежов",
        info_prof: "Креативный директор команды рекламных запусков WildBerries",
      },
      {
        name: "Сергей Анохин",
        info_prof: "Старший креативный продюсер  Magic Camp",
      },
    ],
    description:
      "Что делать, когда «нам нужно снять лето зимой», а ЮАР — дорого? Снимать на экранах! Паблик-ток пройдет в павильоне с LED экранами студии Горького. После круглого стола послушаем музыку и поиграем в плейстейшн на большом LED экране.",
    link_reg: {
      href: "https://bpf2024.timepad.ru/event/2967461/",
      label: "Регистрация",
    },
    link_online: {
      href: "https://nuum.ru/channel/bigpicturefestival/streams",
      label: "Смотреть онлайн",
    },
    is_description: true,
  },
  {
    title: ["Big Battle:", "AI или крафт?"],
    date: "15/08",
    place: {
      visiting: "HYPE PRODUCTION",
      address: "ул. Усачева, 11к",
      time: "18:30",
    },
    speakers: [
      {
        name: "Мурад Османн",
        info_prof: "Co-Founder HYPE",
      },
      {
        name: "Влад Ситников",
        info_prof: "Партнер GRAPE",
      },
      {
        name: "Саша Доброкотов",
        info_prof: "Независимый креативный директор",
      },
      {
        name: "Даниил Трабун",
        info_prof: "Независимый креативный директор",
      },
      {
        name: "Эдуард Маас",
        info_prof: "Руководитель цифровой лаборатории D.Lab",
      },
    ],
    description:
      "Рукотворный трудозатратный крафт versus грамотные промпты: когда нейронкам стоит делегировать задачи, а когда лучше сделать самому? Ну и, конечно, классика: кого уволят первым?",
    link_online: {
      href: "https://nuum.ru/channel/bigpicturefestival/streams",
      label: "Смотреть онлайн",
    },
    is_description: true,
  },
  {
    title: ["COMING SOON"],
    date: "22/08",
    place: { visiting: "", address: "", time: "" },
    speakers: [
      {
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
    place: { visiting: "", address: "", time: "" },
    speakers: [
      {
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
      visiting: "STEREOTACTIC",
      address: "ул. Образцова, 7 ",
      time: "18:30",
    },
    speakers: [
      {
        name: "Ольга Казьмина",
        info_prof: "Head of Brand & Marcom Мегамаркет",
      },
      {
        name: "Паша Карыхалин",
        info_prof: "Креативный продюсер и co-founder Stereotactic",
      },
      {
        name: "Антон Мельников",
        info_prof: "Креативный директор EMG",
      },
      {
        name: "Саша Медведко",
        info_prof: "Генеральный директор Stereotactic",
      },
      {
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
    link_online: {
      href: "https://nuum.ru/channel/bigpicturefestival/streams",
      label: "Смотреть онлайн",
    },
    is_description: true,
    is_mega: true,
  },
  {
    title: ["COMING SOON"],
    date: "11/09",
    place: { visiting: "", address: "", time: "" },
    speakers: [
      {
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
    place: { visiting: "", address: "", time: "" },
    speakers: [
      {
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
    place: { visiting: "", address: "", time: "" },
    speakers: [
      {
        name: "",
        info_prof: "",
      },
    ],
    description: "",
    is_description: false,
  },
];
