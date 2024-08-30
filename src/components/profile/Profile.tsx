import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";
import ProfilePersonalForm from "./ProfilePersonalForm";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import ProfileApplication from "./ProfileApplication";
import useProfile from "@/hooks/profile";
import ProfileCompany from "./ProfileCompany";
import ProfileDraft from "./ProfileDraft";
import ProfileApplicationTicketsList from "./ProfileApplicationTicketsList";
import ProfileVote from "./ProfileVote";
import { useAppSelector } from "@/hooks/hook";

const Profile: FC = () => {
  const { isIndividual } = useProfile();
  const { is_jury } = useAppSelector((state) => state.user.dataMe);

  return (
    <div className={clsx(style.profile)}>
      <ScrollBarComponent>
        <div className={clsx(style.profile__inner, "scroll-content")}>
          <ProfilePersonalForm />
          {!isIndividual && <ProfileCompany />}
          {is_jury && <ProfileVote />}
          <ProfileApplication />
          {isIndividual && <ProfileDraft />}
          <ProfileApplicationTicketsList />
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Profile;
