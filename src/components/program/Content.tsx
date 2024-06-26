/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import styleProgram from "./Program.module.scss";
import { program } from "./script";
import ContentItem from "./ContentItem";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppSelector } from "@/hooks/hook";

const Content: FC<{ refParent: any }> = ({ refParent }) => {
  const refContent = useRef<HTMLDivElement | null>(null);
  const q = gsap.utils.selector(refParent);
  const tlPLanet = useRef(gsap.timeline({ paused: true }));
  const [timeLines, setTimeLines] = useState<any>([]);
  const { current } = useAppSelector((state) => state.program);
  const ease = "none";

  useEffect(() => {
    if (!refContent.current) return;

    const width =
      refContent.current.offsetWidth / q(`.${styleProgram.button}`).length;
    gsap.set(q(`.${styleProgram.button}`), { width: `${width}px` });
  }, []);

  useEffect(() => {
    if (!refContent.current) return;

    setTimeLines(
      q(`.${styleProgram.item}`).map((item) => {
        return gsap
          .timeline({ paused: true })
          .fromTo(item, { flexGrow: 0 }, { flexGrow: 1, ease, duration: 0.2 })
          .add("start", "<")
          .fromTo(
            item.querySelector(`.${styleProgram.button__icon}`),
            { autoAlpha: 0 },
            { autoAlpha: 1, ease, duration: 0.01 },
            "<",
          )
          .fromTo(
            item.querySelector(`.${styleProgram.info}`),
            { display: "none", width: "0" },
            { display: "block", width: "100%", direction: 0.01 },
            "<",
          )
          .fromTo(
            item.querySelector(`.${styleProgram.info}`),
            { autoAlpha: 0 },
            { autoAlpha: 1, direction: 0.01 },
          );
      }),
    );
  }, []);

  useGSAP(() => {
    if (q(`.${styleProgram.program__main}`).length === 0) return;

    return tlPLanet.current
      .fromTo(
        q(`.${styleProgram.program__main}`),
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.01, ease },
      )
      .fromTo(
        q(`.${styleProgram.program__main}`),
        { display: "flex" },
        { display: "none", duration: 0.01, ease },
      )
      .fromTo(
        refContent.current,
        { width: "56%" },
        { width: "100%", ease, duration: 0.01 },
      );
  });

  useEffect(() => {
    if (current === null) {
      timeLines.forEach((tl: any) => {
        tl.pause("start");
      });
      tlPLanet.current.reverse();
    }

    if (current !== null) {
      tlPLanet.current.play().then(() => {
        timeLines.forEach((tl: any) => {
          tl.pause("start");
        });
        timeLines[current].play();
      });
    }
  }, [current, timeLines]);

  return (
    <div ref={refContent} className={clsx(styleProgram.content)}>
      {program.map((item, i) => (
        <ContentItem item={item} i={i} key={i} />
      ))}
    </div>
  );
};

export default Content;
