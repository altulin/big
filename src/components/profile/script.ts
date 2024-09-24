import IconNuum from "@/images/profile/logo_link.svg?react";
import IconMega from "@/images/profile/mega.svg?react";

const name =
  "Какое-то супердлинное название работы, возможно в две или более строк";

const category = "Основная";

const href = "www.google.com";
const nomination = "Промо ролик для ТВ/кино";
const credits = [
  "Режиссер - Олег Песочинский",
  "Съемки и монтаж - Олег Песочинский",
  "Сведение и мастеринг звука - Олег Песочинский",
  "Продюсер - Олег Песочинский",
];
const insight =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus luctus felis non pulvinar. Mauris molestie dapibus enim ut egestas. Suspendisse pharetra sodales quam, eu sollicitudin ante porttitor sit amet. Integer luctus augue at ultrices varius. Integer suscipit varius urna ac congue. Proin vulputate turpis vitae magna viverra, quis volutpat nisl varius. Donec eleifend quis erat quis mattis. Suspendisse sodales mauris massa, at venenatis nulla tempor lobortis";
const file = "сценарий.doc";
const about =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus luctus felis non pulvinar. Mauris molestie dapibus enim ut egestas. Suspendisse pharetra sodales quam, eu sollicitudin ante porttitor sit amet. Integer luctus augue at ultrices varius. Integer suscipit varius urna ac congue. Proin vulputate turpis vitae magna viverra, quis volutpat nisl varius. Donec eleifend quis erat quis mattis. Suspendisse sodales mauris massa, at venenatis nulla tempor lobortis";

export const list = [
  {
    name,
    status: "awaiting",
    category,
    href,
    nomination,
    credits,
  },
  {
    name,
    status: "awaiting",
    category: "Young Talent",
    href,
    nomination,
    credits,
  },
  {
    name,
    status: "awaiting",
    category: "Бренд Питч от",
    img_category: IconNuum,
    href,
    about,
  },
  {
    name,
    status: "paid",
    category: "Бренд Питч от",
    img_category: IconMega,
    insight,
    file,
  },
];

export const ban_list = [
  "id",
  "pitch_brand",
  "script",
  "script_url",
  "cost",
  "works_cost",
  "project_image",
  "project_image_url",
  "status",
  "title",
  "brand",
  "deadlines",
  "target_audience",
  "goals",
  "presentation_url",
  "presentation",
  "author",
];
