import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./Header.module.scss";
import { useAppDispatch } from "@/hooks/hook";
// import useDeadline from "@/hooks/deadline";
import { setMenuControl } from "@/store/menu/menuSlice";
import useDeadlineClose from "@/hooks/closeDeadline";

const Profile: FC<{ className?: string }> = ({ className }) => {
  // const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);
  const dispatch = useAppDispatch();
  const { isCloseBrand, isCloseTickets, isCloseMain, isCloseYoung } =
    useDeadlineClose();

  return (
    <HashLink
      className={clsx(
        style.profile,
        className,
        isCloseBrand &&
          isCloseMain &&
          isCloseYoung &&
          isCloseTickets &&
          style["profile--deadline"],
      )}
      smooth
      to={`/${paths.profile}`}
      onClick={() => {
        dispatch(setMenuControl(false));
      }}
    >
      <span className={clsx(style.profile__icon)}></span>
      <span className={clsx(style.profile__name)}>Профиль</span>
    </HashLink>
  );
};
export default Profile;
