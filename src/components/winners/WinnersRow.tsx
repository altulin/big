/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Winners.module.scss";
import clsx from "clsx";
import WinnersLink from "./VideoLink";
import WinnersInfo from "./WinnersInfo";

const WinnersRow: FC<{ item: any }> = ({ item }) => {
  return (
    <li className={clsx(style.row)}>
      <WinnersLink link={item.work_link} />
      <WinnersInfo el_info={item} />
    </li>
  );
};
export default WinnersRow;
