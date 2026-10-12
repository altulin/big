import clsx from "clsx";
import { FC } from "react";
import { useField } from "formik";
import style from "./Registration.module.scss";
import Company from "./Company";
import Upload from "../form/Upload";

const Entity: FC = () => {
  const [{ value: file }] = useField<File | undefined>("file");

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
        label={file ? file.name : "Прикрепить файл"}
        accept=".doc, .docx, .pdf"
        modifier="file-profile"
      ></Upload>
    </>
  );
};
export default Entity;
