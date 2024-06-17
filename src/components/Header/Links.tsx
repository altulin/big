import style from "./Header.module.scss";
import clsx from "clsx";
import { FC } from "react";
import { links } from "./script";
import { NavLink } from "react-router-dom";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";

const Links: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      {links.map((item, i) => (
        <div className={clsx(style.link_wrap)} key={i}>
          <NavLink
            key={i}
            className={({ isActive }) =>
              clsx(style.link, isActive && style["link--active"])
            }
            to={`${item.path}`}
            onClick={() => {
              dispatch(setMenuControl(false));
            }}
          >
            {item.label}
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default Links;
