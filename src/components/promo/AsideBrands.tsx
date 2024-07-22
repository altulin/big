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

  const handleBrandClick = (e: any, section: string | undefined) => {
    if (!section) return;

    if (!isTablet) {
      e.preventDefault();
      dispatch(setClick(true));
      dispatch(setPath(section));
    }
  };

  return (
    <div className={clsx(style.aside)}>
      <ul className={clsx(style.aside__list, "swiper-no-mousewheel")}>
        {brands.map((item, i) => (
          <li key={i} className={clsx(style.aside__item)}>
            <HashLink
              smooth
              to={item.section ? `/#${item.section}` : item.href}
              className={clsx(style.aside__link)}
              target={!item.section ? "_blank" : "_self"}
              onClick={(e) => handleBrandClick(e, item.section)}
            >
              <item.icon />
            </HashLink>
          </li>
        ))}
      </ul>

      {!isTablet && (
        <HashLink
          smooth
          to={paths.partners}
          className={clsx(style.aside__button)}
          onClick={handle}
        >
          Все партнеры
        </HashLink>
      )}
    </div>
  );
};
export default AsideBrands;
