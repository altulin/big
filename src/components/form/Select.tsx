/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetUsersQuery } from "@/store/rtk/user/userApi";
import { FC } from "react";
import Select from "react-select";

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
          form.setFieldValue(field?.name, option ? option["label"] : "");
        }}
        onBlur={field?.onBlur}
        id={id}
      />
    </div>
  );
};

export default SelectField;
