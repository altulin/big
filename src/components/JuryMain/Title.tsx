import clsx from "clsx";
import { FC } from "react";
import style from "./JuryMain.module.scss";

const Title: FC = () => {
  return (
    <h2 className={clsx(style.title)}>
      <span>Жюри</span>
    </h2>
  );
};
export default Title;
