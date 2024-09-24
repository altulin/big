import { FC } from "react";
import ComeIn from "./ComeIn";
import clsx from "clsx";
import style from "./Header.module.scss";
import useIsAuth from "@/hooks/isAuth";
import Exit from "./Exit";
import Profile from "./Profile";
import Registration from "./Registration";

const Submit: FC = () => {
  const isAuth = useIsAuth();

  return (
    <div className={clsx(style.submit)}>
      {/* <SubmitJob /> */}
      <Registration />

      {!isAuth && <ComeIn />}
      {isAuth && <Profile />}
      {isAuth && <Exit />}
    </div>
  );
};
export default Submit;
