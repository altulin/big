/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import * as yup from "yup";
import {
  confrmPasswordMatch,
  file,
  nameMax,
  nameMin,
  passwordMax,
  passwordMin,
  required,
  requiredCeck,
  valid,
} from "./errText";
// import {
//   file,
//   nameMax,
//   nameMin,
//   required,
//   valid,
// } from "../../form/input/js/errText";

const object: any = {
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

  password: yup.string().required(required),

  confirm_password: yup
    .string()
    .required(required)
    .oneOf([yup.ref("password")], confrmPasswordMatch),

  rule: yup.boolean().oneOf([true], requiredCeck),

  select: yup.string().required(required),
  login: yup.string().required(required),

  text: yup.mixed().required(required),
  card: yup.mixed().required(required),

  file: yup.mixed().required(file),
  // .test("fileFormat", "Only PDF files are allowed", (value) => {
  //   if (value) {
  //     const supportedFormats = ["pdf"];
  //     console.log(value);
  //     return supportedFormats.includes(value.split(".").pop());
  //   }
  //   return true;
  // }),

  // rule: yup.boolean().oneOf([true], requiredCeck),
};

export const getValidationSchema = (arr: string[]) => {
  const schema = {};

  arr.forEach((el: string) => {
    schema[el] = object[el];
  });

  return yup.object().shape(schema);
};

export const validationSchema = yup.object().shape(object);
