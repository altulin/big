/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Winners.module.scss";
import { getArray } from "../jury_account_card/service";
import { ban_list } from "./data";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
const WinnersInfo: FC<{ el_info: any }> = ({ el_info }) => {
  const [getNomination, { data: results }] = useLazyNominationsQuery(undefined);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, []); // eslint-disable-line

  const EditText = (text: string) => {
    return text.split("\n");
  };

  return (
    <div className={clsx(style.info)}>
      <div className={clsx(style.info__head)}>
        <h3 className={clsx(style.info__title)}>{el_info.title}</h3>
      </div>
      <ul className={clsx(style.info__list)}>
        {getArray(el_info, ban_list, results?.results).map(
          (el: any, i: number) => (
            <li key={i} className={clsx(style.info__item)}>
              <span className={clsx(style.info__key)}>{el.key}</span>
              <span className={clsx(style.info__value)}>
                {EditText(el.value).map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
export default WinnersInfo;
