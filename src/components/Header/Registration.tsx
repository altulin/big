/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsYang from "@/hooks/isYang";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const { isYang } = useIsYang();

  return (
    <a
      className={clsx(style.event, className, isYang && style["event--dark"])}
      href={import.meta.env.VITE_APP_REG}
      target="_blank"
    >
      Регистрация на мероприятие
    </a>
  );
};
export default Registration;
