/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Program.module.scss";
import { FC, useRef } from "react";
import SvgPlanet from "@/images/program/program.svg?react";
import Content from "./Content";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ContentMob from "./ContentMob";
import { paths } from "@/service/paths";

const Program: FC = () => {
  const refContent = useRef<HTMLDivElement | null>(null);
  const isTablet = useIsTabletDevice();

  return (
    <section
      id={paths.program}
      className={clsx(style.program, "program", "panel")}
    >
      <div ref={refContent} className={clsx(style.program__inner)}>
        <div className={clsx(style.program__main)}>
          <h2 className={clsx(style.title)}>
            <span>программа</span>
            <span>фестиваля</span>
          </h2>

          <SvgPlanet />
        </div>

        {isTablet ? <ContentMob /> : <Content refParent={refContent} />}
      </div>
    </section>
  );
};

export default Program;
