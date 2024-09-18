import clsx from "clsx";
import { FC } from "react";
import style from "./Shortlist.module.scss";
import { HashLink } from "react-router-hash-link";

const data = ["nomination", "name_work", "author"];

const ShortRow: FC<{
  nomination: string;
  name_work: string;
  author: string;
  isHead?: boolean;
}> = ({ isHead, ...props }) => {
  return (
    <li
      className={clsx(style.content__item, isHead && style.content__item_head)}
    >
      <ul className={clsx(style.row)}>
        {data.map((el, i) => (
          <li
            key={i}
            className={clsx(style.row__item, style[`row__item_${el}`])}
          >
            <HashLink to={""} className={clsx(style.row__link)}>
              {props[el as keyof typeof props]}
            </HashLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ShortRow;
