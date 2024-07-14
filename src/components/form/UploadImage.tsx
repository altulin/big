/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import clsx from "clsx";
import { FormikErrors, useField } from "formik";
import { FC, useEffect, useId, useState } from "react";
import style from "./Form.module.scss";
import IconUpload from "@/images/form/upload.svg?react";
import IconBasket from "@/images/edit/basket_edit.svg?react";

interface IUploadFile {
  data?: any;
  name: string;
  prefix?: string;
  accept?: string;
  modifier?: string;
  img_url?: string;
}

const UploadImage: FC<IUploadFile> = ({
  data,
  name,
  prefix,
  accept = ".jpg, .png, .jpeg",
  modifier,
  img_url,
}) => {
  const [meta, field, helper] = useField({ name: `${name}` });

  const id = useId();
  const [upload, setUpload] = useState({
    isFile: false,
    fileName: "",
    text: "Нажмите или перетащите сюда файл, чтобы загрузить",
  });

  useEffect(() => {
    if (field.value instanceof File) {
      setUpload({
        isFile: true,
        fileName: field.value.name,
        text: "Файл загружен:",
      });
    } else {
      setUpload({
        isFile: false,
        fileName: "",
        text: "Нажмите или перетащите сюда файл, чтобы загрузить",
      });
    }
  }, [data, field?.value, field?.value?.name, name]);

  const handleBasket = () => {
    helper.setValue("");
  };

  return (
    <div
      className={clsx(
        style[`${prefix}__box`],
        modifier && style[`${prefix}__box--${modifier}`],
      )}
    >
      <label
        className={clsx(
          style[`${prefix}__label`],
          modifier && style[`${prefix}__label--${modifier}`],
        )}
        htmlFor={id}
      >
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
            data.setFieldTouched(name, true);
          }}
        />

        {modifier !== "edit" && (
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
        )}

        {modifier === "edit" && field.value !== null && (
          <>
            {field?.value.length === 0 || field?.value instanceof File ? (
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
            ) : (
              <div
                className={clsx(
                  style[`${prefix}__view`],
                  style[`${prefix}__view--edit`],
                )}
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_APP_API_HOST
                  }${field?.value})`,
                }}
              >
                <button
                  type="button"
                  onClick={handleBasket}
                  className={clsx(style[`${prefix}__view_basket`])}
                >
                  <IconBasket />
                </button>
              </div>
            )}
          </>
        )}
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
