/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Partners.module.scss";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import SVG from "react-inlinesvg";

const PartnersBlock: FC<{
  list: { url: string; logo: string; title: string }[];
  type: string;
}> = ({ list, type }) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const getTitle = (type: string) => {
    switch (type) {
      case "general":
        return "Генеральные партнеры";
      case "industrial":
        return "Индустриальные партнеры";
      case "informational":
        return "Информационные партнеры";
    }
  };

  const handleBrandClick = (e: any, section: string | undefined) => {
    if (section !== "Мегамаркет") return;

    if (!isTablet) {
      e.preventDefault();
      dispatch(setClick(true));
      dispatch(setPath(paths.pitch));
    }
  };

  return (
    <div className={clsx(style.item)}>
      <h3 className={clsx(style.item__title)}>{getTitle(type)}</h3>
      <ul className={clsx(style.item__list)}>
        {list.map((item, i) => (
          <li key={i} className={clsx(style.item__list_item)}>
            <HashLink
              smooth
              to={item.title === "Мегамаркет" ? `/#${paths.pitch}` : item.url}
              className={clsx(style.item__list_link)}
              target={item.title !== "Мегамаркет" ? "_blank" : "_self"}
              onClick={(e) => handleBrandClick(e, item.title)}
            >
              <SVG
                src={item.logo}
                width={96}
                height={35}
                title={item.title}
                preProcessor={
                  (code) => code.replace(/fill=".*?"/g, 'fill="currentColor"')
                  // .replace(/stroke=".*?"/g, 'stroke="currentColor"')
                }
              />
              {/* <img
                className={clsx(style.item__list_logo)}
                src={item.logo}
                alt="logo"
                width={96}
                height={35}
              /> */}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PartnersBlock;
