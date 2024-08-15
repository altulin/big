/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import JuryCardBack from "./JuryCardBack";
import IconPlayLink from "@/images/jury_account/control_link.svg?react";
import JuryCardForm from "./JuryCardForm";
import JuryCardNav from "./JuryCardNav";
import JuryCardHead from "./uryCardHead";

const JuryCardControl: FC<{ el_info: any }> = ({ el_info }) => {
  return (
    <div className={clsx(style.control)}>
      <JuryCardBack />

      <a
        href={el_info.work_link}
        className={clsx(style.control_link)}
        target="_blank"
      >
        <span className={clsx(style.control_link__icon)}>
          <IconPlayLink />
        </span>
        <span className={clsx(style.control_link__content)}>
          <span className={clsx(style.control_link__label)}>
            {el_info.work_link}
          </span>
        </span>
      </a>

      <JuryCardForm />

      <JuryCardNav />

      <JuryCardHead title={el_info.title} />
    </div>
  );
};
export default JuryCardControl;
