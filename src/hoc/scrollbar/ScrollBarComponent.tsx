import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import style from "./ScrollBarComponent.module.scss";
import clsx from "clsx";
import IconArr from "@/images/scroll/arr_simple.svg?react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const ScrollBarComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const isTablet = useIsTabletDevice();

  const refScroll = useRef<Scrollbars>(null);

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (!refScroll.current) return;

    setIsScroll(refScroll.current.getThumbVerticalHeight() === 0);
  });

  if (isTablet) return <>{children}</>;

  return (
    <>
      <Scrollbars
        hideTracksWhenNotNeeded={true}
        className={clsx(
          !isScroll && "swiper-no-mousewheel",
          !isScroll && "scrollbar",
        )}
        ref={refScroll}
        renderTrackVertical={(props) => (
          <div {...props} className={clsx(style.track)}></div>
        )}
        renderThumbVertical={(props) => {
          return <div {...props} className={clsx(style.thumb)}></div>;
        }}
      >
        {children}
      </Scrollbars>
      <button
        className={clsx(
          style.button,
          // isScroll && style["button--hidden"]
        )}
        onClick={() => refScroll.current?.scrollToTop()}
      >
        <IconArr />
      </button>
      <button
        className={clsx(
          style.button,
          style["button--down"],
          // isScroll && style["button--hidden"],
        )}
        onClick={() => refScroll.current?.scrollToBottom()}
      >
        <IconArr />
      </button>
    </>
  );
};
export default ScrollBarComponent;
