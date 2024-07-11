/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import * as yup from "yup";
import { object } from "@/service/form/validation";

export const useInitialValues = () => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const { forms } = useAppSelector((state) => state.form);
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

  const createInitialValues = () => {
    let values: { [key: string]: any } = {
      category: category || "",
      categoryPitch: categoryPitch || "",
    };

    forms.forEach((item: any) => {
      const id = item.id;
      const data = { ...item.data };
      const keys = Object.keys(template);

      keys.forEach((item) => {
        if (!data[`${item}_${id}`]) {
          data[`${item}_${id}`] = template[item];
        }
      });

      values = { ...values, ...data };
    });

    // values = { category: category || "", categoryPitch: categoryPitch || "" };

    // console.log(values);

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
