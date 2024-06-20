import clsx from "clsx";
import { FC } from "react";
import style from "./SubmissionOfWorks.module.scss";

const SubmissionOfWorks: FC = () => {
  return (
    <section className={clsx(style.submission)}>
      <div className={clsx(style.submission__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Подача</span>
          <span>работ</span>
        </h2>
      </div>
    </section>
  );
};
export default SubmissionOfWorks;
