/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import AsideBrands from "./AsideBrands";
import Slider from "./Slider";
import Controls from "./Controls";
import Marquee from "react-fast-marquee";
import { paths } from "@/service/paths";

const Promo: FC = () => {
  return (
    <section id={paths.promo} className={clsx(style.promo, "panel")}>
      <div className={clsx(style.promo__inner)}>
        <div className={clsx(style.promo__content)}>
          <AsideBrands />
          <div className={clsx(style.promo__slider)}>
            <>
              <Slider />
            </>
          </div>
          <Controls />
        </div>

        <Marquee className={clsx(style.marquee)} autoFill={true} speed={100}>
          <p className={clsx(style.marquee__inner)}>
            <span className={clsx(style.marquee__text)}>лето</span>
            <span className={clsx(style.marquee__year)}>2024</span>
          </p>
        </Marquee>
      </div>
    </section>
  );
};
export default Promo;
