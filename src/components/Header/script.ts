import { paths } from "@/service/paths";
import IconLogoYoung from "@/images/header/logo_link.svg?react";
import { useCheckDeadline } from "../jury_account_list/service";
import useWinners from "@/hooks/winners";

export const useGetLinks = () => {
  const { isShort } = useCheckDeadline();
  const { isWinners } = useWinners();

  const links = [
    {
      // label: isShort ? "Шорт-лист" : "Номинации",
      // path: isShort ? paths.shortlist : paths.nominations,
      label: "Номинации",
      path: paths.nominations,
    },
    {
      label: "Young Talent by",
      path: paths.young_talent,
      logo: IconLogoYoung,
      submenu: [
        {
          label: isShort ? "Шорт-лист" : "Номинации",
          path: isShort ? paths.shortlist_young : paths.nominations_young,
        },
        { label: "Критерии оценки", path: paths.criteria_young },
        { label: "Стоимость", path: paths.price_young },
        { label: "Требования", path: paths.requirements_young },
      ],
    },
    { label: "Бренд-питчи", path: paths.pitch },
    {
      label: "Участникам",
      path: paths.participants,
      submenu: [
        { label: "Стоимость", path: paths.price },
        { label: "Требования", path: paths.requirements },
        { label: "Критерии оценки", path: paths.criteria },
        { label: "FAQ", path: paths.faq },
      ],
    },
    {
      label: "Жюри",
      path: paths.jury_main,
      submenu: [
        { label: "Основное жюри", path: paths.jury_main },
        { label: "Специальное жюри", path: paths.jury_special },
      ],
    },
    {
      label: "Программа",
      path: paths.program,
      // submenu: [{ label: "Спикеры", path: paths.speakers }],
    },
    {
      label: "О нас",
      path: "about_the_festival",
    },
  ];

  const array = links.map((item, i) => {
    if (i === 0) {
      if (isShort) {
        return {
          label: "Шорт-лист",
          path: paths.shortlist,
        };
      }

      return item;
    }
    return item;
  });

  console.log(array);

  return { links };
};
