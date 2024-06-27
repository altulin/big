import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconCome from "@/images/header/come.svg?react";
import { useAppDispatch } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";

const ComeIn: FC = () => {
  const dispatch = useAppDispatch();

  const clickHandle = () => {
    dispatch(stepTo({ auth: { step: 1 } }));
  };
  return (
    <div className={clsx(style.comeIn_wrap)}>
      <button onClick={clickHandle} className={clsx(style.comeIn)}>
        <IconCome />
        <span>Войти</span>
      </button>
    </div>
  );
};
export default ComeIn;
