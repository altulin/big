import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import IconBrand_1 from "@/images/promo/brand-1.svg?react";
import IconBrand_2 from "@/images/promo/brand-2.svg?react";
import IconBrand_3 from "@/images/promo/brand-3.svg?react";
import IconBrand_4 from "@/images/promo/brand-4.svg?react";

const brands = [
  { href: "#", alt: "", icon: IconBrand_1 },
  { href: "#", alt: "", icon: IconBrand_2 },
  { href: "#", alt: "", icon: IconBrand_3 },
  { href: "#", alt: "", icon: IconBrand_4 },
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
