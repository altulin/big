/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import * as yup from "yup";
import { object } from "@/service/form/validation";

export const useInitialValues = () => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const template: any = {
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

    // project_image: null,
    // buy: 0,
    // total: 0,
    // category: category,
    // categoryPitch: categoryPitch,
  };

  const createInitialValues = (works_amount: number) => {
    const values: { [key: string]: any } = {
      category: category || "",
      categoryPitch: categoryPitch || "",
    };
    const keys = Object.keys(template);

    let n = 0;

    while (n < works_amount) {
      keys.forEach((item) => {
        return (values[`${item}_${n}`] = template[item]);
      });

      n = n + 1;
    }

    return values;
  };

  const createValidationSchema = (works_amount: number) => {
    const schema: any = {};

    const keys = Object.keys(template);

    let n = 0;

    while (n < works_amount) {
      keys.forEach((item) => {
        return (schema[`${item}_${n}`] = object[`${item}`]);
      });

      n = n + 1;
    }

    // console.log(schema);

    return yup.object().shape(schema);
  };

  return { createInitialValues, createValidationSchema };
};
