/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, useField } from "formik";
import { ChangeEvent, FC, useId } from "react";
import Container from "./blocks/Container";
import style from "./Form.module.scss";
import clsx from "clsx";

interface IMyTextInput {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  id?: string;
  modifier?: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  as?: string;
  children?: JSX.Element;
  component?: any;
  value?: string;
  onChange?: any;
  onBlur?: any;
  error?: string;
  touched?: boolean;
  multiple?: boolean;
}

const TextInput: FC<IMyTextInput> = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  const id = useId();

  return (
    <Container {...props} meta={meta} id={props.id || id}>
      <>
        <Field
          {...field}
          {...props}
          className={clsx(style.input, style[`input--${props.modifier}`] || "")}
          id={props.id || id}
        />
        {children}
      </>
    </Container>
  );
};

export default TextInput;
