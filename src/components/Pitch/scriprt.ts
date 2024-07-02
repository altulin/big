/* eslint-disable @typescript-eslint/no-explicit-any */

import IconNuum from "@/images/pitch/nuum.svg?react";
import IconMega from "@/images/pitch/mega.svg?react";
import { FunctionComponent, SVGProps } from "react";

type TPitch = {
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  text: string;
  list: {
    link?: string;
    label: string;
    href?: any;
    template?: string;
    label_2?: string;
  }[];
  deadline: string;
  modifier?: string;
};

export const pitch: TPitch[] = [
  {
    modifier: "nuum",
    icon: IconNuum,
    text: "Специальный творческий конкурс для молодых талантов. Прояви себя и получи шанс попасть на настоящие съемки рекламы!",
    deadline: "20 сентября",
    list: [
      {
        label: "Сними вертикальное видео до 30сек по",
        link: "брифу",
        href: "#",
      },
      {
        label: "Загрузи видео с хештегом #bpfpitch24 на платформу ",
        link: "https://nuum.ru/",
        href: "https://nuum.ru/",
      },
      {
        label:
          "Все работы отсмотрит экспертное жюри фестиваля вместе с представителями Nuum и МТС",
      },
      {
        label:
          "3 самых талантливых работы получать приз: возможность снять бекстейдж на съемках крупного рекламного ролика в ноябре 2024",
      },
    ],
  },
  {
    modifier: "mega",
    icon: IconMega,
    text: "Специальный творческий конкурс для молодых талантов. Прояви себя и получи шанс попасть на настоящие съемки рекламы!",
    deadline: "20 сентября",
    list: [
      {
        label: "Напиши сценарий по ",
        link: "брифу",
        href: "#",
      },
      {
        label: "Загрузи его в личный кабинет",
      },
      {
        label:
          "Все работы отсмотрит экспертное жюри фестиваля вместе с представителями Мегамаркет",
      },
      {
        label: "Самая крутая работа получит супер-приз —бесплатный курс от",
        link: "Московской школы кино,",
        href: "#",
        label_2: "а также шанс сделать с брендом настоящий проект",
      },
      {
        label:
          "Серебро и бронза получат прокомоды от Мегамаркет на 30 000 рублей",
      },
    ],
  },
];
