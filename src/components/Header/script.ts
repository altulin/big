import { paths } from "@/service/paths";
import IconLogoYoung from "@/images/header/logo_link.svg?react";
import { useCheckDeadline } from "../jury_account_list/service";
import useWinners from "@/hooks/winners";

const labels = {
  nominations: "Номинации",
  young_talent: "Young Talent by",
  criteria: "Критерии оценки",
  price: "Стоимость",
  requirements: "Требования",
  pitch: "Бренд-питчи",
  participants: "Участникам",
  winners: "Победители",
  faq: "FAQ",
  jury: "Жюри",
  jury_main: "Основное жюри",
  jury_special: "Специальное жюри",
  program: "Программа",
  speakers: "Спикеры",
  about: "О нас",
  shortlist: "Шорт-лист",
};

const {
  nominations,
  young_talent,
  criteria,
  price,
  requirements,
  pitch,
  participants,
  faq,
  jury,
  jury_main,
  jury_special,
  program,
  about,
  shortlist,
  winners,
} = labels;

export const useGetLinks = () => {
  const { isShort } = useCheckDeadline();
  const { isWinners } = useWinners();

  const links = [
    {
      label: nominations,
      path: paths.nominations,
    },
    {
      label: young_talent,
      path: paths.young_talent,
      logo: IconLogoYoung,
      submenu: [
        { label: nominations, path: paths.nominations_young },
        { label: criteria, path: paths.criteria_young },
        { label: price, path: paths.price_young },
        { label: requirements, path: paths.requirements_young },
      ],
    },
    { label: pitch, path: paths.pitch },
    {
      label: participants,
      path: paths.participants,
      submenu: [
        { label: price, path: paths.price },
        { label: requirements, path: paths.requirements },
        { label: criteria, path: paths.criteria },
        { label: faq, path: paths.faq },
      ],
    },
    {
      label: jury,
      path: paths.jury_main,
      submenu: [
        { label: jury_main, path: paths.jury_main },
        { label: jury_special, path: paths.jury_special },
      ],
    },
    {
      label: program,
      path: paths.program,
      // submenu: [{ label: "Спикеры", path: paths.speakers }],
    },
    {
      label: about,
      path: "about_the_festival",
    },
  ];

  const array = links.map((item) => {
    if (item.label === nominations) {
      let elem = item;

      if (isShort) {
        elem = {
          label: shortlist,
          path: paths.shortlist,
        };
      }
      if (isWinners) {
        elem = {
          label: winners,
          path: paths.winners,
        };
      }

      return elem;
    }

    if (item.label === young_talent) {
      const elem = item;

      const subArray = elem.submenu?.map((subItem) => {
        if (subItem.label === nominations) {
          let subElem = subItem;

          if (isShort) {
            subElem = {
              label: shortlist,
              path: paths.shortlist_young,
            };
          }

          if (isWinners) {
            subElem = {
              label: winners,
              path: paths.winners_young,
            };
          }

          return subElem;
        }

        return subItem;
      });

      elem.submenu = subArray;
      return elem;
    }

    return item;
  });

  return { links: array };
};
