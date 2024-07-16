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
  const { defaultList, paidList } = useFilterList();
  const { isIndividual } = useProfile();

  return (
    <div className={clsx(style.application)}>
      <ProfileBoxHead isBtn={false} title={"Мои заявки"} />
      <div className={clsx(style.box, style["box--application"])}>
        {/* {!checkArr(defaultList) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет заявок!
          </p>
        )} */}

        {!isIndividual && !checkArr(defaultList) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет заявок!
          </p>
        )}
        {isIndividual && !checkArr(paidList) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет заявок!
          </p>
        )}

        <HashLink
          smooth
          className={clsx(style.application__btn)}
          to={`/${paths.pass}`}
        >
          Подать работу
        </HashLink>

        {!isIndividual &&
          checkArr(defaultList) &&
          defaultList.map((item: any, i: number) => (
            <ProfileApplicationList key={i} results={item} />
          ))}

        {isIndividual &&
          checkArr(paidList) &&
          paidList.map((item: any, i: number) => (
            <ProfileApplicationList key={i} results={item} />
          ))}
      </div>

      {!isIndividual && checkArr(defaultList) && <Refusal />}
      {isIndividual && checkArr(paidList) && <Refusal />}
    </div>
  );
};
export default ProfileApplication;
