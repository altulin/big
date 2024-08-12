/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import useFilterList from "./filter";
import { checkArr } from "@/service/checkArr";
import ProfileApplicationList from "./ProfileApplicationList";

const ProfileDraft: FC = () => {
  const { my_drafts } = useFilterList();

  console.log(my_drafts);

  if (!checkArr(my_drafts)) return null;

  return (
    <div className={clsx(style.application)}>
      <ProfileBoxHead
        isBtn={false}
        title={`Мои черновики (${my_drafts.length})`}
      />
      <div className={clsx(style.box, style["box--application"])}>
        {my_drafts.map((item: any, i: number) => (
          <ProfileApplicationList key={i} results={item} isDraft={true} />
        ))}
      </div>
    </div>
  );
};
export default ProfileDraft;
