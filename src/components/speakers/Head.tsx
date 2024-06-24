import clsx from "clsx";
import { FC } from "react";
import style from "./Speakers.module.scss";
import IconArr from "@/images/step/iconStepArr.svg?react";

const Head: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={clsx(style.head)}>
      <p className={clsx(style.title)}>{title}</p>
      <span className={clsx(style.btn)}>
        <IconArr />
      </span>
    </div>
  );
};
export default Head;
