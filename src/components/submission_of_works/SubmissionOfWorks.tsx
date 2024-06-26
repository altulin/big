import clsx from "clsx";
import { FC } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";

const SubmissionOfWorks: FC = () => {
  return (
    <section
      id={paths.submission_of_works}
      className={clsx(style.submission, "panel")}
    >
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
