import clsx from "clsx";
import { FC } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";

const SubmissionOfWorks: FC = () => {
  return (
    <section
      id={paths.participants}
      className={clsx(style.submission, "panel")}
    >
      <div className={clsx(style.submission__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Участникам</span>
        </h2>

        <figure className={clsx(style.canvas)}>
          <canvas id="canvas-eye"></canvas>
        </figure>
      </div>
    </section>
  );
};
export default SubmissionOfWorks;
