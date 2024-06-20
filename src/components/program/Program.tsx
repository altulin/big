import clsx from "clsx";
import style from "./Program.module.scss";
import { FC } from "react";
import SvgPlanet from "@/images/program/program.svg?react";

const Program: FC = () => {
  return (
    <section className={clsx(style.program)}>
      <div className={clsx(style.program__inner)}>
        <div className={clsx(style.program__main)}>
          <h2 className={clsx(style.title)}>
            <span>программа</span>
            <span>фестиваля</span>
          </h2>

          <SvgPlanet />
        </div>
      </div>
    </section>
  );
};

export default Program;
