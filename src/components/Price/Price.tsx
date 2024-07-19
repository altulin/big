/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Price.module.scss";
import { FC, useEffect, useState } from "react";

import { paths } from "@/service/paths";
import { useIntermediateStageQuery } from "@/store/rtk/stage/intermediateStage";
import format from "format-number";
import useIsYang from "@/hooks/isYang";

const Price: FC = () => {
  const { data, status } = useIntermediateStageQuery(undefined);
  const { isYang } = useIsYang();
  const body = [["до 2-х"], ["от 3-х до 4-х"], ["от 5-ти"]];
  const [priceData, setPriceData] = useState<any>({
    head: null,
    body_list: null,
  });

  useEffect(() => {
    if (status !== "fulfilled") return;

    const baseList = data?.results.slice(0, 3);

    const list = baseList.map((item: any) => {
      return item.work_costs.filter((el: any) => {
        return isYang ? el.category === "young" : el.category === "main";
      });
    });

    setPriceData({
      head: baseList,
      body_list: [
        [list[0][0].price, list[1][0].price, list[2][0].price],
        [list[0][1].price, list[1][1].price, list[2][1].price],
        [list[0][2].price, list[1][2].price, list[2][2].price],
      ],
    });
  }, [data, status, isYang]);

  return (
    <section
      id={isYang ? paths.price_young : paths.price}
      className={clsx(style.price, "panel")}
    >
      <div className={clsx(style.price__wrapper)}>
        <div className={clsx(style.price__inner)}>
          <h2 className={clsx(style.title)}>
            <span>стоимость Участия </span>
          </h2>

          <div className={clsx(style.price__content)}>
            <div className={clsx(style.table)}>
              <div className={clsx(style.row, style["row--head"])}>
                <div
                  className={clsx(
                    style.cell,
                    style["cell--head"],
                    style["cell--head-first"],
                  )}
                >
                  <span className={clsx(style.head__label)}>Кол-во подач</span>
                </div>

                {priceData.head &&
                  priceData.head.map((item: any, i: number) => (
                    <div
                      className={clsx(style.cell, style["cell--head"])}
                      key={i}
                    >
                      <span className={clsx(style.head__label)}>
                        {item.title}
                      </span>
                      <span className={clsx(style.head__text)}>
                        {item.displayed_stage}
                      </span>
                    </div>
                  ))}
              </div>

              <div className={clsx(style.body)}>
                <ul className={clsx(style.body__list)}>
                  {priceData.body_list &&
                    body.map((item, i) => (
                      <li className={clsx(style.body__item)} key={i}>
                        <div
                          className={clsx(
                            style.body__sub_item,
                            style["body__sub_item--head"],
                          )}
                        >
                          {item}
                        </div>
                        {priceData.body_list[i].map((el: any, n: any) => (
                          <div className={clsx(style.body__sub_item)} key={n}>
                            {el + " ₽"}
                          </div>
                        ))}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <p className={clsx(style.price__text)}>
            *цены в рублях за одну работу в категории опытных талантов
          </p>
        </div>
      </div>
    </section>
  );
};

export default Price;
