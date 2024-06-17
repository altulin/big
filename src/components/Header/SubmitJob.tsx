import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";

const SubmitJob: FC = () => {
  return (
    <a className={clsx(style.job)} href={paths.submit_job}>
      Подать работу
    </a>
  );
};
export default SubmitJob;
