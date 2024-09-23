import clsx from "clsx";
import style from "./Winners.module.scss";
import { FC } from "react";

const Winners: FC = () => {
  return (
    <section className={clsx(style.winners)}>
      <div className={clsx(style.winners__inner)}>Winners Component</div>
    </section>
  );
};

export default Winners;
