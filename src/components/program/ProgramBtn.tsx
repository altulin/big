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
  logo_btn: string | null;
}> = (props) => {
  const isTablet = useIsTabletDevice();

  const { date, title, i, logo_btn } = props;

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

      <div className={clsx(style.button__footer)}>
        {props.is_description && (
          <div data-button={i} className={clsx(style.button__icon)}>
            <IconArr />
          </div>
        )}

        {logo_btn && (
          <span className={clsx(style.button__mega)}>
            <img src={logo_btn} alt="icon" />
          </span>
        )}
      </div>
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
  logo_btn: string | null;
}> = ({
  date,
  title,
  i,
  logo,
  is_description,
  isActive,

  logo_btn,
}) => {
  const isTablet = useIsTabletDevice();
  const [isHover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const { current } = useAppSelector((state) => state.program);

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
      {!isTablet ? (
        <div
          data-button={i}
          className={clsx(
            style.button,
            isActive && style["button_active"],
            isHover && style["button_hover"],
          )}
          onClick={handle}
        >
          <ProgramBtnInner
            setHover={setHover}
            is_description={is_description}
            date={date}
            title={title}
            i={i}
            logo_btn={logo_btn}
          />
        </div>
      ) : (
        <div className={clsx(style.button, "program-button")}>
          <ProgramBtnInner
            is_description={is_description}
            date={date}
            title={title}
            logo={logo}
            logo_btn={logo_btn}
          />
        </div>
      )}
    </>
  );
};

export default ProgramBtn;
