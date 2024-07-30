/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";

import ProfileApplicationItem from "./ProfileApplicationItem";
import Button from "../modal/template/Button";
import useWidget from "../Pass/widget";
import { format } from "date-fns";
import StatusComponents from "./StatusComponent";

const ProfileApplicationList: FC<{ results: any; isDraft?: boolean }> = ({
  results,
  isDraft,
}) => {
  const { status, works, cost } = results;
  const [isVisible, setIsVisible] = useState(false);
  const { runWidget } = useWidget();

  // console.log(results);

  const handlePay = () => {
    // const {
    //   transaction: {
    //     amount,
    //     user: { id, email },
    //     idempotence_key,
    //   },
    // } = results;

    // const invoiceId = results.id;
    runWidget(results);
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={clsx(style.list)}>
      <StatusComponents status={status} cost={cost} />

      <h3 className={clsx(style.list__title)}>
        <span>Заявка от</span>
        <span>{format(results.created_at, "dd.MM.yyyy")}</span>
      </h3>

      {isVisible &&
        works &&
        works.map((item: any, i: number) => (
          <ProfileApplicationItem isDraft={isDraft} key={i} {...item} num={i} />
        ))}

      <button onClick={toggleVisible} className={clsx(style.visible)}>
        {isVisible ? "Свернуть" : "Показать больше"}
      </button>

      {isVisible && isDraft && (
        <Button
          className={clsx(style.pay)}
          type="button"
          label="Оплатить"
          modifier="green"
          onClick={handlePay}
        />
      )}
    </div>
  );
};
export default ProfileApplicationList;
