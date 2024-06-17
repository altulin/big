import style from "./Header.module.scss";
import clsx from "clsx";
import Nav from "./Nav";
import Registration from "./Registration";
import SubmitJob from "./SubmitJob";
import Logo from "./Logo";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

const Header = () => {
  const { isMenu } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const itemRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));
  const q = gsap.utils.selector(itemRef);
  //  const sticky = useStickyHead();

  useEffect(() => {
    if (!isTablet) return;
    isMenu ? tl.current.play() : tl.current.reverse();
  }, [isMenu, isTablet]);

  useGSAP(
    () => {
      tl.current.fromTo(
        q("." + style.nav),
        { x: 0 },
        { x: "100%", duration: 0.5 },
        "<",
      );
    },
    { scope: itemRef },
  );
  return (
    <header className={clsx(style.header)}>
      <div ref={itemRef} className={clsx(style.header__inner)}>
        <div className={clsx(style.header__empty)}></div>
        <div className={clsx(style.header__empty_big)}></div>
        <Logo parent={"header"} />

        <Nav />

        {!isTablet && <Registration />}
        {!isTablet && <SubmitJob />}
      </div>
    </header>
  );
};
export default Header;
