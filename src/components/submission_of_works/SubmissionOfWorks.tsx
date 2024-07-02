/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useCallback, useEffect, useRef } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";
import useRoom from "@/service/canvasParticipants";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppSelector } from "@/hooks/hook";

const SubmissionOfWorks: FC = () => {
  const refFigure = useRef<HTMLElement | null>(null);
  const { createCanvas, handleDraw } = useRoom();
  const isTablet = useIsTabletDevice();
  const { path } = useAppSelector((state) => state.menu);

  const scrollCallback = useCallback(() => {
    handleDraw();
  }, [handleDraw]);

  useEffect(() => {
    if (isTablet) return;

    // console.log(path === paths.participants);

    // if (path === paths.participants) {
    // document.body.addEventListener("wheel", scrollCallback);
    // } else {
    //   document.body.removeEventListener("wheel", scrollCallback);
    // }
  }, [isTablet, path, scrollCallback]);

  useEffect(() => {
    if (!refFigure.current) return;
    createCanvas(refFigure.current);
  }, [createCanvas]);

  return (
    <section
      id={paths.participants}
      className={clsx(style.submission, "panel")}
    >
      <div className={clsx(style.submission__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Участникам</span>
        </h2>

        <figure ref={refFigure} id="room" className={clsx(style.canvas)}>
          <canvas id="canvas-eye"></canvas>
        </figure>
      </div>
    </section>
  );
};
export default SubmissionOfWorks;
