/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Header.module.scss";
import clsx from "clsx";
import IconLogo from "@/images/header/logo.svg?react";
import IconBrand_1 from "@/images/promo/brand-1.svg?react";
import IconBrand_2 from "@/images/promo/brand-2.svg?react";
import IconBrand_3 from "@/images/promo/brand-3.svg?react";
import IconBrand_4 from "@/images/promo/brand-4.svg?react";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";

const LogoAnime: FC = () => {
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();

  const list = [
    { href: "#", alt: "", icon: IconBrand_1 },
    { href: "#", alt: "", icon: IconBrand_2 },
    { href: "#", alt: "", icon: IconBrand_3 },
    { href: "#", alt: "", icon: IconBrand_4 },
    { href: "#", alt: "", icon: IconLogo },
  ];

  const handleClickLogo = () => {
    if (isTablet) return;
    dispatch(setClick(true));
    dispatch(setPath(paths.promo));
  };

  return (
    <HashLink
      to={"/#top"}
      onClick={handleClickLogo}
      className={clsx(style.anime)}
    >
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect={"fade"}
        loop={true}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {list.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <div key={i} className={clsx(style.anime__item)}>
              <item.icon />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </HashLink>
  );
};
export default LogoAnime;
