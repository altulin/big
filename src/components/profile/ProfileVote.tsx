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

const ProfileVote: FC = () => {
  const navigate = useNavigate();
  const [getWorks, dataWorks] = useLazyGetWorksQuery();

  useEffect(() => {
    getWorks({});
  }, [getWorks]);

  const handle = () => {
    navigate(`/${paths.jury_account_list}`);
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
