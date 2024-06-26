import { FC, useState } from "react";
import TextInput from "./TextInput";
import ButtonEye from "./ButtonEye";

interface IPasswordField {
  name: string;
  label?: string;
  placeholder?: string;
}

const PasswordField: FC<IPasswordField> = ({ name, label, placeholder }) => {
  const [isTypeText, setType] = useState(false);

  return (
    <TextInput
      type={isTypeText ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      label={label}
    >
      <ButtonEye isTypeText={isTypeText} setType={setType} />
    </TextInput>
  );
};

export default PasswordField;
