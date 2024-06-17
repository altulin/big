import { FC, ReactNode, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import style from "./ScrollBarComponent.module.scss";
import clsx from "clsx";
import IconArr from "@/images/scroll/arr-scroll.svg?react";

const ScrollBarComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const refScroll = useRef<Scrollbars>(null);

  return (
    <>
      <Scrollbars
        ref={refScroll}
        renderTrackVertical={(props) => (
          <div {...props} className={clsx(style.track)}></div>
        )}
        renderThumbVertical={(props) => (
          <div {...props} className={clsx(style.thumb)}></div>
        )}
      >
        {children}
      </Scrollbars>
      <button
        className={clsx(style.button)}
        onClick={() => refScroll.current?.scrollToTop()}
      >
        <IconArr />
      </button>
      <button
        className={clsx(style.button, style["button--down"])}
        onClick={() => refScroll.current?.scrollToBottom()}
      >
        <IconArr />
      </button>
    </>
  );
};
export default ScrollBarComponent;
