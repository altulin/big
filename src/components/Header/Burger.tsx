import clsx from "clsx";
import style from "@/components/Header/Header.module.scss";
import { FC } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setMenuControl } from "@/store/menu/menuSlice";

const Burger: FC = () => {
  const isTablet = useIsTabletDevice();
  const { isMenu } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  return (
    <button
      className={clsx(
        style.header__burger,
        style.burger,
        isMenu && style["burger__active"],
      )}
      type="button"
      aria-label="menu"
      onClick={() => dispatch(setMenuControl(!isMenu))}
    >
      <Hamburger
        toggled={isMenu}
        toggle={() => dispatch(setMenuControl(!isMenu))}
        color="#141414"
        size={isTablet ? 20 : 32}
        duration={0.2}
      />
    </button>
  );
};

export default Burger;