/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Winners.module.scss";
import clsx from "clsx";
import WinnersLink from "./VideoLink";
import WinnersInfo from "./WinnersInfo";
import WinnersPLayer from "./WinnersPlayer";
import ReactPlayer from "react-player";

const WinnersRow: FC<{ item: any }> = ({ item }) => {
  return (
    <li className={clsx(style.row)}>
      {item.video && ReactPlayer.canPlay(item.video) ? (
        <WinnersPLayer video={item.video} />
      ) : (
        <WinnersLink link={item.work_link} />
      )}

      <WinnersInfo el_info={item} />
    </li>
  );
};
export default WinnersRow;
