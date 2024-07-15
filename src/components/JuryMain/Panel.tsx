/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryMain.module.scss";

const Panel: FC<{
  name: string;
  img: string;
  info_1: string;
  info_2: string;
  visible?: boolean;
  job: string;
}> = ({ name, img, info_1, info_2, visible, job }) => {
  const getImg = (img: any) => {
    return new URL(`./assets/${img}`, import.meta.url).href;
  };
  console.log(job);

  return (
    <div
      className={clsx(
        style.panel__item,
        visible && style["panel__item--visible"],
      )}
    >
      <div className={clsx(style.panel__inner)}>
        <div className={clsx(style.top)}>
          <h3 className={clsx(style.panel__title)}>{name}</h3>
          <p className={clsx(style.panel__job)}>{job}</p>
        </div>

        <div className={clsx(style.info)}>
          <figure className={clsx(style.info__figure)}>
            <img src={getImg(img)} alt="img" width={235} height={284} />
          </figure>
          <p className={clsx(style.info__text)}>{info_1}</p>
        </div>

        <p className={clsx(style.info__bottom)}>{info_2}</p>
      </div>
    </div>
  );
};
export default Panel;
