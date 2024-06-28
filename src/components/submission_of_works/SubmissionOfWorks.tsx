import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";
import useRoom from "@/service/canvasParticipants";

const SubmissionOfWorks: FC = () => {
  const refFigure = useRef<HTMLElement | null>(null);
  const createCanvas = useRoom();

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
