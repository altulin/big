/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import styleProgram from "./Program.module.scss";
import ContentItem from "./ContentItem";
import gsap from "gsap";
import { useAppSelector } from "@/hooks/hook";
import { useProgramsQuery } from "@/store/rtk/main/programs";
import { checkArr } from "@/service/checkArr";

const Content: FC<{ refParent: any }> = ({ refParent }) => {
  const refContent = useRef<HTMLDivElement | null>(null);
  const q = gsap.utils.selector(refParent);
  const [timeLines, setTimeLines] = useState<any>([]);
  const { current } = useAppSelector((state) => state.program);
  const ease = "none";
  const { data } = useProgramsQuery({});

  useEffect(() => {
    if (!refContent.current) return;
    if (!checkArr(data?.results)) return;

    setTimeLines(
      q(`.${styleProgram.item}`).map((item) => {
        if (!item.querySelector(`.${styleProgram.button__icon}`)) return;
        const tl = gsap
          .timeline({ paused: true })
          .add("start", "<")

          .fromTo(
            [
              item.querySelector(`.${styleProgram.button__title}`),
              item.querySelector(`.${styleProgram.button__date}`),
            ],
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.01 },
            "<",
          )

          .fromTo(
            [
              item.querySelector(`.${styleProgram.button__title}`),
              item.querySelector(`.${styleProgram.button__date}`),
            ],
            { width: "auto" },
            { width: 0, duration: 0.01 },
            "<",
          )

          .fromTo(
            item.querySelector(`.${styleProgram.button__icon}`),
            { rotate: 180 },
            { rotate: 0, ease, duration: 0.01 },
            "<",
          )
          .fromTo(
            item.querySelector(`.${styleProgram.info}`),
            { display: "none", width: "0" },
            { display: "flex", width: "43rem", duration: 0.01 },
            "<",
          )
          .fromTo(
            item.querySelector(`.${styleProgram.info}`),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5 },
          );

        if (item.querySelector(`.${styleProgram.button__mega}`)) {
          tl.add(
            gsap.fromTo(
              item.querySelector(`.${styleProgram.button__mega}`),
              {
                display: "block",
              },
              { display: "none", duration: 0.01 },
            ),
            "start",
          );
        }

        return tl;
      }),
    );
  }, [data]);

  useEffect(() => {
    if (current === null) {
      timeLines.forEach((tl: any) => {
        if (!tl) return;
        tl.pause("start");
      });
    }

    if (current !== null) {
      // gsap.set(q(`.${styleProgram.planet}`), { autoAlpha: 0 });

      timeLines.forEach((tl: any) => {
        if (!tl) return;
        tl.pause("start");
      });

      timeLines[current].play().then(() => {
        // gsap.set(q(`.${styleProgram.planet}`), { autoAlpha: 1 });
      });
    }
  }, [current, q, timeLines]);

  if (!data) return null;

  return (
    <div ref={refContent} className={clsx(styleProgram.content)}>
      {checkArr(data.results) &&
        data.results.map((item: any, i: number) => (
          <ContentItem item={item} i={i} key={i} />
        ))}
    </div>
  );
};

export default Content;
