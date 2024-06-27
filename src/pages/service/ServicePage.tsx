import clsx from "clsx";
import { FC, ReactNode, useEffect } from "react";
import style from "./ServicePage.module.scss";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setPath } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
// import { canvasCursor } from "@/service/canvas";

const ServicePage: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTablet) return;
    // canvasCursor("service-canvas");
  }, [isTablet]);

  useEffect(() => {
    dispatch(setPath(null));
  }, [dispatch]);

  return (
    <section className={clsx(style.service)}>
      <div className={clsx(style.service__inner)}>
        <div className={clsx(style.service__canvas)}>
          <h2 className={clsx(style.service__title)}>{title}</h2>
          <figure className={clsx(style.service__figure, "js-logo-placemove")}>
            <canvas id="service-canvas"></canvas>
          </figure>
        </div>
        {children}
      </div>
    </section>
  );
};
export default ServicePage;
