import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";

const JuryCardHead: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={clsx(style.head)}>
      <h2 className={clsx(style.head__title)}>{title}</h2>
    </div>
  );
};
export default JuryCardHead;
