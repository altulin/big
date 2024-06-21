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

  useEffect(() => {
    if (!refContent.current) return;

    const width =
      refContent.current.offsetWidth / q(`.${styleProgram.button}`).length;
    gsap.set(q(`.${styleProgram.button}`), { width: `${width}px` });
  }, []);

  useEffect(() => {
    if (!refContent.current) return;
    setTimeLines(
      q(`.${styleProgram.item}`).map(() => {
        return gsap.timeline({ paused: true });
      }),
    );
  }, []);

  useEffect(() => {
    tlPLanet.current.fromTo(
      q(`.${styleProgram.program__main}`),
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.5 },
    );
  }, []);

  useEffect(() => {
    console.log(current);
    if (current === null) {
      // tlPLanet.current.reverse();
    }
  }, [current]);

  // useEffect(() => {
  //   if (!refContent.current) return;
  //   if (!current) return;

  //   const listPanels = Array.from(
  //     refContent.current.querySelectorAll(`.${styleProgram.item}`),
  //   );

  //   listPanels.forEach((item) => {
  //     (item as HTMLElement).style.flexGrow = "0";
  //   });

  //   (listPanels[current] as HTMLElement).style.flexGrow = "1";
  // }, [current]);

  return (
    <div ref={refContent} className={clsx(styleProgram.content)}>
      {program.map((item, i) => (
        <ContentItem item={item} i={i} key={i} />
      ))}
    </div>
  );
};

export default Content;
