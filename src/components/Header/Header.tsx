import style from "./Header.module.scss";
import clsx from "clsx";
import Nav from "./Nav";
import Registration from "./Registration";
import SubmitJob from "./SubmitJob";
import Logo from "./Logo";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppSelector } from "@/hooks/hook";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { links } from "./script";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const { isMenu } = useAppSelector((state) => state.menu);
  const isTablet = useIsTabletDevice();
  const itemRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));
  const q = gsap.utils.selector(itemRef);
  //  const sticky = useStickyHead();
  const location = useLocation();
  const [subMenu, setSubMenu] = useState<
    | {
        label: string;
        path: string;
        submenu?: { label: string; path: string }[];
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    if (isTablet) return;

    try {
      const path = location.pathname.split("/")[1];
      setSubMenu(
        links.filter((item) => {
          return item.path === `/${path}`;
        })[0].submenu,
      );
    } catch (error) {
      setSubMenu(undefined);
    }
  }, [isTablet, location.pathname]);

  useEffect(() => {
    if (!isTablet) return;
    isMenu ? tl.current.play() : tl.current.reverse();
  }, [isMenu, isTablet]);

  useGSAP(
    () => {
      tl.current.fromTo(
        q("." + style.nav),
        { x: 0 },
        { x: "100%", duration: 0.5 },
        "<",
      );
    },
    { scope: itemRef },
  );
  return (
    <header className={clsx(style.header)}>
      <div ref={itemRef} className={clsx(style.header__inner)}>
        <div className={clsx(style.header__empty)}></div>
        <div className={clsx(style.header__empty_big)}>
          {!isTablet && (
            <>
              {subMenu &&
                subMenu.map((item, i) => {
                  return (
                    <div key={i} className={clsx(style.link_wrap_submenu)}>
                      <HashLink
                        className={clsx(
                          style.link,
                          style["link--submenu"],
                          `${location.pathname}${location.hash}` ===
                            `${item.path}` && style["link--active"],
                        )}
                        to={`${item.path}`}
                      >
                        {item.label}
                      </HashLink>
                    </div>
                  );
                })}
            </>
          )}
        </div>
        <Logo parent={"header"} />

        <Nav />

        {!isTablet && <Registration />}
        {!isTablet && <SubmitJob />}
      </div>
    </header>
  );
};
export default Header;
