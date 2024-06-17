import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconCome from "@/images/header/come.svg?react";
import { paths } from "@/service/paths";
import { Link } from "react-router-dom";

const ComeIn: FC = () => {
  return (
    <div className={clsx(style.comeIn_wrap)}>
      <Link to={paths.login} className={clsx(style.comeIn)}>
        <IconCome />
        <span>Войти</span>
      </Link>
    </div>
  );
};
export default ComeIn;
