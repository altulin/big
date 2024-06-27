/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import { brands } from "../promo/script";
import style from "./Header.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import IconLogo from "@/images/header/logo.svg?react";
import IconBrand_1 from "@/images/promo/brand-1.svg?react";
import IconBrand_2 from "@/images/promo/brand-2.svg?react";
import IconBrand_3 from "@/images/promo/brand-3.svg?react";
import IconBrand_4 from "@/images/promo/brand-4.svg?react";
import { useAppSelector } from "@/hooks/hook";
import { paths } from "@/service/paths";

const LogoAnime: FC = () => {
  const itemRef = useRef(null);
  const tl1 = useRef(
    gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0, yoyo: true }),
  );
  const q = gsap.utils.selector(itemRef);
  const logo = { href: "#", alt: "", icon: IconLogo };
  const { path } = useAppSelector((state) => state.menu);

  const list = [
    { href: "#", alt: "", icon: IconBrand_1 },
    { href: "#", alt: "", icon: IconBrand_2 },
    { href: "#", alt: "", icon: IconBrand_3 },
    { href: "#", alt: "", icon: IconBrand_4 },
    { href: "#", alt: "", icon: IconLogo },
  ];

  useEffect(() => {
    if (path === paths.promo) return;

    tl1.current.restart();
  }, [path]);

  useGSAP(
    () => {
      // tl1.current.fromTo(
      //   q(`.${style.anime__item}`),
      //   {
      //     autoAlpha: 0,
      //   },
      //   { autoAlpha: 1, duration: 0.01, stagger: 1 },
      // );
      tl1.current.fromTo(
        q(`.${style.anime__item}`),
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 1,
        },
      );
    },
    { scope: itemRef, dependencies: [path], revertOnUpdate: true },
  );

  return (
    <div ref={itemRef} className={clsx(style.anime)}>
      {list.map((item: any, i: number) => (
        <div key={i} className={clsx(style.anime__item)}>
          <item.icon />
        </div>
      ))}
    </div>
  );
};
export default LogoAnime;
