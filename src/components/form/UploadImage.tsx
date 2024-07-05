/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import clsx from "clsx";
import { FormikErrors, useField } from "formik";
import { FC, useEffect, useId, useState } from "react";
import style from "./Form.module.scss";
import IconUpload from "@/images/form/upload.svg?react";

interface IUploadFile {
  data?: any;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined,
  // ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  // errors: FormikErrors<{ image?: File }> | any;
  name: string;
  prefix?: string;
  accept?: string;
}

const UploadImage: FC<IUploadFile> = ({
  data,
  name,
  prefix,
  accept = ".jpg, .png, .jpeg",
}) => {
  const [meta, field] = useField({ name: `${name}` });

  const id = useId();
  const [upload, setUpload] = useState({
    isFile: false,
    fileName: "",
    text: "Нажмите или перетащите сюда файл, чтобы загрузить",
  });

  useEffect(() => {
    if (data.values[`${name}`] instanceof File) {
      setUpload({
        isFile: true,
        fileName: data.values[`${name}`].name,
        text: "Файл загружен:",
      });
    } else {
      setUpload({
        isFile: false,
        fileName: "",
        text: "Нажмите или перетащите сюда файл, чтобы загрузить",
      });
    }
  }, [data, name]);

  return (
    <div className={clsx(style[`${prefix}__box`])}>
      <label className={clsx(style[`${prefix}__label`])} htmlFor={id}>
        <input
          id={id}
          type="file"
          name={name}
          className={clsx(style[`${prefix}__input`])}
          accept={accept}
          onChange={(e) => {
            if (e.currentTarget.files) {
              data.setFieldValue(`${name}`, e.currentTarget.files[0]);
            }
          }}
          onBlur={() => {
            data.setTouched({ ...data.touched, [`${name}`]: true });
          }}
        />

        <div className={clsx(style[`${prefix}__view`])}>
          {!upload.isFile && <IconUpload />}

          <span className={clsx(style[`${prefix}__view_text`])}>
            {upload.text}

            {upload.isFile && (
              <span className={clsx(style[`${prefix}__view_name`])}>
                {upload.fileName}
              </span>
            )}
          </span>
        </div>
      </label>

      {field.touched && field.error && (
        <span className={clsx(style.error)}>
          <span className={clsx(style.error__text)}>{field.error}</span>
        </span>
      )}
    </div>
  );
};

export default UploadImage;
