/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Partners.module.scss";
import clsx from "clsx";
const PartnersBlock: FC<{
  list: { url: string; logo: string }[];
  type: string;
}> = ({ list, type }) => {
  const getTitle = (type: string) => {
    switch (type) {
      case "general":
        return "Генеральные партнеры";
      case "industrial":
        return "Индустриальные партнеры";
      case "informational":
        return "Информационные партнеры";
    }
  };

  return (
    <div className={clsx(style.item)}>
      <h3 className={clsx(style.item__title)}>{getTitle(type)}</h3>
      <ul className={clsx(style.item__list)}>
        {list.map((item, i) => (
          <li key={i} className={clsx(style.item__list_item)}>
            <a
              href={item.url}
              className={clsx(style.item__list_link)}
              target="_blank"
            >
              <img
                className={clsx(style.item__list_logo)}
                src={item.logo}
                alt="logo"
                width={96}
                height={35}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PartnersBlock;
