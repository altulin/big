/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, useField } from "formik";
import { ChangeEvent, FC, useEffect, useId } from "react";
import Container from "./blocks/Container";
import style from "./Form.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "@/hooks/hook";
import { setStatus } from "@/store/reg/regSlice";
import useIsYang from "@/hooks/isYang";

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
  className?: string;
  autoComplete?: "on" | "off";
  accept?: string;
  disabled?: boolean;
}

const TextInput: FC<IMyTextInput> = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  const id = useId();
  const dispatch = useAppDispatch();
  const { isYang } = useIsYang();

  useEffect(() => {
    if (field.name !== "status") return;
    if (!field.checked) return;

    dispatch(setStatus(field.value));
  }, [dispatch, field.checked, field.name, field.value]);

  return (
    <Container {...props} meta={meta} id={props.id || id}>
      <>
        <Field
          {...field}
          {...props}
          className={clsx(
            props.className,
            style.input,
            style[`input--${props.modifier}`] || "",
            meta.touched && meta.error && style["input--error"],
            isYang && style["input--yang"],
          )}
          id={props.id || id}
          // value={field.value || ""}
        />
        {children}
      </>
    </Container>
  );
};

export default TextInput;
