import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";

const SubmitJob: FC<{ className?: string }> = ({ className }) => {
  const isAuth = useIsAuth();
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isTablet) {
      dispatch(setMenuControl(false));
    }
  };
  return (
    <HashLink
      smooth
      className={clsx(style.job, isAuth && style.job__auth, className)}
      to={isAuth ? paths.registration : paths.registration}
      onClick={handleClick}
    >
      Подать работу
    </HashLink>
  );
};
export default SubmitJob;
