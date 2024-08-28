/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Promo.module.scss";
import { HashLink } from "react-router-hash-link";
import { paths } from "@/service/paths";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setClick, setPath } from "@/store/menu/menuSlice";
import imgHand from "@/images/promo/slide_4.jpg";

const Slide_4: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  const handleClick = (e: any) => {
    if (!isTablet) {
      e.preventDefault();
      dispatch(setClick(true));
      dispatch(setPath(paths.pitch));
    }
  };

  return (
    <div className={clsx(style.slide_3)}>
      <div className={clsx(style.slide_3__info)}>
        <h2 className={clsx(style.slide_3__title)}>
          <span>участвуй в</span>
          <span>в IDEA DAY</span>
          <span>by NUUM</span>
        </h2>
        <p className={clsx(style.slide_3__text)}>
          Придумай оригинальный контент и получи возможность реализовать его
          вместе с NUUM
        </p>

        <p className={clsx(style.slide_3__text)}>DL - 20 сентября</p>

        <HashLink
          className={clsx(style.slide_3__link)}
          to={`/#${paths.pitch}`}
          smooth
          onClick={handleClick}
        >
          узнать больше
        </HashLink>
      </div>

      <figure className={clsx(style.slide_3__figure, style.slide_4__figure)}>
        <img
          className={clsx(style.slide_3__img, style.slide_4__img)}
          src={imgHand}
          alt="hand"
          width={543}
          height={558}
        />
      </figure>
    </div>
  );
};
export default Slide_4;
