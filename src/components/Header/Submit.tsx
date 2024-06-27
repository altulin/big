import { FC } from "react";
import SubmitJob from "./SubmitJob";
import ComeIn from "./ComeIn";
import clsx from "clsx";
import style from "./Header.module.scss";

const Submit: FC = () => {
  return (
    <div className={clsx(style.submit)}>
      <SubmitJob />
      <ComeIn />
    </div>
  );
};
export default Submit;
