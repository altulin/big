/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Partners.module.scss";
import clsx from "clsx";
const PartnersBlock: FC<{
  title: string;
  list: { href: string; icon: any }[];
}> = ({ title, list }) => {
  return (
    <div className={clsx(style.item)}>
      <h3 className={clsx(style.item__title)}>{title}</h3>
      <ul className={clsx(style.item__list)}>
        {list.map((item, i) => (
          <li key={i} className={clsx(style.item__list_item)}>
            <a href={item.href} className={clsx(style.item__list_link)}>
              <item.icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PartnersBlock;
