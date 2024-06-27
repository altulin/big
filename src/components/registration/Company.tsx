import { FC } from "react";
import TextInput from "../form/TextInput";

const CompanyReg: FC = () => {
  return (
    <TextInput
      name="company_name"
      label="Компания"
      placeholder="Название компании, в которой работаете"
    />
  );
};
export default CompanyReg;
