import { paths } from "@/service/paths";
import clsx from "clsx";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import style from "./Header.module.scss";

const Profile: FC = () => {
  const statusUser = "individual";
  return (
    <HashLink
      className={clsx(style.profile)}
      smooth
      to={
        statusUser === "individual"
          ? paths.profile_individual
          : paths.profile_entity
      }
    >
      <span className={clsx(style.profile__icon)}></span>
      <span className={clsx(style.profile__name)}>Петр</span>
    </HashLink>
  );
};
export default Profile;
