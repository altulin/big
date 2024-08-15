/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import JuryCardHead from "./uryCardHead";
import { ban_list, getInfoLabel } from "./service";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const JuryCardInfo: FC<{ el_info: any }> = ({ el_info }) => {
  const isTablet = useIsTabletDevice();

  const getArray = () => {
    const array: any = [];

    Object.keys(el_info).forEach((key) => {
      if (ban_list.includes(key)) return;
      array.push({ key: `${getInfoLabel(key)}:`, value: el_info[key] });
    });

    return array;
  };

  return (
    <div className={clsx(style.info)}>
      <ScrollBarComponent>
        <div className={clsx(style.info__inner)}>
          {!isTablet && <JuryCardHead title={el_info.title} />}

          <ul className={clsx(style.info__list)}>
            {getArray().map((el: any, i: number) => (
              <li key={i} className={clsx(style.info__item)}>
                <span className={clsx(style.info__key)}>{el.key}</span>
                <span className={clsx(style.info__value)}>{el.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default JuryCardInfo;
