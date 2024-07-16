/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import * as yup from "yup";
import { object } from "@/service/form/validation";
import { categories, categoriesPitshes } from "./script";

const main = {
  brand: "",
  title: "",
  nomination: "",
  deadlines: "",
  goals: "",
  target_audience: "",
  idea: "",
  about_project: "",
  work_link: "",
  credits: "",
  // project_image: "",
};

const young = {
  brand: "",
  title: "",
  nomination: "",
  deadlines: "",
  goals: "",
  target_audience: "",
  idea: "",
  about_project: "",
  work_link: "",
  credits: "",
  // project_image: "",
};
const brand_pitches_nuum = {
  title: "",
  deadlines: "",
  idea: "",
  about_project: "",
  work_link: "",
  // project_image: "",
};
const brand_pitches_mega = {
  title: "",
  idea: "",
  // file: "",
};

const getVal = (template: any, values: any) => {
  const obj: any = {};

  Object.keys(template).forEach((key) => {
    obj[key] = values[key];
  });

  return obj;
};

export const useInitialValues = () => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);

  const getProperties = (values: any = null) => {
    switch (category) {
      case categories.main_category:
        if (values) {
          return getVal(main, values);
        }
        return main;
      case categories.young_talent:
        if (values) {
          return getVal(young, values);
        }
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

  const createValidationSchema = (page) => {
    const schema: any = {};

    const keys = Object.keys(getProperties());

    keys.forEach((item) => {
      if (page === "edit") {
        if (item === "project_image") {
          return;
        }
      }

      return (schema[`${item}`] = object[`${item}`]);
    });

    return yup.object().shape({
      fields: yup.array().of(yup.object().shape(schema)),
    });
  };

  return {
    createValidationSchema,
    getProperties,
  };
};
