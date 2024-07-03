/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import TextInput from "./TextInput";

interface IUpload {
  name: string;
  label?: string;
  placeholder?: string;
  accept?: string;
  children?: any;
  modifier?: string;
  disabled?: boolean;
}

const Upload: FC<IUpload> = ({
  name,
  label,
  placeholder,
  accept,
  children,
  modifier = "file",
  disabled = false,
}) => {
  return (
    <TextInput
      type="file"
      name={name}
      placeholder={placeholder}
      label={label}
      modifier={modifier}
      accept={accept}
      disabled={disabled}
    >
      {children}
    </TextInput>
  );
};

export default Upload;
