/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Winners.module.scss";
import clsx from "clsx";
import WinnersInfo from "./WinnersInfo";
import WinnersMedia from "./WinnersMedia";

const WinnersRow: FC<{ item: any }> = ({ item }) => {
  const propsMedia = {
    video: item.video,
    project_image_url: item.project_image_url,
    work_link: item.work_link,
  };

  return (
    <li className={clsx(style.row)}>
      <WinnersMedia {...propsMedia} />
      <WinnersInfo el_info={item} />
    </li>
  );
};
export default WinnersRow;
