import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./Header.module.scss";
import { useAppSelector } from "@/hooks/hook";
import useDeadline from "@/hooks/deadline";

const Profile: FC<{ className?: string }> = ({ className }) => {
  const { name } = useAppSelector((state) => state.user.dataMe);
  const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);

  if (!name) return null;

  return (
    <HashLink
      className={clsx(
        style.profile,
        className,
        !isDeadline && style["profile--deadline"],
      )}
      smooth
      to={`/${paths.profile}`}
    >
      <span className={clsx(style.profile__icon)}></span>
      <span className={clsx(style.profile__name)}>Профиль</span>
    </HashLink>
  );
};
export default Profile;
