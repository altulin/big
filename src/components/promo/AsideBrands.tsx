import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import { brands } from "./script";

const AsideBrands: FC = () => {
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
              {/* <LazySvg path={`./assets/brand-${i + 1}`} /> */}
              <item.icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AsideBrands;
