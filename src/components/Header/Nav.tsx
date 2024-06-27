import clsx from "clsx";
import style from "./Header.module.scss";
import { FC } from "react";
import Links from "./Links";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import Registration from "./Registration";
import SubmitJob from "./SubmitJob";

const Nav: FC = () => {
  const isTablet = useIsTabletDevice();
  return (
    <div className={clsx(style.nav)}>
      <div className={clsx(style.nav__bar)}>
        <div className={clsx(style.nav__inner)}>
          <nav className={clsx(style.nav__links)}>
            <Links />
          </nav>
        </div>
        {isTablet && <Registration />}
        {isTablet && <SubmitJob />}
      </div>
    </div>
  );
};
export default Nav;
