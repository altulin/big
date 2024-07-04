import { FC } from "react";
import SubmitJob from "./SubmitJob";
import ComeIn from "./ComeIn";
import clsx from "clsx";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";
import Exit from "./Exit";
import Profile from "./Profile";

const Submit: FC = () => {
  const isAuth = useIsAuth();

  return (
    <div className={clsx(style.submit)}>
      <SubmitJob />

      {!isAuth && <ComeIn />}
      {isAuth && <Profile />}
      {isAuth && <Exit />}
    </div>
  );
};
export default Submit;
