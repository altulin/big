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
  valid,
} from "./errText";
// import {
//   file,
//   nameMax,
//   nameMin,
//   required,
//   valid,
// } from "../../form/input/js/errText";

// const MAX_FILE_SIZE = 5; //100KB
const MAX_FILE_SIZE = 5242880; //5Mb

// const validFileExtensions = {
//   image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
// };

// function isValidFileType(fileName: any, fileType: any) {
//   return (
//     fileName &&
//     validFileExtensions[fileType as keyof typeof validFileExtensions].indexOf(
//       fileName.split(".").pop(),
//     ) > -1
//   );
// }

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
  // file: yup.mixed().test("fileSize", required, (value) => {
  //   if (value === undefined || value === null || value.length === 0) {
  //     return true; // attachment is optional
  //   }
  // }),

  brand: yup.string().required(required),
  name_work: yup.string().required(required),
  nomination: yup.string().required(required),
  deadlines: yup.string().required(required),
  targets: yup.string().required(required),
  target_audience: yup.string().required(required),
  insight_and_idea: yup.string().required(required),
  about_the_project: yup.string().required(required),
  link: yup.string().required(required),
  credits: yup.string().required(required),

  project_image: yup
    .mixed()
    .required(file)

    .test("fileSize", fileMax, (value) => {
      return value && value.size <= MAX_FILE_SIZE;
      // if (value instanceof File) {
      //   return value.size <= MAX_FILE_SIZE;
      // }
      // return false;
    }),
};

export const getValidationSchema = (arr: string[]) => {
  const schema: { [key: string]: yup.ObjectSchema<any> } = {};

  arr.forEach((el: string) => {
    schema[el] = object[el];
  });

  return yup.object().shape(schema);
};

export const validationSchema = yup.object().shape(object);
