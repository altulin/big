import clsx from "clsx";
import style from "./Criteria.module.scss";
import { FC, useCallback, useEffect } from "react";
import ContentDesk from "./ContentDesk";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ContentMob from "./ContentMob";
import { paths } from "@/service/paths";
import { handleDraw, canvasCreate } from "@/service/canvasNet";
import { useAppSelector } from "@/hooks/hook";

const Criteria: FC = () => {
  const isTablet = useIsTabletDevice();
  const { path } = useAppSelector((state) => state.menu);

  const scrollCallback = useCallback((e: MouseEvent) => {
    handleDraw(e);
  }, []);

  useEffect(() => {
    canvasCreate("canvas-net");
  }, []);

  useEffect(() => {
    if (isTablet) return;

    if (path === paths.criteria) {
      document.body.addEventListener("mousemove", scrollCallback);
    } else {
      document.body.removeEventListener("mousemove", scrollCallback);
    }
  }, [isTablet, path, scrollCallback]);

  return (
    <section id={paths.criteria} className={clsx(style.criteria, "panel")}>
      <div className={clsx(style.criteria__inner)}>
        <div className={clsx(style.present)}>
          <h2 className={clsx(style.title)}>
            <span>критерии</span>
            <span>оценки</span>
            <span>работ</span>
          </h2>

          <figure className={clsx(style.net, "js-net")}>
            <canvas id="canvas-net"></canvas>
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
