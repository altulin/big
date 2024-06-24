import { FC } from "react";
import style from "./Speakers.module.scss";
import clsx from "clsx";
import { ISpeaker } from "./script";

const SpeakersItem: FC<ISpeaker> = ({ name, img, info_1, info_2 }) => {
  return (
    <div className={clsx(style.item)}>
      <div className={clsx(style.item__inner)}>
        <div className={clsx(style.top)}>
          <h3 className={clsx(style.title)}>{name}</h3>
        </div>

        <div className={clsx(style.info)}>
          <figure className={clsx(style.info__figure)}>
            <img src={img} alt="img" width={235} height={284} />
          </figure>
          <p className={clsx(style.info__text)}>{info_1}</p>
        </div>

        <p className={clsx(style.bottom)}>{info_2}</p>
      </div>
    </div>
  );
};
export default SpeakersItem;
