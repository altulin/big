import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconCome from "@/images/header/come.svg?react";
import { useAppDispatch } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";
import { setMenuControl } from "@/store/menu/menuSlice";

const ComeIn: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();

  const clickHandle = () => {
    dispatch(setMenuControl(false));
    dispatch(stepTo({ auth: { step: 1 } }));
  };
  return (
    <div className={clsx(style.comeIn_wrap, className)}>
      <button onClick={clickHandle} className={clsx(style.comeIn)}>
        <IconCome />
        <span>Войти</span>
      </button>
    </div>
  );
};
export default ComeIn;
