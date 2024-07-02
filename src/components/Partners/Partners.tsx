import clsx from "clsx";
import style from "./Partners.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import PartnersBlock from "./PartnersBlock";
import { general, industrial, info } from "./script";

const Partners: FC = () => {
  return (
    <section id={paths.partners} className={clsx(style.partners, "panel")}>
      <div className={clsx(style.partners__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Партнеры</span>
        </h2>
        <PartnersBlock {...general} />
        <PartnersBlock {...info} />
        <PartnersBlock {...industrial} />
      </div>
    </section>
  );
};

export default Partners;
