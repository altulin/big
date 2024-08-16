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
  {
    label: "Моя работа",
    value: "my_work",
    icon: null,
  },
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

    default:
      result = "Нет данных";
  }

  return result;
};
