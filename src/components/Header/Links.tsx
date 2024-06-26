import style from "./Header.module.scss";
import clsx from "clsx";
import { FC, MouseEvent } from "react";
import { links } from "./script";
import { setClick, setMenuControl, setPath } from "@/store/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Links: FC = () => {
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const { path } = useAppSelector((state) => state.menu);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTablet) {
      dispatch(setMenuControl(false));
    } else {
      e.preventDefault();
      const href = (e.target as HTMLAnchorElement).href.split("/").pop();
      dispatch(setClick(true));
      dispatch(setPath(href));
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
              )}
              to={isTablet ? `#${item.path}` : `${item.path}`}
              onClick={handleClick}
            >
              {item.label}
            </HashLink>
          </div>
        );
      })}
    </>
  );
};

export default Links;
