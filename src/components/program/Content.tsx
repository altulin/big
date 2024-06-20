import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";
import { program } from "./script";

const Content: FC = () => {
  return (
    <div className={clsx(style.content)}>
      {program.map((_, i) => (
        <h2 key={i}>22</h2>
      ))}
    </div>
  );
};
export default Content;
