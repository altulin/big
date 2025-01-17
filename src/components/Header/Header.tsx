/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./Header.module.scss";
import clsx from "clsx";
import Nav from "./Nav";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { setClick, setMenuControl, setPath } from "@/store/menu/menuSlice";
import useStickyHead from "@/hooks/stickyHead";
import Submit from "./Submit";
import useIsYang from "@/hooks/isYang";
import LogoBoxHome from "./LogoBoxHome";
import Logo from "./Logo";
import useAllLinks from "./allLinks";
import { paths } from "@/service/paths";
import { useGetLinks } from "./script";
import useDeepCompareEffect from "use-deep-compare-effect";
import SubmitJob from "./SubmitJob";

const Header = () => {
  const { isMenu } = useAppSelector((state) => state.menu);
  const isTablet = useIsTabletDevice();
  const itemRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));
  const q = gsap.utils.selector(itemRef);
  const sticky = useStickyHead();
  const { path } = useAppSelector((state) => state.menu);
  const { isYang } = useIsYang();
  const { allLinksList } = useAllLinks();
  const location = useLocation();
  const { links } = useGetLinks();
  const [subMenu, setSubMenu] = useState<
    | {
        label: string;
        path: string;
        submenu?: { label: string; path: string }[];
      }[]
    | undefined
  >(undefined);
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isTablet) {
      dispatch(setMenuControl(false));
    } else {
      const href = (e.target as HTMLAnchorElement).href.split("/").pop();
      dispatch(setClick(true));
      dispatch(setPath(href));
    }
  };

  useDeepCompareEffect(() => {
    if (isTablet) return;

    if (isYang) {
      const submenu = links.filter(
        (item) => item.path === paths.young_talent,
      )[0].submenu;

      setSubMenu(submenu);
      return;
    }

    links.forEach((item) => {
      if (item.path === path) {
        if (item.submenu) {
          setSubMenu(item.submenu);
        } else {
          setSubMenu(undefined);
        }
      }

      if (item.submenu) {
        item.submenu.forEach((subItem) => {
          if (subItem.path === path) {
            setSubMenu(item.submenu);
          }
        });
      }
    });
  }, [isTablet, location.pathname, path, links, isYang]);

  useEffect(() => {
    if (isTablet) return;
    if (isYang) return;

    if (!allLinksList.includes(path)) {
      setSubMenu(undefined);
    }
  }, [allLinksList, isTablet, path]);

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
    <header
      className={clsx(
        style.header,
        sticky && style[`header--${sticky}`],
        location.pathname.match(paths.jury_account_card) !== null &&
          style[`header--card`],
      )}
    >
      <div
        ref={itemRef}
        className={clsx(
          style.header__inner,
          isYang && style[`header__inner--dark`],
        )}
      >
        <div className={clsx(style.header__empty)}></div>
        <div className={clsx(style.header__empty_big)}>
          {!isTablet && (
            <>
              {subMenu &&
                subMenu.map((item, i) => {
                  return (
                    <div key={i} className={clsx(style.link_wrap_submenu)}>
                      <HashLink
                        onClick={handleClick}
                        className={clsx(
                          style.link,
                          style["link--submenu"],
                          path === item.path && style["link--active"],
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

        {isYang ? <Logo parent={"header"} /> : <LogoBoxHome />}

        <Nav />

        {/* {!isTablet && <Registration />} */}
        {!isTablet && <SubmitJob />}
        {!isTablet && <Submit />}
      </div>
    </header>
  );
};
export default Header;
