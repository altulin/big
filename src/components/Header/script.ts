import { paths } from "@/service/paths";

export const links = [
  { label: "Номинации", path: paths.nominations },
  { label: "Бренд питчи", path: paths.pitch },
  {
    label: "Участникам",
    path: paths.participants,
    submenu: [
      { label: "Стоимость", path: paths.price },
      { label: "Требования", path: paths.requirements },
      { label: "Критерии оценки", path: paths.criteria },
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
    label: "О фестивале",
    path: "about_the_festival",
    submenu: [{ label: "FAQ", path: "faq" }],
  },
  { label: "Контакты", path: "contacts" },
];
