/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryMain.module.scss";
import IconArr from "@/images/step/iconStepArr.svg?react";

const ContentHead: FC<{ name: string; handleClick?: any; id?: number }> = ({
  name,
  handleClick,
  id,
}) => {
  return (
    <li className={clsx(style.item)}>
      <span className={clsx(style.item__title)}>{name}</span>
      <div
        data-button={id}
        onClick={handleClick}
        className={clsx(style.item__button)}
      >
        <IconArr />
      </div>
    </li>
  );
};
export default ContentHead;
