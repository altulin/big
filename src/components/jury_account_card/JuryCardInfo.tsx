/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import JuryCardHead from "./uryCardHead";
import { ban_list, getArray } from "./service";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";

const JuryCardInfo: FC<{ el_info: any }> = ({ el_info }) => {
  const isTablet = useIsTabletDevice();
  const [getNomination, { data: results }] = useLazyNominationsQuery(undefined);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, []); // eslint-disable-line

  return (
    <div className={clsx(style.info)}>
      <ScrollBarComponent>
        <div className={clsx(style.info__inner)}>
          {!isTablet && <JuryCardHead title={el_info.title} />}

          <ul className={clsx(style.info__list)}>
            {getArray(el_info, ban_list, results?.results).map(
              (el: any, i: number) => (
                <li key={i} className={clsx(style.info__item)}>
                  <span className={clsx(style.info__key)}>{el.key}</span>
                  <span className={clsx(style.info__value)}>{el.value}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default JuryCardInfo;
