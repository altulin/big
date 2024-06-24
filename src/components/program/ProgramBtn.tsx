/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setProgramItem } from "@/store/program/programSlice";
import { FC } from "react";
import style from "./Program.module.scss";
import IconBtn from "@/images/program/btn_icon.svg?react";
import clsx from "clsx";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const ProgramBtnInner: FC<{ date: string; title: string }> = ({
  date,
  title,
}) => {
  return (
    <>
      <span className={clsx(style.button__icon)}>
        <IconBtn />
      </span>

      <span className={clsx(style.button__date)}>{date}</span>
      <span className={clsx(style.button__title)}>{title}</span>
    </>
  );
};

export const ProgramBtn: FC<{
  date: string;
  title: string;
  i: number;
}> = ({ date, title, i }) => {
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const { current } = useAppSelector((state) => state.program);

  const handle = (e: any) => {
    const button = e.target.getAttribute("data-button");

    if (current === button) {
      e.target.parentElement.style.flexGrow = "0";
      dispatch(setProgramItem(null));
      return;
    }

    dispatch(setProgramItem(button));
  };

  return (
    <>
      {!isTablet ? (
        <button onClick={handle} data-button={i} className={clsx(style.button)}>
          <ProgramBtnInner date={date} title={title} />
        </button>
      ) : (
        <div className={clsx(style.button)}>
          <ProgramBtnInner date={date} title={title} />
        </div>
      )}
    </>
  );
};

export default ProgramBtn;
