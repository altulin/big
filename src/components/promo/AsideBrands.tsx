import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import { LazySvg } from "@/hoc/LazySvg";

const brands = [
  { href: "#", alt: "" },
  { href: "#", alt: "" },
  { href: "#", alt: "" },
  { href: "#", alt: "" },
];

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
              <LazySvg path={`../images/promo/brand-${i + 1}`} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AsideBrands;
