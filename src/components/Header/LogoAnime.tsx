/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import style from "./Header.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { HashLink } from "react-router-hash-link";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import { brands, grape } from "../promo/script";

const LogoAnime: FC = () => {
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const [brandsList, setBrandsList] = useState(brands);

  useEffect(() => {
    setBrandsList([...brandsList, grape]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {brandsList.map((item: any, i: number) => (
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
