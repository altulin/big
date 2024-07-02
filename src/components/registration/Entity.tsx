/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Registration.module.scss";
import Company from "./Company";
import Upload from "../form/Upload";
import { spawn } from "child_process";
// import TextInput from "../form/TextInput";

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

      {/* <TextInput
        name={`order-${count}`}
        label="№ счета"
        placeholder="Введите номер"
      />
      <TextInput name={`ks-${count}`} label="К/с" placeholder="Введите номер" />
      <TextInput
        name={`egrn-${count}`}
        label="ЕГРН"
        placeholder="Введите номер"
      />
      <TextInput
        name={`inn-${count}`}
        label="ИНН банка"
        placeholder="Введите номер"
      />
      <TextInput
        name={`bik-${count}`}
        label="БИК"
        placeholder="Введите номер"
      /> */}
    </>
  );
};
export default Entity;
