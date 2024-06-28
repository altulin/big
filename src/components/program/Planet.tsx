import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";
const Planet: FC = () => {
  const arr = new Array(12).fill("");
  return (
    <div className={clsx(style.planet)}>
      <div className={clsx(style.sphere)}>
        {arr.map((_, i) => (
          <div key={i} className={clsx(style.ring)}></div>
        ))}
      </div>
    </div>
  );
};
export default Planet;
