import clsx from "clsx";
import { FC } from "react";
import style from "./JuryAccount.module.scss";
import IconAccept from "@/images/jury_account/status.svg?react";

const getIcon = (status: string) => {
  switch (status) {
    case "рассмотрено":
      return <IconAccept />;

    default:
      return null;
  }
};

const JuryAccountListRowStatus: FC<{ status: string }> = ({ status }) => {
  if (!status) return null;

  return (
    <p className={clsx(style.status)}>
      <span className={clsx(style.status__text)}>рассмотрено</span>
      {getIcon(status) !== null && (
        <span className={clsx(style.status__icon)}>{getIcon(status)}</span>
      )}
    </p>
  );
};
export default JuryAccountListRowStatus;
