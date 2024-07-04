import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";

const Registration: FC<{ className?: string }> = ({ className }) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (isTablet) {
      dispatch(setMenuControl(false));
    }
  };

  return (
    <Link
      onClick={handleClick}
      className={clsx(style.event, className)}
      to={paths.registration}
    >
      Регистрация на мероприятие
    </Link>
  );
};
export default Registration;
