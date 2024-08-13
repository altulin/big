import clsx from "clsx";
import { FC, isValidElement, ReactNode } from "react";
import style from "./JuryAccount.module.scss";

interface IJuryAccountListRow {
  items: {
    number: number | string;
    title: string;
    category: string | ReactNode;
    nomination: string | ReactNode;
    status: string | ReactNode;
  };
  is_head?: boolean;
}

const JuryAccountListRow: FC<IJuryAccountListRow> = ({ items, is_head }) => {
  return (
    <ul className={clsx(style.row, is_head && style["row--head"])}>
      {Object.keys(items).map((item, i) => {
        if (item in items) {
          const value = items[item as keyof typeof items];

          return (
            <li
              className={clsx(
                style.row__item,
                style[`row__item_${item}`],
                isValidElement(value) && style["row__item--element"],
              )}
              key={i}
            >
              {isValidElement(value) ? (
                value
              ) : (
                <span className={clsx(style.row__text)}>{value}</span>
              )}
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};
export default JuryAccountListRow;
