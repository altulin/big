import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Program.module.scss";
import { initGLSphere } from "@/service/twgl/sphere";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
const Planet: FC = () => {
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    if (isTablet) return;
    initGLSphere("canvas-planet");
  }, [isTablet]);

  return (
    <div className={clsx(style.planet)}>
      <figure className={clsx(style.planet__figure)}>
        {!isTablet && (
          <canvas
            id="canvas-planet"
            className={clsx(style.planet__canvas)}
          ></canvas>
        )}
      </figure>
    </div>
  );
};
export default Planet;
