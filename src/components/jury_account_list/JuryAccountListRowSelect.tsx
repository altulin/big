/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { FC } from "react";
import Select from "react-select";
import style from "./JuryAccount.module.scss";
import { useField } from "formik";

interface IJuryAccountListRowSelect {
  options: { value: string; label: string }[];
  name: string;
}

const JuryAccountListRowSelect: FC<IJuryAccountListRowSelect> = ({
  options,
  name,
}) => {
  const [field, meta, helpers] = useField(name);

  const getValue = (val: any) => {
    if (name === "is_reviewed") {
      helpers.setValue(val.value === "true" ? true : false);
      return;
    }

    helpers.setValue(val.value);
  };

  return (
    <Select
      options={options}
      placeholder="Все"
      className={clsx(style.select)}
      classNames={{
        control: () => clsx(style.select__control),
        valueContainer: () => clsx(style.select__valueContainer),
        placeholder: () => clsx(style.select__placeholder),
        indicatorsContainer: () => clsx(style.select__indicatorsContainer),
        indicatorSeparator: () => clsx(style.select__indicatorSeparator),
        menuList: () => clsx(style.select__menuList),
      }}
      name={name}
      onChange={(val: any) => getValue(val)}
    />
  );
};
export default JuryAccountListRowSelect;
