import clsx from "clsx";
import { FC } from "react";
import style from "./Shortlist.module.scss";
import { HashLink } from "react-router-hash-link";

const data = ["nomination", "name_work", "author"];

const ShortRowInner: FC<{
  nomination: string;
  name_work: string;
  author: string;
}> = ({ ...props }) => {
  return (
    <ul className={clsx(style.row)}>
      {data.map((el, i) => (
        <li key={i} className={clsx(style.row__item, style[`row__item_${el}`])}>
          <span className={clsx(style.row__label)}>
            {props[el as keyof typeof props]}
          </span>
        </li>
      ))}
    </ul>
  );
};

const ShortRow: FC<{
  nomination: string;
  name_work: string;
  author: string;
  isHead?: boolean;
  id?: number;
}> = ({ isHead, ...props }) => {
  return (
    <li
      className={clsx(style.content__item, isHead && style.content__item_head)}
    >
      {isHead ? (
        <ShortRowInner {...props} />
      ) : (
        <HashLink to={""} className={clsx(style.content__link, "ghj")}>
          <ShortRowInner {...props} />
        </HashLink>
      )}
    </li>
  );
};

export default ShortRow;
