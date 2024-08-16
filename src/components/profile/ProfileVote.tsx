/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import Button from "../modal/template/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { checkArr } from "@/service/checkArr";
import { useIntermediateStageQuery } from "@/store/rtk/stage/intermediateStage";
import { toZonedTime } from "date-fns-tz";
import { endOfDay, isAfter, parse } from "date-fns";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const ProfileVote: FC = () => {
  const navigate = useNavigate();
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const { data } = useIntermediateStageQuery({});
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    getWorks({});
  }, [getWorks]);

  const handle = () => {
    const day = data.results.filter((el: any) => el.title === "Победители")[0]
      .stage_end_at;
    // const day = "2022-09-20";
    const toZoned = (date: Date) => {
      return toZonedTime(date, "Europe/Moscow");
    };
    const now = new Date();
    const date = parse(day, "yyyy-MM-dd", new Date());
    // console.log("now: " + toZoned(now));

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

  const getLengthWorks = () => {
    return dataWorks.data?.results.length;
  };

  const getLengthIsReviewed = () => {
    return dataWorks.data?.results.filter((el: any) => !el.is_reviewed).length;
  };

  return (
    <div className={clsx(style.application, style["application--vote"])}>
      <ProfileBoxHead isBtn={false} title="Голосование" />
      <div className={clsx(style.box, style["box--application"])}>
        {dataWorks.isSuccess && checkArr(dataWorks.data.results) && (
          <p className={clsx(style.application__empty)}>
            Вам осталось рассмотреть
            <span className={clsx(style.application__length)}>
              {getLengthIsReviewed()}
            </span>
            из
            <span className={clsx(style.application__length)}>
              {getLengthWorks()}
            </span>
            работ.
          </p>
        )}

        <Button
          className={clsx(
            style.application__btn,
            style["application__btn--vote"],
          )}
          type="button"
          label="перейти в раздел голосования"
          modifier="green"
          onClick={handle}
        />
      </div>
    </div>
  );
};
export default ProfileVote;
