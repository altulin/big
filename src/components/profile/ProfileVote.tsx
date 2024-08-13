import { FC } from "react";
import ProfileBoxHead from "./ProfileBoxHead";
import clsx from "clsx";
import style from "./Profile.module.scss";
import Button from "../modal/template/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";

const ProfileVote: FC = () => {
  const navigate = useNavigate();

  const handle = () => {
    navigate(`/${paths.jury_account_list}`);
  };

  return (
    <div className={clsx(style.application, style["application--vote"])}>
      <ProfileBoxHead isBtn={false} title="Голосование" />
      <div className={clsx(style.box, style["box--application"])}>
        <p className={clsx(style.application__empty)}>
          Вам осталось рассмотреть 1500 из 1500 работ.
        </p>
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
