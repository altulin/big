import clsx from "clsx";
import style from "./Program.module.scss";
import { FC } from "react";
import SvgPlanet from "@/images/program/program.svg?react";
import Content from "./Content";
import { useAppSelector } from "@/hooks/hook";

const Program: FC = () => {
  const { current } = useAppSelector((state) => state.program);

  return (
    <section className={clsx(style.program)}>
      <div className={clsx(style.program__inner)}>
        <div
          className={clsx(
            style.program__main,
            current !== null && style.program__main_hidden,
          )}
        >
          <h2 className={clsx(style.title)}>
            <span>программа</span>
            <span>фестиваля</span>
          </h2>

          <SvgPlanet />
        </div>

        <Content />
      </div>
    </section>
  );
};

export default Program;
