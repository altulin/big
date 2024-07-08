import clsx from "clsx";
import style from "./Criteria.module.scss";
import { FC, useEffect } from "react";
import ContentDesk from "./ContentDesk";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ContentMob from "./ContentMob";
import { paths } from "@/service/paths";
import { initGLGrid } from "@/service/twgl/grid";

const Criteria: FC = () => {
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    initGLGrid("canvas-net");
  }, []);

  return (
    <section id={paths.criteria} className={clsx(style.criteria, "panel")}>
      <div className={clsx(style.criteria__inner)}>
        <div className={clsx(style.present)}>
          <h2 className={clsx(style.title)}>
            <span>критерии</span>
            <span>оценки</span>
            <span>работ</span>
          </h2>

          <figure className={clsx(style.criteria__figure)}>
            <canvas
              className={clsx(style.criteria__canvas)}
              id="canvas-net"
            ></canvas>
          </figure>
        </div>

        <div className={clsx(style.content)}>
          <div className={clsx(style.rules)}>
            {isTablet ? <ContentMob /> : <ContentDesk />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Criteria;
