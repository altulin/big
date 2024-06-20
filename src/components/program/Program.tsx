import clsx from "clsx";
import style from "./Program.module.scss";
import { FC } from "react";

const Program: FC = () => {
  return (
    <section className={clsx(style.program)}>
      <div className={clsx(style.program__inner)}>
        <div className={clsx(style.program__main)}>
          <h2 className={clsx(style.title)}>
            <span>программа</span>
            <span>фестиваля</span>
          </h2>

          <div className={clsx(style.picture)}>
            <figurecl></figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
