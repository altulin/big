/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import JuryCardHead from "./uryCardHead";
import { ban_list, getInfoLabel, getVoteStatus } from "./service";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { categoriesLabel } from "../Pass/script";

const JuryCardInfo: FC<{ el_info: any }> = ({ el_info }) => {
  const isTablet = useIsTabletDevice();

  const getArray = () => {
    const array: any = [];

    Object.keys(el_info).forEach((item) => {
      if (ban_list.includes(item)) return;

      const key = `${getInfoLabel(item)}:`;

      let value;

      switch (item) {
        case "category":
          value = categoriesLabel[`${el_info[item]}`];
          break;

        case "vote":
          value = getVoteStatus(el_info[item]);
          break;
        default:
          value = el_info[item] ? el_info[item] : "отсутствует";
      }

      array.push({ key, value });
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
