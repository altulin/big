/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import style from "../Form.module.scss";
import clsx from "clsx";

const Container: FC<{
  children: ReactNode;
  modifier?: string;
  className?: string;
  label?: string;
  id?: string;
  meta: any;
}> = ({ id, meta, children, ...props }) => {
  return (
    <div
      className={clsx(
        style.container,
        style[`container--${props.modifier}`] || "",
        props.className,
      )}
    >
      <label
        className={clsx(style.label, style[`label--${props.modifier}`] || "")}
        htmlFor={id}
      >
        {props.label ? (
          <span className={clsx(style.label__text)}>{props.label}</span>
        ) : null}

        {children}
      </label>

      {meta.touched && meta.error ? (
        <div
          className={clsx(style.error, style[`error--${props.modifier}`] || "")}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default Container;
