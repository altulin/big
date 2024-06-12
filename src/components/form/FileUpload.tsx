import { FC } from "react";
import { Field, FormikProps, FormikValues } from "formik";
import style from "./Form.module.scss";
import clsx from "clsx";

interface IFileUpload {
  multiple?: boolean;
  field?: FormikProps<FormikValues>;
  form?: FormikProps<FormikValues>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FileUpload: FC<IFileUpload> = ({ field, form, ...props }) => {
  console.log(field);
  return (
    <div className={clsx(style.upload)}>
      <Field
        {...field}
        {...props}
        className={clsx(style.upload__input)}
      ></Field>
      <ul className={clsx(style.upload__list)}></ul>
    </div>
  );
};

export default FileUpload;
