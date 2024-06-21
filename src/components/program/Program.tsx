/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Program.module.scss";
import { FC, useRef } from "react";
import SvgPlanet from "@/images/program/program.svg?react";
import Content from "./Content";

const Program: FC = () => {
  const refContent = useRef<HTMLDivElement | null>(null);

  return (
    <section className={clsx(style.program)}>
      <div ref={refContent} className={clsx(style.program__inner)}>
        <div className={clsx(style.program__main)}>
          <h2 className={clsx(style.title)}>
            <span>программа</span>
            <span>фестиваля</span>
          </h2>

          <SvgPlanet />
        </div>

        <Content refParent={refContent} />
      </div>
    </section>
  );
};

export default Program;
