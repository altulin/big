import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import { FC } from "react";
import IconLogo from "@/images/header/logo.svg?react";
import style from "./Header.module.scss";
import Burger from "./Burger";

const Logo: FC<{ parent: string }> = ({ parent }) => {
  return (
    <div className={clsx(style.logo)}>
      <HashLink
        className={clsx(style.logo__link, style[`logo--${parent}`])}
        to={"/"}
        aria-label="logo"
        smooth
      >
        <IconLogo />
      </HashLink>
      <Burger />
    </div>
  );
};

export default Logo;
