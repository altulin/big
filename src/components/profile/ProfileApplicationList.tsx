/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import IconAwaiting from "@/images/profile/awaiting.svg?react";
import IconPaid from "@/images/profile/paid.svg?react";
import IconPaymentError from "@/images/profile/payment_error.svg?react";
import ProfileApplicationItem from "./ProfileApplicationItem";
import { statuses } from "./service";
// import { IProfileApplicationItem } from "./ProfileApplicationItem";

const ProfileApplicationList: FC<{ results: any }> = ({ results }) => {
  const { status, works } = results;
  const [isVisible, setIsVisible] = useState(false);

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
        <span>01.08.2024</span>
      </h3>

      {isVisible &&
        works &&
        works.map((item: any, i: number) => (
          <ProfileApplicationItem key={i} {...item} num={i} />
        ))}

      <button onClick={toggleVisible} className={clsx(style.visible)}>
        {isVisible ? "Свернуть" : "Показать больше"}
      </button>
    </div>
  );
};
export default ProfileApplicationList;
