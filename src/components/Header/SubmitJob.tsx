import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC, MouseEvent } from "react";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
import useIsYang from "@/hooks/isYang";
import useDeadlineClose from "@/hooks/closeDeadline";
import { useNavigate } from "react-router-dom";

const SubmitJob: FC<{ className?: string }> = ({ className }) => {
  const isAuth = useIsAuth();
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const { isYang } = useIsYang();
  const { isCloseBrand, isCloseTickets, isCloseMain, isCloseYoung } =
    useDeadlineClose();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isTablet) {
      dispatch(setMenuControl(false));
    }

    if (isAuth) {
      isCloseBrand && !isCloseTickets
        ? navigate(`/${paths.ticket}`)
        : navigate(`/${paths.pass}`);
    } else {
      navigate(`/${paths.registration}`);
    }
  };

  if (isCloseBrand && isCloseMain && isCloseYoung && isCloseTickets)
    return null;

  return (
    <HashLink
      smooth
      // className={clsx(
      //   style.job,
      //   isAuth && style.job__auth,
      //   className,
      //   isYang && style["job--dark"],
      // )}
      className={clsx(style.event, className, isYang && style["event--dark"])}
      to={isAuth ? `/${paths.pass}` : `/${paths.registration}`}
      onClick={handleClick}
    >
      {isCloseBrand && !isCloseTickets
        ? "Купить билет на церемонию"
        : "Подать работу"}
    </HashLink>
  );
};
export default SubmitJob;
