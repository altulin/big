import clsx from "clsx";
import style from "./Price.module.scss";
import { FC } from "react";
import { dates, frmtDt } from "../steps/script";
import { paths } from "@/service/paths";

const Price: FC = () => {
  const head = [
    { label: "Кол-во работ", text: "" },
    {
      label: `${frmtDt(dates.early.start)} – ${frmtDt(dates.early.end)}`,
      text: "Ранняя пташка",
    },
    {
      label: `${frmtDt(dates.basic.start)} – ${frmtDt(dates.basic.end)}`,
      text: "Основной этап",
    },
    {
      label: `${frmtDt(dates.final.start)} – ${frmtDt(dates.final.end)}`,
      text: "Финальный этап",
    },
  ];

  const body = [
    ["1 подача", "7 500 ₽", "9 000 ₽", "11 000 ₽"],
    ["3 подачи", "18 000 ₽", "22 500 ₽", "27 000 ₽"],
    ["5 подач", "30 000 ₽", "36 000 ₽", "44 000 ₽"],
  ];
  return (
    <section id={paths.price} className={clsx(style.price, "panel")}>
      <div className={clsx(style.price__wrapper)}>
        <div className={clsx(style.price__inner)}>
          <h2 className={clsx(style.title)}>
            <span>стоимость Участия </span>
            {/* <span>в премии Big Picture</span> */}
          </h2>

          <div className={clsx(style.price__content)}>
            <div className={clsx(style.table)}>
              <div className={clsx(style.row, style["row--head"])}>
                {head.map((item, i) => (
                  <div
                    className={clsx(
                      style.cell,
                      style["cell--head"],
                      i === 0 && style["cell--head-first"],
                    )}
                    key={i}
                  >
                    <span className={clsx(style.head__label)}>
                      {item.label}
                    </span>
                    <span className={clsx(style.head__text)}>{item.text}</span>
                  </div>
                ))}
              </div>
              {body.map((item, i) => (
                <div className={clsx(style.row, style["row--body"])} key={i}>
                  {item.map((el, n) => (
                    <div
                      className={clsx(
                        style.cell,
                        style["cell--body"],
                        n === 0 && style["cell--first"],
                      )}
                      key={n}
                    >
                      <span className={clsx(style.body__text)}>{el}</span>
                    </div>
                  ))}
                </div>
              ))}
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