import clsx from "clsx";
import { FC } from "react";
import style from "./Winners.module.scss";
import IconPlayLink from "@/images/jury_account/control_link.svg?react";

const WinnersLink: FC<{ link: string }> = ({ link }) => {
  return (
    <div className={clsx(style.link)}>
      <a href={link} className={clsx(style.control_link)} target="_blank">
        <span className={clsx(style.control_link__icon)}>
          <IconPlayLink />
        </span>
        <span className={clsx(style.control_link__content)}>
          <span className={clsx(style.control_link__label)}>{link}</span>
        </span>
      </a>
    </div>
  );
};
export default WinnersLink;
