import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconCome from "@/images/header/come.svg?react";
import { useAppDispatch } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";
import { setMenuControl } from "@/store/menu/menuSlice";
import useDeadline from "@/hooks/deadline";

const ComeIn: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);

  const clickHandle = () => {
    dispatch(setMenuControl(false));
    dispatch(stepTo({ auth: { step: 1 } }));
  };
  return (
    <div
      className={clsx(
        style.comeIn_wrap,
        className,
        !isDeadline && style["comeIn_wrap--deadline"],
      )}
    >
      <button onClick={clickHandle} className={clsx(style.comeIn)}>
        <IconCome />
        <span>Войти</span>
      </button>
    </div>
  );
};
export default ComeIn;
