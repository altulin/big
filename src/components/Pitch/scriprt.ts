/* eslint-disable @typescript-eslint/no-explicit-any */

// import IconNuum from "@/images/pitch/nuum.svg?react";
import IconMega from "@/images/pitch/mega.svg?react";
import IconNuumOnce from "@/images/pitch/nuum-onse.svg?react";
import { FunctionComponent, SVGProps } from "react";
import { categoriesPitshes } from "../Pass/script";
import { useSettigsQuery } from "@/store/rtk/main/settings";

type TPitch = {
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  title_mob: string;
  text: string;
  list: {
    link?: string;
    label: string;
    href?: any;
    template?: string;
    label_2?: string;
  }[];
  deadline: string;
  modifier: string;
};

export const usePitch = () => {
  const { data } = useSettigsQuery(undefined);

  const pitch: TPitch[] = [
    {
      title: "IDEA DAY by ",
      title_mob: "IDEA DAY by",
      modifier: categoriesPitshes.nuum,
      // icon: IconNuum,
      icon: IconNuumOnce,
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
      title: "Питч от ",
      title_mob: "Питч от ",
      modifier: categoriesPitshes.mega,
      icon: IconMega,
      text: "Специальный творческий конкурс для молодых талантов. Прояви себя и получи шанс попасть на настоящие съемки рекламы!",
      deadline: "20 сентября",
      list: [
        {
          label: "Напиши сценарий по ",
          link: "брифу",
          href: data?.brief_for_sbermarket,
        },
        {
          label: "Загрузи его на этот сайт",
        },
        {
          label:
            "Все работы отсмотрит экспертное жюри вместе с представителями от Мегамаркета",
        },
        {
          label:
            "Самая крутая работа получит супер приз - грант на интенсив от",
          link: "Московской школы кино,",
          href: "https://moscowfilmschool.ru/",
          label_2:
            "до 150 000 р., а также шанс сделать с брендом настоящий проект",
        },
        // {
        //   label:
        //     "Серебро и бронза получат прокомоды от Мегамаркет на 30 000 рублей",
        // },
      ],
    },
  ];

  return { pitch };
};
