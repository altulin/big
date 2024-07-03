/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Registration.module.scss";
import Company from "./Company";
import Upload from "../form/Upload";

const Entity: FC<{ formik: any }> = ({ formik }) => {
  console.log(formik.values.file);

  return (
    <>
      <h3 className={clsx(style.entity__title)}>Реквизиты организации</h3>
      <Company />
      <h3
        className={clsx(
          style.entity__title,
          style["entity__title--requisites"],
        )}
      >
        Прикрепите реквизиты организации
      </h3>

      <Upload
        name="file"
        label={
          !formik.values.file ? "Прикрепить файл .doc" : formik.values.file
        }
        accept=".doc, .docx"
      ></Upload>
    </>
  );
};
export default Entity;
