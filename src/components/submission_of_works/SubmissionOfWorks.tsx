/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import style from "./SubmissionOfWorks.module.scss";
import { paths } from "@/service/paths";
import { initGLTunnel } from "@/service/twgl/tunnel";
import useIsYang from "@/hooks/isYang";
// import IconLogo from "@/images/participants/logo.svg?react";

const SubmissionOfWorks: FC = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { isYang } = useIsYang();

  useEffect(() => {
    if (!refContainer.current) {
      return;
    }

    initGLTunnel(
      "gl-tunnel",
      // "0.0, 1.0, 0.0, 1.0",
      isYang ? "0.333,0.169,0.937,0.0" : "0.0, 1.0, 0.0, 1.0",
    );
  }, [isYang]);

  const getImg = () => {
    return new URL("./assets/eye.gif", import.meta.url).href;
  };

  return (
    <section
      id={paths.participants}
      className={clsx(style.submission, "panel")}
    >
      <div className={clsx(style.submission__inner)}>
        <h2 className={clsx(style.title)}>
          {isYang ? (
            <div className={clsx(style.title__inner)}>
              <span className={clsx(style.title__text)}>
                <span>YOUNG</span>
                <span>TALENT</span>
                {/* <span className={clsx(style.title__text__by)}>by</span> */}
              </span>
              {/* <IconLogo /> */}
            </div>
          ) : (
            <span>Участникам</span>
          )}
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
            <img id="image" src={getImg()} />
          </div>
        </figure>
      </div>
    </section>
  );
};
export default SubmissionOfWorks;
