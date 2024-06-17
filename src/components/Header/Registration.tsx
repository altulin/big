import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";

const Registration: FC = () => {
  return (
    <a className={clsx(style.event)} href={paths.reg_event}>
      Регистрация на мероприятие
    </a>
  );
};
export default Registration;
