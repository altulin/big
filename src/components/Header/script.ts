export const links = [
  { label: "Номинации", path: "nominations" },
  {
    label: "Подача работ",
    path: "submission_of_works",
    submenu: [
      { label: "Цены", path: "price" },
      { label: "Тех.требования", path: "requirements" },
      { label: "Критерии оценки", path: "criteria" },
    ],
  },
  {
    label: "Жюри",
    path: "jury",
    submenu: [{ label: "Спикеры", path: "speakers" }],
  },
  { label: "Программа", path: "program" },
  {
    label: "О фестивале",
    path: "about_the_festival",
    submenu: [{ label: "FAQ", path: "faq" }],
  },
  { label: "Контакты", path: "contacts" },
];
