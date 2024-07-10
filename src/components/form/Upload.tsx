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
  formik?: any;
}

const Upload: FC<IUpload> = ({
  name,
  label,
  placeholder,
  accept,
  children,
  modifier = "file",
  disabled = false,
  formik,
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
      onChange={(e: any) => {
        if (e.currentTarget.files) {
          formik.setFieldValue(name, e.currentTarget.files[0]);
        }
      }}
      value={undefined}
    >
      {children}
    </TextInput>
  );
};

export default Upload;
