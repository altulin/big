import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC, useCallback, useEffect } from "react";
// import { canvasCursor } from "@/service/canvas";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";
import { useAppSelector } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { canvasCreate, handleDraw } from "@/service/canvas";

const Slide_1: FC = () => {
  const isTablet = useIsTabletDevice();

  const { path } = useAppSelector((state) => state.menu);

  const scrollCallback = useCallback((e: MouseEvent) => {
    handleDraw(e);
  }, []);

  useEffect(() => {
    canvasCreate("canvas-sm");
  }, []);

  useEffect(() => {
    if (isTablet) return;

    if (path === paths.promo) {
      document.body.addEventListener("mousemove", scrollCallback);
    } else {
      document.body.removeEventListener("mousemove", scrollCallback);
    }
  }, [isTablet, path, scrollCallback]);

  return (
    <div className={clsx(style.slide_1)}>
      <figure className={clsx(style.slide_1__figure, "js-logo-placemove")}>
        {isTablet ? <IconMain /> : <canvas id="canvas-sm"></canvas>}
      </figure>
      <p className={clsx(style.slide_1__text)}>
        фестиваль видеоиндустрии, презентующий лучшие работы и&nbsp;персональные
        достижения в коммерческой и социальной рекламе, музыкальных видео и
        анимации
      </p>
    </div>
  );
};
export default Slide_1;
