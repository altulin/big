import clsx from "clsx";
import { FC } from "react";
import style from "./Shortlist.module.scss";

const ShortItem: FC = () => {
  return <li className={clsx(style.item)}>{}</li>;
};
export default ShortItem;
