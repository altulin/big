/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";
import useIsYang from "@/hooks/isYang";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const { isYang } = useIsYang();
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (isTablet) {
      dispatch(setMenuControl(false));
    }

    navigate(`/${paths.registration}`);
    return;
  };

  return (
    <Link
      onClick={handleClick}
      className={clsx(style.event, className, isYang && style["event--dark"])}
      to={paths.registration}
    >
      Регистрация на мероприятие
    </Link>
  );
};
export default Registration;
