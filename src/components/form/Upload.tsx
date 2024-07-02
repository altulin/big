/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import TextInput from "./TextInput";

interface IUpload {
  name: string;
  label?: string;
  placeholder?: string;
  accept?: string;
  children?: any;
}

const Upload: FC<IUpload> = ({
  name,
  label,
  placeholder,
  accept,
  children,
}) => {
  return (
    <TextInput
      type="file"
      name={name}
      placeholder={placeholder}
      label={label}
      modifier="file"
      accept={accept}
    >
      {children}
    </TextInput>
  );
};

export default Upload;
