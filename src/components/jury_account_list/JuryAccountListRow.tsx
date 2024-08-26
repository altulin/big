import clsx from "clsx";
import { FC, isValidElement, ReactNode } from "react";
import style from "./JuryAccount.module.scss";
import { useCheckShort } from "./service";

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
  const { isShort } = useCheckShort();
  return (
    <ul
      className={clsx(
        style.row,
        is_head && style["row--head"],
        is_head && isShort && style["row--head-short"],
      )}
    >
      {Object.keys(items).map((item, i) => {
        if (item in items) {
          const value = items[item as keyof typeof items];

          if (!value) return null;

          return (
            <li
              className={clsx(
                style.row__item,
                is_head && style["row__item--head"],

                style[`row__item_${item}`],
                isShort && style[`row__item_${item}--short`],
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
