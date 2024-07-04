import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const Registration: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link className={clsx(style.event, className)} to={paths.registration}>
      Регистрация на мероприятие
    </Link>
  );
};
export default Registration;
