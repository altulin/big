/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import * as yup from "yup";
import { object } from "@/service/form/validation";
import { categories, categoriesPitshes } from "./script";

const main = {
  brand: "",
  name_work: "",
  nomination: "",
  deadlines: "",
  targets: "",
  target_audience: "",
  insight_and_idea: "",
  about_the_project: "",
  link: "",
  credits: "",
  project_image: "",
};

const young = {
  brand: "",
  name_work: "",
  nomination: "",
  deadlines: "",
  targets: "",
  target_audience: "",
  insight_and_idea: "",
  about_the_project: "",
  link: "",
  credits: "",
  project_image: "",
};
const brand_pitches_nuum = {
  name_work: "",
  deadlines: "",
  insight_and_idea: "",
  about_the_project: "",
  link: "",
  project_image: "",
};
const brand_pitches_mega = {
  name_work: "",
  insight_and_idea: "",
  file: "",
};

export const useInitialValues = () => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);

  const getProperties = () => {
    switch (category) {
      case categories.main_category:
        return main;
      case categories.young_talent:
        return young;
      case categories.brand_pitches:
        if (categoryPitch === categoriesPitshes.nuum) {
          return brand_pitches_nuum;
        }
        if (categoryPitch === categoriesPitshes.mega) {
          return brand_pitches_mega;
        }
    }
    return {};
  };

  const createValidationSchema = () => {
    const schema: any = {};

    const keys = Object.keys(getProperties());

    keys.forEach((item) => {
      return (schema[`${item}`] = object[`${item}`]);
    });

    return yup.object().shape({
      fields: yup.array().of(yup.object().shape(schema)),
    });
  };

  return { createValidationSchema, getProperties };
};
