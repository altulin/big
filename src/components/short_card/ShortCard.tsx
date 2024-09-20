import clsx from "clsx";
import style from "./ShortCard.module.scss";
import { FC } from "react";

const ShortCard: FC = () => {
  return (
    <section className={clsx(style.shortCard)}>
      <div className={clsx(style.shortCard__inner)}>
        ShortCard Component
      </div>
    </section>
  );
};

export default ShortCard;
