import clsx from "clsx";
import { FC } from "react";
import style from "./Promo.module.scss";
import IconArr from "@/images/promo/arr.svg?react";
import Soc from "../Contacts/Soc";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Button: FC<{ dir: "prev" | "next" }> = ({ dir }) => {
  return (
    <button
      className={clsx(style.button_slider, style[`button_slider--${dir}`])}
    >
      <IconArr />
    </button>
  );
};

const Controls: FC = () => {
  const isTablet = useIsTabletDevice();
  return (
    <div className={clsx(style.controls)}>
      <div className={clsx(style.controls__inner)}>
        {!isTablet && <Soc className={style.soc} />}

        <Button dir="prev" />
        <Button dir="next" />
      </div>
    </div>
  );
};
export default Controls;
