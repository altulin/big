import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./Header.module.scss";

const Profile: FC<{ className?: string }> = ({ className }) => {
  return (
    <HashLink
      className={clsx(style.profile, className)}
      smooth
      to={paths.profile}
    >
      <span className={clsx(style.profile__icon)}></span>
      <span className={clsx(style.profile__name)}>Петр</span>
    </HashLink>
  );
};
export default Profile;
