import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Program.module.scss";
import { initGLSphere } from "@/service/twgl/sphere";
const Planet: FC = () => {
  useEffect(() => {
    initGLSphere("canvas-planet");
  }, []);

  return (
    <div className={clsx(style.planet)}>
      <figure className={clsx(style.planet__figure)}>
        <canvas
          id="canvas-planet"
          className={clsx(style.planet__canvas)}
        ></canvas>
      </figure>
    </div>
  );
};
export default Planet;
