/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Contacts.module.scss";
import clsx from "clsx";
import { soc } from "./data";

const Soc: FC<{ className?: string; array: string[] }> = ({
  className,
  array,
}) => {
  const getArr = (arr: string[]) => {
    const list = arr.map((item: any) => {
      return (soc as any).filter((el: any) => {
        return Object.keys(el)[0] === item;
      })[0][item];
    });
    return list;
  };

  return (
    <ul className={clsx(style.soc, className)}>
      {getArr(array).map((item, i) => (
        <a
          className={clsx(style.soc__link)}
          href={item.href}
          aria-label="Соц. сети"
          key={i}
          target="_blank"
        >
          {<item.icon />}
        </a>
      ))}
    </ul>
  );
};
export default Soc;
