/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetUsersQuery } from "@/store/rtk/user/userApi";
import { FC, useEffect, useState } from "react";
import Select from "react-select";
import style from "./Form.module.scss";
import clsx from "clsx";
import useParse from "@/components/form/service/parse";
import { useField } from "formik";

interface ISelectField {
  placeholder?: string;
  field?: {
    name: string;
    value: string | number;
    onBlur: () => void;
  };
  form: any;
  id?: string;
  options?: any;
  name?: string;
  label?: string;
  prefix?: string;
}

const SelectField: FC<ISelectField> = ({
  // field,
  form,
  id,
  options,
  name,
  label = null,
  prefix,
  placeholder,
}) => {
  const { pref_parse, id_parse, name_parse } = useParse(name);

  const [field, meta, helpers] = useField(name);

  if (!options) return null;

  // console.log(meta);

  return (
    <div className={prefix}>
      {label && <span className={`${prefix}__label`}>{label}</span>}

      <Select
        className={`${prefix}__container`}
        classNamePrefix={prefix}
        placeholder={placeholder}
        options={options}
        name={name}
        value={
          options
            ? options.find(
                (option: { value: number }) => option.value === field?.value,
              )
            : ""
        }
        onChange={(option: any) => {
          // form.setFieldValue(name, option ? option["value"] : "");
          helpers.setValue(option ? option["value"] : "");
        }}
        onBlur={() => {
          // form.setFieldTouched(name, true);
          helpers.setTouched(true);
        }}
        id={id}
      />

      {meta.touched && meta.error ? (
        <div className={clsx(style.error)}>
          <p className={clsx(style.error__text)}>
            {form.errors[`${pref_parse}`][`${id_parse}`][`${name_parse}`]}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SelectField;
