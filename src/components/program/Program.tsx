import clsx from "clsx";
import style from "./Program.module.scss";
import { FC } from "react";

const Program: FC = () => {
  return (
    <section className={clsx(style.program)}>
      <div className={clsx(style.program__inner)}>
        Program Component
      </div>
    </section>
  );
};

export default Program;
