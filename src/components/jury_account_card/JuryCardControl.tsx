import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import { HashLink } from "react-router-hash-link";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation } from "react-router-dom";

const JuryCardControl: FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  return (
    <div className={clsx(style.control)}>
      <HashLink
        className={clsx(style.control_back)}
        to={`/${location.state.page}`}
      >
        <span className={clsx(style.control_back__icon)}>
          <IconBack />
        </span>
        <span className={clsx(style.control_back__text)}>к списку работ</span>
      </HashLink>
    </div>
  );
};
export default JuryCardControl;
