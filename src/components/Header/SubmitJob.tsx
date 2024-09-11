import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
import useIsYang from "@/hooks/isYang";
import useDeadlineClose from "@/hooks/closeDeadline";

const SubmitJob: FC<{ className?: string }> = ({ className }) => {
  const isAuth = useIsAuth();
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const { isYang } = useIsYang();
  const { isCloseBrand } = useDeadlineClose();

  const handleClick = () => {
    if (isTablet) {
      dispatch(setMenuControl(false));
    }
  };

  return (
    <HashLink
      smooth
      className={clsx(
        style.job,
        isAuth && style.job__auth,
        className,
        isYang && style["job--dark"],
      )}
      to={isAuth ? `/${paths.pass}` : `/${paths.registration}`}
      onClick={handleClick}
    >
      {isCloseBrand ? "Купить билеты" : "Подать работу"}
    </HashLink>
  );
};
export default SubmitJob;
