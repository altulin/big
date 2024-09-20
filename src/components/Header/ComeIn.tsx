import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import style from "./Header.module.scss";
import IconCome from "@/images/header/come.svg?react";
import { useAppDispatch } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";
import { setMenuControl } from "@/store/menu/menuSlice";
import useDeadlineClose from "@/hooks/closeDeadline";

const ComeIn: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { isCloseBrand, isCloseTickets, isCloseMain, isCloseYoung } =
    useDeadlineClose();

  const [isWidth, setIsWidth] = useState(
    isCloseBrand && isCloseMain && isCloseYoung && isCloseTickets,
  );

  useEffect(() => {
    setIsWidth(isCloseBrand && isCloseMain && isCloseYoung && isCloseTickets);
  }, [isCloseBrand, isCloseMain, isCloseTickets, isCloseYoung]);

  const clickHandle = () => {
    dispatch(setMenuControl(false));
    dispatch(stepTo({ auth: { step: 1 } }));
  };
  return (
    <div
      className={clsx(
        style.comeIn_wrap,
        className,
        isWidth && style["comeIn_wrap--width"],
      )}
    >
      <button onClick={clickHandle} className={clsx(style.comeIn)}>
        <IconCome />
        <span>Войти</span>
      </button>
    </div>
  );
};
export default ComeIn;
