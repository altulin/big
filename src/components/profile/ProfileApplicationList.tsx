/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";

import ProfileApplicationItem from "./ProfileApplicationItem";
import Button from "../modal/template/Button";
import useWidget from "../Pass/widget";
import { format } from "date-fns";
import StatusComponents from "./StatusComponent";
import ProfileApplicationItemTicket from "./ProfileApplicationItemTicket";
import { categories } from "../Pass/script";

const ProfileApplicationList: FC<{
  results: any;
  isDraft?: boolean;
}> = ({ results, isDraft }) => {
  const { status, works, cost, category, works_cost } = results;
  const [isVisible, setIsVisible] = useState(false);
  const { runWidget } = useWidget();

  const handlePay = () => {
    runWidget(results);
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const isPay = () => {
    if (results.category === categories.brand_pitches) {
      if (results.tickets_amount > 0) {
        return true;
      }
    } else if (results.category === categories.only_tickets) {
      if (results.tickets_amount > 0) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <div className={clsx(style.list)}>
      <StatusComponents status={status} cost={cost} />

      <h3 className={clsx(style.list__title)}>
        <span>{category === "only_tickets" ? "Билеты от" : "Заявка от"}</span>
        <span>{format(results.created_at, "dd.MM.yyyy")}</span>
      </h3>

      {isVisible &&
        works &&
        works.map((item: any, i: number) => (
          <ProfileApplicationItem
            isDraft={isDraft}
            key={i}
            {...item}
            num={i}
            works_cost={works_cost}
          />
        ))}

      {isVisible && isDraft && (
        <ProfileApplicationItemTicket
          tickets_cost={results.tickets_cost}
          tickets_amount={results.tickets_amount}
        />
      )}

      <button onClick={toggleVisible} className={clsx(style.visible)}>
        {isVisible ? "Свернуть" : "Показать больше"}
      </button>
      {/* временно */}
      {/* {isVisible && isDraft && isPay() && (
        <Button
          className={clsx(style.pay)}
          type="button"
          label="Оплатить"
          modifier="green"
          onClick={handlePay}
        />
      )} */}
      {/* убрать */}
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
