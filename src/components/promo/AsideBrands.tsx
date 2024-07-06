/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import { brands } from "./script";
import { HashLink } from "react-router-hash-link";
import { paths } from "@/service/paths";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setClick, setPath } from "@/store/menu/menuSlice";

const AsideBrands: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  const handle = (e: any) => {
    if (isTablet) {
      // dispatch(setMenuControl(false));
    } else {
      e.preventDefault();

      const href = (e.target as HTMLAnchorElement).href.split("/").pop();
      dispatch(setClick(true));
      dispatch(setPath(href));
    }
  };

  return (
    <div className={clsx(style.aside)}>
      <ul className={clsx(style.aside__list, "scroll")}>
        {brands.map((item, i) => (
          <li key={i} className={clsx(style.aside__item)}>
            <a
              href={item.href}
              className={clsx(style.aside__link)}
              target="_blank"
            >
              <item.icon />
            </a>
          </li>
        ))}
      </ul>
      <HashLink
        smooth
        to={paths.partners}
        className={clsx(style.aside__button)}
        onClick={handle}
      >
        Все партнеры
      </HashLink>
    </div>
  );
};
export default AsideBrands;
