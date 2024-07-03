import { FC } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import { HashLink } from "react-router-hash-link";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { setPath } from "@/store/menu/menuSlice";
import { list } from "./script";
import ProfileApplicationItem from "./ProfileApplicationItem";

const ProfileApplication: FC = () => {
  const dispatch = useAppDispatch();
  const application = true;

  const handleRefusal = () => {
    dispatch(setPath(paths.contacts));
  };

  return (
    <div className={clsx(style.application)}>
      <ProfileBoxHead isBtn={false} title={"Мои заявки"} />
      <div className={clsx(style.box, style["box--application"])}>
        {!application && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет заявок!
          </p>
        )}

        {list.map((item, i) => (
          <ProfileApplicationItem key={i} {...item} />
        ))}

        <button className={clsx(style.application__btn)}>Подать работу</button>
      </div>

      {application && (
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
      )}
    </div>
  );
};
export default ProfileApplication;
