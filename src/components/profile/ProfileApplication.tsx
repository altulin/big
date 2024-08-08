/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import { HashLink } from "react-router-hash-link";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { setPath } from "@/store/menu/menuSlice";
import { checkArr } from "@/service/checkArr";
import ProfileApplicationList from "./ProfileApplicationList";
import useFilterList from "./filter";
import useProfile from "@/hooks/profile";
import useDeadline from "@/hooks/deadline";

const Refusal: FC = () => {
  const dispatch = useAppDispatch();
  const handleRefusal = () => {
    dispatch(setPath(paths.contacts));
  };
  return (
    <div className={clsx(style.refusal)}>
      <span>Если вы передумали подавать уже оплаченную работу, </span>

      <HashLink
        className={clsx(style.refusal__btn)}
        to={"/"}
        onClick={handleRefusal}
      >
        свяжитесь с нами!
      </HashLink>
    </div>
  );
};

const ProfileApplication: FC = () => {
  const { my_applications, my_drafts } = useFilterList();
  const { isIndividual } = useProfile();
  const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);

  return (
    <div className={clsx(style.application)}>
      <ProfileBoxHead isBtn={false} title={"Мои заявки"} />
      <div className={clsx(style.box, style["box--application"])}>
        {!checkArr(my_applications) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет оплаченных или принятых заявок!
          </p>
        )}

        {isDeadline && (
          <HashLink
            smooth
            className={clsx(style.application__btn)}
            to={`/${paths.pass}`}
          >
            Подать работу
          </HashLink>
        )}

        {checkArr(my_applications) &&
          my_applications.map((item: any, i: number) => (
            <ProfileApplicationList key={i} results={item} />
          ))}
      </div>

      {!isIndividual && checkArr(my_applications) && <Refusal />}
      {isIndividual && checkArr(my_drafts) && <Refusal />}
    </div>
  );
};
export default ProfileApplication;
