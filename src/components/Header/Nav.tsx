import clsx from "clsx";
import style from "./Header.module.scss";
import { FC } from "react";
import Links from "./Links";
import ComeIn from "./ComeIn";

const Nav: FC = () => {
  return (
    <div className={clsx(style.nav)}>
      <nav className={clsx(style.nav__links)}>
        <Links />
      </nav>
      <ComeIn />
    </div>
  );
};
export default Nav;
