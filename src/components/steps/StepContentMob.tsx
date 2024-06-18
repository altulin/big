import { FC } from "react";
import style from "./Steps.module.scss";
import clsx from "clsx";

const StepContentMob: FC = () => {
  return <div className={clsx(style.steps__content_mob)}></div>;
};
export default StepContentMob;
