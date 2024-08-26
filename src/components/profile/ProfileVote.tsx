/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import Button from "../modal/template/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { toZonedTime } from "date-fns-tz";
import { endOfDay, isAfter, parse } from "date-fns";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppSelector } from "@/hooks/hook";
import { useSettigsQuery } from "@/store/rtk/main/settings";

const ProfileVote: FC = () => {
  const navigate = useNavigate();
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const isTablet = useIsTabletDevice();
  const { data: data_settings } = useSettigsQuery(undefined);
  const { votes_amount, works_amount } = useAppSelector(
    (state) => state.user.dataMe,
  );

  useEffect(() => {
    getWorks({});
  }, [getWorks]);

  const handle = () => {
    const day = data_settings.voting_deadline;

    const toZoned = (date: Date) => {
      return toZonedTime(date, "Europe/Moscow");
    };
    const now = new Date();
    const date = parse(day, "yyyy-MM-dd", new Date());

    const deadline = isAfter(endOfDay(date), toZoned(now));

    const state: any = {
      page: deadline ? paths.jury_account_list : paths.jury_account_list_short,
    };

    let path = paths.jury_account_list;

    if (isTablet) {
      const firstWork = dataWorks.data?.results[0];
      path = `${paths.jury_account_card}/${firstWork?.id}`;
      state.id = firstWork?.id;
      state.number = 0;
      state.list = dataWorks.data.results.map((n: any) => n.id);
    }

    navigate(`/${path}`, { state });
  };

  return (
    <div className={clsx(style.application, style["application--vote"])}>
      <ProfileBoxHead isBtn={false} title="Голосование" />
      <div className={clsx(style.box, style["box--application"])}>
        <p className={clsx(style.application__empty)}>
          Вам осталось рассмотреть
          <span className={clsx(style.application__length)}>
            {works_amount - votes_amount}
          </span>
          из
          <span className={clsx(style.application__length)}>
            {works_amount}
          </span>
          работ.
        </p>

        <Button
          className={clsx(
            style.application__btn,
            style["application__btn--vote"],
          )}
          type="button"
          label={!isTablet ? "перейти в раздел голосования" : "голосование"}
          modifier="green"
          onClick={handle}
        />
      </div>
    </div>
  );
};
export default ProfileVote;
