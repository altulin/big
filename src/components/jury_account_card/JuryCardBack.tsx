import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./JuryCard.module.scss";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation } from "react-router-dom";

const JuryCardBack: FC = () => {
  const location = useLocation();

  return (
    <HashLink
      className={clsx(style.control_back)}
      to={`/${location.state.page}`}
      state={{ values: location.state.values }}
    >
      <span className={clsx(style.control_back__icon)}>
        <IconBack />
      </span>
      <span className={clsx(style.control_back__text)}>к списку работ</span>
    </HashLink>
  );
};
export default JuryCardBack;
