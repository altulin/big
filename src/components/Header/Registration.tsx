/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsYang from "@/hooks/isYang";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";
import useIsAuth from "@/hooks/isAuth";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const { isYang } = useIsYang();
  const isAuth = useIsAuth();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setMenuControl(false));
  };

  return (
    <a
      className={clsx(
        style.job,
        isAuth && style.job__auth,
        className,
        isYang && style["job--dark"],
      )}
      href="https://nuum.ru/channel/bigpicturefestival"
      target="_blank"
      onClick={handleClick}
    >
      Паблик-токи
    </a>
  );
};
export default Registration;
