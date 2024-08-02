/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Contacts.module.scss";
import clsx from "clsx";
import { soc } from "./data";

const Soc: FC<{
  className?: string;
  array: string[];
  modifier?: string;
  custom?: { tg: { href: string } } | null;
}> = ({ className, array, modifier, custom = null }) => {
  const getArr = (arr: string[]) => {
    const list = arr.map((item: any) => {
      if (!custom) {
        return (soc as any).filter((el: any) => {
          return Object.keys(el)[0] === item;
        })[0][item];
      } else {
        if (Object.keys(custom)[0] === item) {
          const newObj: any = {};

          const obg = (soc as any).filter((el: any) => {
            return Object.keys(el)[0] === item;
          })[0][item];

          newObj.href = (custom as any)[item].href;
          newObj.icon = obg.icon;

          return newObj;
        } else {
          return (soc as any).filter((el: any) => {
            return Object.keys(el)[0] === item;
          })[0][item];
        }
      }
    });

    return list;
  };

  return (
    <ul className={clsx(style.soc, className)}>
      {getArr(array).map((item, i) => (
        <a
          className={clsx(
            style.soc__link,
            modifier && style[`soc__link--${modifier}`],
          )}
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
