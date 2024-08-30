/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import Button from "../modal/template/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppSelector } from "@/hooks/hook";
import { useCheckDeadline } from "../jury_account_list/service";

const ProfileVote: FC = () => {
  const navigate = useNavigate();
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const isTablet = useIsTabletDevice();
  const { votes_amount, works_amount } = useAppSelector(
    (state) => state.user.dataMe,
  );
  const { isShort } = useCheckDeadline();

  useEffect(() => {
    if (isShort) {
      getWorks({ is_short_list: true });
      return;
    }

    getWorks({});
  }, [getWorks, isShort]);

  const handle = () => {
    const state: any = {
      page: isShort ? paths.jury_account_list_short : paths.jury_account_list,
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
