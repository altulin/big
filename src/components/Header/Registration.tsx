/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsYang from "@/hooks/isYang";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const { isYang } = useIsYang();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setMenuControl(false));
  };

  return (
    <a
      className={clsx(style.event, className, isYang && style["event--dark"])}
      href={import.meta.env.VITE_APP_REG}
      target="_blank"
      onClick={handleClick}
    >
      Регистрация на мероприятия
    </a>
  );
};
export default Registration;
