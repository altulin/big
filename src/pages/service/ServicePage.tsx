import clsx from "clsx";
import { FC, ReactNode, useCallback, useEffect } from "react";
import style from "./ServicePage.module.scss";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setPath } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
import IconMain from "@/images/header/logo.svg?react";
import { canvasCreate, handleDraw } from "@/service/canvasContact";

const ServicePage: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  const scrollCallback = useCallback((e: MouseEvent) => {
    handleDraw(e);
  }, []);

  useEffect(() => {
    canvasCreate("canvas-contacts");
  }, []);

  useEffect(() => {
    if (isTablet) return;
    document.body.addEventListener("mousemove", scrollCallback);
    return () => {
      document.body.removeEventListener("mousemove", scrollCallback);
    };
  }, [isTablet, scrollCallback]);

  useEffect(() => {
    dispatch(setPath(null));
  }, [dispatch]);

  return (
    <section className={clsx(style.service)}>
      <div className={clsx(style.service__inner)}>
        <div className={clsx(style.service__canvas)}>
          <h2 className={clsx(style.service__title)}>{title}</h2>
          <figure className={clsx(style.service__figure, "js-contacts-figure")}>
            <canvas id="canvas-contacts"></canvas>
          </figure>
        </div>
        {children}

        {isTablet && (
          <figure className={clsx(style.service__icon)}>
            <IconMain />
          </figure>
        )}
      </div>
    </section>
  );
};
export default ServicePage;
