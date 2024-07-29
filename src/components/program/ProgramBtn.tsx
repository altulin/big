/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setProgramItem } from "@/store/program/programSlice";
import { FC, useState } from "react";
import style from "./Program.module.scss";
import clsx from "clsx";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconArr from "@/images/step/iconStepArr.svg?react";

const ProgramBtnInner: FC<{
  date: string;
  title: string[];
  logo?: any;
  is_description: boolean;
  setHover?: any;
  i?: number;
}> = (props) => {
  const isTablet = useIsTabletDevice();
  const { current } = useAppSelector((state) => state.program);
  const dispatch = useAppDispatch();

  const { date, title, i, is_description } = props;

  const handle = (e: any) => {
    if (!is_description) return;

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
      <span className={clsx(style.button__date)}>
        <>
          {date}

          {props.logo && isTablet && <props.logo />}
        </>
      </span>
      <span className={clsx(style.button__title)}>
        {title.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </span>

      {props.is_description && (
        <div
          onMouseEnter={() => props.setHover(true)}
          onMouseLeave={() => props.setHover(false)}
          data-button={i}
          className={clsx(style.button__icon)}
          onClick={handle}
        >
          <IconArr />
        </div>
      )}
    </>
  );
};

export const ProgramBtn: FC<{
  date: string;
  title: string[];
  i: number;
  logo?: any;
  is_description: boolean;
  isActive?: boolean;
}> = ({ date, title, i, logo, is_description, isActive }) => {
  const isTablet = useIsTabletDevice();
  const [isHover, setHover] = useState(false);

  return (
    <>
      {!isTablet ? (
        <div
          data-button={i}
          className={clsx(
            style.button,
            isActive && style["button_active"],
            isHover && style["button_hover"],
          )}
        >
          <ProgramBtnInner
            setHover={setHover}
            is_description={is_description}
            date={date}
            title={title}
            i={i}
          />
        </div>
      ) : (
        <div className={clsx(style.button, "program-button")}>
          <ProgramBtnInner
            is_description={is_description}
            date={date}
            title={title}
            logo={logo}
          />
        </div>
      )}
    </>
  );
};

export default ProgramBtn;
