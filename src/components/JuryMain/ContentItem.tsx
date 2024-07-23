/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryMain.module.scss";
import IconArr from "@/images/step/iconStepArr.svg?react";

const ContentHead: FC<{
  name: string;
  handleClick?: any;
  id?: number;
  numActive: number;
}> = ({ name, handleClick, id, numActive }) => {
  return (
    <li data-button={id} onClick={handleClick} className={clsx(style.item)}>
      <span className={clsx(style.item__title)}>{name}</span>
      <div
        data-button={id}
        className={clsx(
          style.item__button,
          id === numActive && style["item__button--active"],
        )}
      >
        <IconArr />
      </div>
    </li>
  );
};
export default ContentHead;
