import style from "./Header.module.scss";
import clsx from "clsx";
import { FC } from "react";
import { links } from "./script";
import { useLocation } from "react-router-dom";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
import { HashLink } from "react-router-hash-link";

const Links: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = `${location.pathname}${location.hash}`.split("/")[1];

  return (
    <>
      {links.map((item, i) => {
        console.log(`${item.path}`);
        return (
          <div className={clsx(style.link_wrap)} key={i}>
            <HashLink
              key={i}
              className={clsx(
                style.link,
                `/${path}` === `${item.path}` && style["link--active"],
              )}
              to={`${item.path}`}
              onClick={() => {
                dispatch(setMenuControl(false));
              }}
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
