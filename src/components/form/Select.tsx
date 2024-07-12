/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetUsersQuery } from "@/store/rtk/user/userApi";
import { FC } from "react";
import Select from "react-select";
import style from "./Form.module.scss";
import clsx from "clsx";
import useParse from "@/components/form/service/parse";

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
  field,
  form,
  id,
  options,
  name,
  label = null,
  prefix,
  placeholder,
}) => {
  const { pref_parse, id_parse, name_parse } = useParse(name);

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
          form.setFieldValue(name, option ? option["label"] : "");
        }}
        onBlur={() => {
          form.setFieldTouched(name, true);
        }}
        id={id}
      />

      {form.touched[`${pref_parse}`] &&
      form.touched[`${pref_parse}`][`${id_parse}`] &&
      form.errors[`${pref_parse}`] &&
      form.errors[`${pref_parse}`][`${id_parse}`] &&
      form.touched[`${pref_parse}`][`${id_parse}`][`${name_parse}`] &&
      form.errors[`${pref_parse}`][`${id_parse}`][`${name_parse}`] ? (
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
