/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import IconAwaiting from "@/images/profile/awaiting.svg?react";
import IconPaid from "@/images/profile/paid.svg?react";
import IconPaymentError from "@/images/profile/payment_error.svg?react";
import ProfileApplicationItem from "./ProfileApplicationItem";
import { statuses } from "./service";
import Button from "../modal/template/Button";
import useWidget from "../Pass/widget";
import { format } from "date-fns";

const ProfileApplicationList: FC<{ results: any; isDraft?: boolean }> = ({
  results,
  isDraft,
}) => {
  const { status, works } = results;
  const [isVisible, setIsVisible] = useState(false);
  const { runWidget } = useWidget();

  const handlePay = () => {
    const {
      transaction: {
        amount,
        user: { id, email },
        idempotence_key,
      },
    } = results;

    const invoiceId = results.id;
    runWidget({ amount, accountId: id, invoiceId, email, idempotence_key });
  };

  const Awaiting: FC = () => {
    return (
      <>
        <IconAwaiting />
        <span>ожидает оплаты</span>
      </>
    );
  };

  const Paid: FC = () => {
    return (
      <>
        <IconPaid />
        <span>оплачено</span>
      </>
    );
  };

  const PaymentError: FC = () => {
    return (
      <>
        <IconPaymentError />
        <span>не оплачено</span>
      </>
    );
  };

  const checkCategory = (name: string) => {
    switch (name) {
      case statuses.created:
        return <Awaiting />;

      case statuses.paid:
        return <Paid />;

      case statuses.payment_error:
        return <PaymentError />;

      default:
        return;
    }
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={clsx(style.list)}>
      <div className={clsx(style.status, style[`status--${status}`])}>
        {checkCategory(status)}
      </div>

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
