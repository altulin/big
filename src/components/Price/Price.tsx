/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Price.module.scss";
import { FC } from "react";

import { paths } from "@/service/paths";
import { useIntermediateStageQuery } from "@/store/rtk/stage/intermediateStage";
import format from "format-number";
import useIsYang from "@/hooks/isYang";

const Price: FC = () => {
  const { data } = useIntermediateStageQuery(undefined);
  const { isYang } = useIsYang();
  const body = [["до 2-х"], ["от 3-х до 4-х"], ["от 5-ти"]];

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

                {data &&
                  data?.results.slice(0, 3).map((item: any, i: number) => (
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
                  {body.map((item, i) => (
                    <li
                      className={clsx(
                        style.body__item,
                        style["body__item--head"],
                      )}
                      key={i}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {data &&
                  data?.results.slice(0, 3).map((item: any, i: number) => (
                    <ul className={clsx(style.body__list)} key={i}>
                      {item.work_costs
                        .filter((el: any) =>
                          isYang
                            ? el.category === "young"
                            : el.category === "main",
                        )
                        .map((elem: any, m: number) => (
                          <li className={clsx(style.body__item)} key={m}>
                            {format({
                              suffix: " ₽",
                              integerSeparator: " ",
                            })(elem.price)}
                          </li>
                        ))}
                    </ul>
                  ))}
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
