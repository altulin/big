import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";

const SubmitJob: FC = () => {
  const isAuth = useIsAuth();
  return (
    <a
      className={clsx(style.job, isAuth && style.job__auth)}
      href={paths.submit_job}
    >
      Подать работу
    </a>
  );
};
export default SubmitJob;
