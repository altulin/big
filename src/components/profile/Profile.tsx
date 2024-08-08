import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";
import ProfilePersonalForm from "./ProfilePersonalForm";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import ProfileApplication from "./ProfileApplication";
import useProfile from "@/hooks/profile";
import ProfileCompany from "./ProfileCompany";
import ProfileDraft from "./ProfileDraft";
import ProfileApplicationTicket from "./ProfileApplicationTicket";

const Profile: FC = () => {
  const { isIndividual } = useProfile();
  return (
    <div className={clsx(style.profile)}>
      <ScrollBarComponent>
        <div className={clsx(style.profile__inner, "scroll-content")}>
          <ProfilePersonalForm />
          {!isIndividual && <ProfileCompany />}
          <ProfileApplication />
          {isIndividual && <ProfileDraft />}
          <ProfileApplicationTicket />
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Profile;
