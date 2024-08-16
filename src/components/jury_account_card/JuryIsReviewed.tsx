import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";

const JuryIsReviewed: FC<{ is_reviewed: boolean }> = ({ is_reviewed }) => {
  if (!is_reviewed) return null;

  return (
    <div className={clsx(style.reviewed)}>
      <span></span>
    </div>
  );
};
export default JuryIsReviewed;
