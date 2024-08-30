/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories } from "../Pass/script";

export const getCategory = (category: string) => {
  switch (category) {
    case categories.main_category:
      return "Основная категория";

    case categories.young_talent:
      return "Young Talent";

    case categories.brand_pitches:
      return "Бренд-питчи";
    default:
      return;
  }
};

export const getNominationValue = (nomination: any, list: any) => {
  return list.filter((item: any) => item.id === nomination)[0].title;
};

export const statuses: { [key: string]: string } = {
  paid: "paid",
  created: "created",
  payment_error: "payment_error",
  accepted: "accepted",
};
