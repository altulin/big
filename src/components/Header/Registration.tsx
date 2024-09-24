/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, MouseEvent } from "react";
import style from "./Header.module.scss";
import useIsYang from "@/hooks/isYang";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";
import useDeadline from "@/hooks/deadline";
import { setSuccessModal } from "@/store/modal/modalSlice";
import useIsAuth from "@/hooks/isAuth";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const { isYang } = useIsYang();
  const isAuth = useIsAuth();
  const dispatch = useAppDispatch();
  const isDeadline = useDeadline(
    import.meta.env.VITE_APP_DEADLINE_REGISTRATION,
  );

  const handleClick = (e: MouseEvent) => {
    dispatch(setMenuControl(false));

    if (!isDeadline) {
      e.preventDefault();
      dispatch(
        setSuccessModal({
          text: "Регистрация на мероприятия завершена.  Смотрите паблик-токи онлайн",
          title: "Регистрация",
          look: true,
        }),
      );
    }
  };

  return (
    <a
      // className={clsx(style.event, className, isYang && style["event--dark"])}
      className={clsx(
        style.job,
        isAuth && style.job__auth,
        className,
        isYang && style["job--dark"],
      )}
      href={import.meta.env.VITE_APP_REG}
      target="_blank"
      onClick={handleClick}
    >
      Паблик-токи
    </a>
  );
};
export default Registration;
