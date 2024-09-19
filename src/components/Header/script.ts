import { paths } from "@/service/paths";
import IconLogoYoung from "@/images/header/logo_link.svg?react";
import { useCheckDeadline } from "../jury_account_list/service";
import { useCallback } from "react";

const links = [
  // { label: "Номинации", path: paths.nominations },
  // { label: "Шорт-лист", path: paths.shortlist },
  {
    label: "Young Talent by",
    path: paths.young_talent,
    logo: IconLogoYoung,
    submenu: [
      { label: "Шорт-лист", path: paths.shortlist_young },
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

const link_nominations = {
  label: "Номинации",
  path: paths.nominations,
};

const link_shortlist = {
  label: "Шорт-лист",
  path: paths.shortlist,
};

export const useGetLinks = () => {
  const { isShort } = useCheckDeadline();

  const getArr = useCallback(() => {
    const arr = [...links];
    arr.splice(0, 0, isShort ? link_shortlist : link_nominations);
    return arr;
  }, [isShort]);

  return { links: getArr() };
};
