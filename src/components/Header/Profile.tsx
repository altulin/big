import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./Header.module.scss";
import { useAppSelector } from "@/hooks/hook";

const Profile: FC<{ className?: string }> = ({ className }) => {
  const { name } = useAppSelector((state) => state.user.dataMe);

  if (!name) return null;

  return (
    <HashLink
      className={clsx(style.profile, className)}
      smooth
      to={paths.profile}
    >
      <span className={clsx(style.profile__icon)}></span>
      <span className={clsx(style.profile__name)}>{name}</span>
    </HashLink>
  );
};
export default Profile;
