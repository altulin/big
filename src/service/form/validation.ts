/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import * as yup from "yup";
import {
  confrmPasswordMatch,
  file,
  fileMax,
  nameMax,
  nameMin,
  passwordMax,
  passwordMin,
  required,
  requiredCeck,
  url,
  valid,
} from "./errText";

const MAX_FILE_SIZE = 5242880; //5Mb

const regMain =
  /(?:https?:\/\/)(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/|(?:www\.|m\.)?vimeo\.com\/|(?:www\.|m\.)?disk\.yandex\.ru\/|(?:www\.|m\.)?drive\.google\.com\/)([a-zA-Z0-9\_-]+)/;

const regNuum = /(?:https?:\/\/)((?:www\.|m\.)?nuum\.ru\/)([a-zA-Z0-9\_-]+)/;

export const object: any = {
  name: yup
    .string()
    .required(required)
    .matches(/[^-]$/, valid)
    .min(2, nameMin)
    .max(50, nameMax),

  surname: yup
    .string()
    .required(required)
    .matches(/[^-]$/, valid)
    .min(2, nameMin)
    .max(50, nameMax),

  phone: yup
    .string()
    .required(required)
    .matches(/^(\+7|8) \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/gm, valid),

  mail: yup
    .string()
    .required(required)
    .matches(/@[^.]*\./, valid)
    .email(valid),

  password: yup
    .string()
    .required(required)
    .min(8, passwordMin)
    .max(14, passwordMax),

  confirm_password: yup
    .string()
    .required(required)
    .oneOf([yup.ref("password")], confrmPasswordMatch),

  rule: yup.boolean().oneOf([true], requiredCeck),
  offer: yup.boolean().oneOf([true], requiredCeck),

  select: yup.string().required(required),
  login: yup.string().required(required),

  text: yup.mixed().required(required),
  card: yup.mixed().required(required),

  company_name: yup.mixed().required(required),

  file: yup.mixed().required(required),

  brand: yup.string().required(required),
  title: yup.string().required(required),
  nomination: yup.string().required(required),
  brand_category: yup.string().required(required),
  deadlines: yup.string().required(required),
  goals: yup.string().required(required),
  target_audience: yup.string().required(required),
  idea: yup.string().required(required),
  about_project: yup.string().required(required),

  ticket: yup.number().moreThan(0, required),

  work_link: yup.string().matches(regMain, url).required(required),
  work_link_nuum: yup.string().matches(regNuum, url).required(required),

  credits: yup.string().required(required),

  project_image: yup
    .mixed()
    .test("fileSize", fileMax, (value) => {
      if (typeof value === "string") return true;

      return (
        value && (value as any).size && (value as any).size <= MAX_FILE_SIZE
      );
    })
    .required(file),
};

export const getValidationSchema = (arr: string[]) => {
  const schema: { [key: string]: yup.ObjectSchema<any> } = {};

  arr.forEach((el: string) => {
    schema[el] = object[el];
  });

  return yup.object().shape(schema);
};

export const validationSchema = yup.object().shape(object);
