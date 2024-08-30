import { categoriesLabel } from "../Pass/script";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const radio_list = [
  {
    label: "В шорт-лист",
    value: "short_list",
    icon: null,
  },
  {
    label: "Не в шорт-лист",
    value: "not_short_list",
    icon: null,
  },
  // {
  //   label: "Моя работа",
  //   value: "my_work",
  //   icon: null,
  // },
];

export const info_keys = [
  "id",
  "category",
  "status",
  "title",
  "brand",
  "nomination",
  "deadlines",
  "goals",
  "idea",
  "about_project",
  "work_link",
  "credits",
  "target_audience",
  "project_image",
  "project_image_url",
];

export const ban_list = [
  "id",
  "title",
  "is_reviewed",
  "voting_result",
  "status",
  "credits",
  "cost",
];

export const getInfoLabel = (label: string) => {
  let result = "";
  switch (label) {
    case "id":
      result = "ID";
      break;

    case "category":
      result = "Категория";
      break;

    case "status":
      result = "Статус";
      break;

    case "title":
      result = "Название работы";
      break;

    case "brand":
      result = "Бренд";
      break;

    case "nomination":
      result = "Номинация";
      break;

    case "deadlines":
      result = "Дедлайны";
      break;

    case "goals":
      result = "Цели";
      break;

    case "idea":
      result = "Идея";
      break;

    case "about_project":
      result = "О проекте";
      break;

    case "work_link":
      result = "Ссылка на работу";
      break;

    case "credits":
      result = "Кредиты";
      break;

    case "target_audience":
      result = "Целевая аудитория";
      break;

    case "project_image":
      result = "Изображение проекта";
      break;

    case "project_image_url":
      result = "Ссылка на изображение проекта";
      break;

    case "vote":
      result = "Статус голосования";
      break;

    default:
      result = "Нет данных";
  }

  return result;
};

export const getVoteStatus = (value: string) => {
  switch (value) {
    case "short_list":
      return "В шорт-лист";
    case "not_short_list":
      return "Не в шорт-лист";
    case "pending":
      return "В ожидании";
    default:
      return "Нет данных";
  }
};

export const getValRadio = (value: string | undefined) => {
  switch (value) {
    case "not_short_list":
      return "not_short_list";

    default:
      return "short_list";
  }
};

export const getArray = (el_info: any, ban_list: any) => {
  const array: any = [];

  Object.keys(el_info).forEach((item) => {
    console.log(item);
    if (ban_list.includes(item)) return;

    const key = `${getInfoLabel(item)}:`;

    let value;

    switch (item) {
      case "category":
        value = categoriesLabel[`${el_info[item]}`];
        break;

      case "vote":
        value = getVoteStatus(el_info[item]);
        break;
      default:
        value = el_info[item] ? el_info[item] : "отсутствует";
    }

    array.push({ key, value });
  });

  return array;
};
