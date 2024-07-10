/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import { HashLink } from "react-router-hash-link";
import { useAppDispatch } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { setPath } from "@/store/menu/menuSlice";
import { list } from "./script";
import ProfileApplicationItem from "./ProfileApplicationItem";
import { useLazyGetListQuery } from "@/store/rtk/orders/list";
import { checkArr } from "@/service/checkArr";

const ProfileApplication: FC = () => {
  const dispatch = useAppDispatch();
  const application = true;
  const [getListApp, { data }] = useLazyGetListQuery();

  const handleRefusal = () => {
    dispatch(setPath(paths.contacts));
  };

  useEffect(() => {
    getListApp({ limit: 100, offset: 0 });
  }, [getListApp]);

  return (
    <div className={clsx(style.application)}>
      <ProfileBoxHead isBtn={false} title={"Мои заявки"} />
      <div className={clsx(style.box, style["box--application"])}>
        {!checkArr(data?.results) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет заявок!
          </p>
        )}

        {checkArr(data?.results) &&
          data?.results.map((item: any, i: number) => (
            <ProfileApplicationItem key={i} {...item} />
          ))}

        <HashLink
          smooth
          className={clsx(style.application__btn)}
          to={`/${paths.pass}`}
        >
          Подать работу
        </HashLink>
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
