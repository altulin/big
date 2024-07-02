import { FC } from "react";
import TextInput from "./TextInput";

interface IUpload {
  name: string;
  label?: string;
  placeholder?: string;
  accept?: string;
}

const Upload: FC<IUpload> = ({ name, label, placeholder, accept }) => {
  return (
    <TextInput
      type="file"
      name={name}
      placeholder={placeholder}
      label={label}
      modifier="file"
      accept={accept}
    >
      {/* <ButtonEye isTypeText={isTypeText} setType={setType} /> */}
    </TextInput>
  );
};

export default Upload;
