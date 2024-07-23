/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./Header.module.scss";
import clsx from "clsx";
import { FC, MouseEvent, useEffect } from "react";
import { links } from "./script";
import { setClick, setMenuControl, setPath } from "@/store/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";

const Links: FC = () => {
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const { path } = useAppSelector((state) => state.menu);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getLink = (item: any) => {
    if (isTablet) {
      if (item.path === paths.young_talent) {
        return `/${item.path}#top`;
      }

      return `/#${item.path}`;
    } else {
      return `${item.path}`;
    }
  };

  // переход по ссылке
  useEffect(() => {
    const values = Object.values(paths);
    let name;

    if (pathname.split("/")[1] === paths.young_talent) {
      name = pathname.split("/")[2];
      navigate(`/${paths.young_talent}`);
    } else {
      name = pathname.split("/")[1];
    }

    if (!values.includes(name)) return;

    if (!isTablet) {
      setTimeout(() => {
        dispatch(setPath(name));
      }, 200);
    } else {
      setTimeout(() => {
        const el = document.getElementById(name);
        if (!el) return;
        el.scrollIntoView();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isTablet, navigate]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTablet) {
      const href = (e.target as HTMLAnchorElement).href.split("/").pop();
      dispatch(setMenuControl(false));
      dispatch(setPath(href?.split("#")[1]));
    } else {
      const href = (e.target as HTMLAnchorElement).href.split("/").pop();

      if (href === paths.young_talent) {
        e.preventDefault();
        navigate(`/${paths.young_talent}`);
        dispatch(setPath(href));
        return;
      }

      e.preventDefault();
      dispatch(setClick(true));
      dispatch(setPath(href));

      if (pathname !== "/") {
        navigate("/");
      }
    }
  };

  return (
    <>
      {links.map((item, i) => {
        return (
          <div className={clsx(style.link_wrap)} key={i}>
            <HashLink
              key={i}
              smooth
              className={clsx(
                style.link,
                path === item.path && style["link--active"],

                item.submenu &&
                  item.submenu?.filter((el) => el.path === path).length > 0 &&
                  style["link--active"],
              )}
              to={getLink(item)}
              onClick={handleClick}
            >
              <span>{item.label}</span>
              {item.logo && <item.logo />}
            </HashLink>
          </div>
        );
      })}
    </>
  );
};

export default Links;
