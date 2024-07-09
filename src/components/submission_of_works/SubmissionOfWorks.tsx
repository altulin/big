/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";
import { initGLTunnel } from "@/service/twgl/tunnel";

const SubmissionOfWorks: FC = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refContainer.current) {
      return;
    }

    initGLTunnel("gl-tunnel");
  }, []);

  return (
    <section
      id={paths.participants}
      className={clsx(style.submission, "panel")}
    >
      <div className={clsx(style.submission__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Участникам</span>
        </h2>

        <figure
          ref={refContainer}
          id="room"
          className={clsx(style.submission__figure)}
        >
          <canvas
            className={clsx(style.submission__canvas)}
            id="gl-tunnel"
          ></canvas>

          <div id="imageContainer">
            <img
              id="image"
              src="http://imroma.com/themes/otentic/wp-content/uploads/2022/02/img_42-300x300.jpg"
            />
          </div>
        </figure>
      </div>
    </section>
  );
};
export default SubmissionOfWorks;
