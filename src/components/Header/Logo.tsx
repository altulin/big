import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import { FC, MouseEvent } from "react";
import IconLogo from "@/images/header/logo.svg?react";
import IconLogoDark from "@/images/header/logo-dark.svg?react";
import style from "./Header.module.scss";
import Burger from "./Burger";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";
import { useLocation } from "react-router-dom";
import useIsYang from "@/hooks/isYang";

const Logo: FC<{ parent: string }> = ({ parent }) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isYang } = useIsYang();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTablet) return;

    if (location.pathname !== "/") return;

    e.preventDefault();
    dispatch(setClick(true));
    dispatch(setPath(paths.promo));
  };

  return (
    <div className={clsx(style.logo)}>
      <HashLink
        className={clsx(style.logo__link, style[`logo--${parent}`])}
        to={"/"}
        aria-label="logo"
        smooth
        onClick={handleClick}
      >
        {isYang ? <IconLogoDark /> : <IconLogo />}
      </HashLink>
      <Burger />
    </div>
  );
};

export default Logo;
