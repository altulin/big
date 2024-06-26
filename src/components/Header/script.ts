import { paths } from "@/service/paths";

export const links = [
  { label: "Номинации", path: paths.nominations },
  {
    label: "Подача работ",
    path: paths.submission_of_works,
    submenu: [
      { label: "Цены", path: paths.price },
      { label: "Тех.требования", path: paths.requirements },
      { label: "Критерии оценки", path: paths.criteria },
    ],
  },
  {
    label: "Жюри",
    path: paths.jury,
    // submenu: [{ label: "Спикеры", path: "speakers" }],
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
