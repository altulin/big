/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, MouseEvent } from "react";
import style from "./Header.module.scss";
import useIsYang from "@/hooks/isYang";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";
import useDeadline from "@/hooks/deadline";
import { setSuccessModal } from "@/store/modal/modalSlice";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const { isYang } = useIsYang();
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
