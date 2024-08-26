import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./JuryCard.module.scss";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation } from "react-router-dom";
import { paths } from "@/service/paths";
import { useCheckDeadline } from "../jury_account_list/service";

const JuryCardBack: FC = () => {
  const location = useLocation();
  const { isShort } = useCheckDeadline();

  return (
    <HashLink
      className={clsx(style.control_back)}
      to={`/${paths.jury_account_list}`}
      state={{
        values: location.state.values,
        page: isShort ? paths.jury_account_list_short : paths.jury_account_list,
      }}
    >
      <span className={clsx(style.control_back__icon)}>
        <IconBack />
      </span>
      <span className={clsx(style.control_back__text)}>к списку работ</span>
    </HashLink>
  );
};
export default JuryCardBack;
