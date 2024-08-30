import clsx from "clsx";
import style from "./Header.module.scss";
import { FC } from "react";
import Links from "./Links";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import Registration from "./Registration";
import SubmitJob from "./SubmitJob";
import useIsAuth from "@/hooks/isAuth";
import ComeIn from "./ComeIn";
import Exit from "./Exit";
import Profile from "./Profile";

const Nav: FC = () => {
  const isTablet = useIsTabletDevice();
  const isAuth = useIsAuth();

  return (
    <div className={clsx(style.nav)}>
      <div className={clsx(style.nav__bar)}>
        <div className={clsx(style.nav__inner)}>
          <nav className={clsx(style.nav__links)}>
            <Links />
          </nav>
        </div>
        {isTablet && (
          <div className={clsx(style.footer, isAuth && style.footer__auth)}>
            <Registration
              className={clsx(
                style.footer__registration,
                isAuth && style.footer__registration__auth,
              )}
            />
            <SubmitJob
              className={clsx(
                style.footer__submit,
                isAuth && style.footer__submit__auth,
              )}
            />
            {!isAuth && (
              <ComeIn
                className={clsx(
                  style.footer__come,
                  isAuth && style.footer__come__auth,
                )}
              />
            )}

            {isAuth && (
              <Profile
                className={clsx(
                  style.footer__profile,
                  isAuth && style.footer__profile__auth,
                )}
              />
            )}

            {isAuth && (
              <Exit
                className={clsx(
                  style.footer__exit,
                  isAuth && style.footer__exit__auth,
                )}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Nav;
