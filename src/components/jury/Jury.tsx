/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Jury.module.scss";
import { FC } from "react";
import Marquee from "react-fast-marquee";
import { paths } from "@/service/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import useGetCurrentModal from "@/hooks/getCurrentModal";
import { stepTo } from "@/store/modal/modalSlice";
import { jury } from "./spec-jury";

const Jury: FC = () => {
  const { modalState } = useAppSelector((state) => state.modal);
  const modal = useGetCurrentModal(modalState);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(stepTo({ jury: { step: 1 } }));
  };

  const getImg = (img: any) => {
    return new URL(`./assets/${img}`, import.meta.url).href;
  };

  return (
    <section id={paths.jury_special} className={clsx(style.jury, "panel")}>
      <div className={clsx(style.jury__inner)}>
        <div className={clsx(style.jury__head)}>
          <h2 className={clsx(style.title)}>Специальное Жюри</h2>
        </div>

        <div className={clsx(style.marquee)}>
          <div className={clsx(style.marquee__inner, "scroll")}>
            {jury.map((item, index) => (
              <Marquee
                play={modal !== "jury-1"}
                key={index}
                pauseOnHover={true}
                autoFill={true}
                // gradient={false}
                speed={10}
                direction={index % 2 === 0 ? "left" : "right"}
                className={clsx(style.marquee__row)}
              >
                <button
                  className={clsx(style.marquee__item)}
                  onClick={handleClick}
                >
                  <img
                    className={clsx(style.marquee__avatar)}
                    src={getImg(item.avatar)}
                    alt={item.name}
                  />
                  <p className={clsx(style.marquee__text)}>
                    <span className={clsx(style.marquee__name)}>
                      {item.name}
                    </span>
                    <span className={clsx(style.marquee__company)}>
                      {item.company}
                    </span>
                    <span className={clsx(style.marquee__job)}>{item.job}</span>
                  </p>
                </button>
              </Marquee>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jury;
