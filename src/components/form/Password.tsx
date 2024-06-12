import { FC, useState } from "react";
import TextInput from "./TextInput";
import ButtonEye from "./ButtonEye";

interface IPasswordField {
  name: string;
  label?: string;
}

const PasswordField: FC<IPasswordField> = ({ name, label }) => {
  const [isTypeText, setType] = useState(false);

  return (
    <TextInput
      type={isTypeText ? "text" : "password"}
      name={name}
      label={label}
    >
      <ButtonEye isTypeText={isTypeText} setType={setType} />
    </TextInput>
  );
};

export default PasswordField;
