/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import { HashLink } from "react-router-hash-link";
import { paths } from "@/service/paths";
import { checkArr } from "@/service/checkArr";
import ProfileApplicationList from "./ProfileApplicationList";
import { useLazyGetTicketsQuery } from "@/store/rtk/orders/tickets";

const ProfileApplicationTicketsList: FC = () => {
  const test: Array<any> = [];
  const [getTickets, { data, status }] = useLazyGetTicketsQuery();

  useEffect(() => {
    getTickets({ limit: 100, offset: 0 });
  }, [getTickets]);

  return (
    <div className={clsx(style.application, style["application--ticket"])}>
      <ProfileBoxHead isBtn={false} title={"Мои билеты"} />
      <div className={clsx(style.box, style["box--application"])}>
        {!checkArr(test) && (
          <p className={clsx(style.application__empty)}>
            У вас еще нет билетов!
          </p>
        )}

        <HashLink
          smooth
          className={clsx(
            style.application__btn,
            style["application__btn--ticket"],
          )}
          to={`/${paths.ticket}`}
        >
          Купить билет
        </HashLink>

        {checkArr(test) &&
          test.map((item: any, i: number) => (
            <ProfileApplicationList key={i} results={item} />
          ))}
      </div>
    </div>
  );
};
export default ProfileApplicationTicketsList;
