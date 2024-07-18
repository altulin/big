import IconAwaiting from "@/images/profile/awaiting.svg?react";
import IconPaid from "@/images/profile/paid.svg?react";
import clsx from "clsx";
import style from "./Profile.module.scss";
// import IconPaymentError from "@/images/profile/payment_error.svg?react";
import { FC } from "react";
import { statuses } from "./service";

const Awaiting: FC = () => {
  return (
    <div className={clsx(style.status, style["status--created"])}>
      <IconAwaiting />
      <span>ожидает оплаты</span>
    </div>
  );
};

const Paid: FC = () => {
  return (
    <div className={clsx(style.status, style["status--paid"])}>
      <IconPaid />
      <span>оплачено</span>
    </div>
  );
};

//  const PaymentError: FC = () => {
//   return (
//     <>
//       <IconPaymentError />
//       <span>не оплачено</span>
//     </>
//   );
// };

const Accepted: FC = () => {
  return (
    <div className={clsx(style.status, style["status--accepted"])}>
      <IconPaid />
      <span>принято</span>
    </div>
  );
};

const StatusComponents: FC<{ status: string; cost: number }> = ({
  status,
  cost,
}) => {
  const getStatus = () => {
    if (cost === 0) {
      return <Accepted />;
    }

    if (status === statuses.paid) {
      return <Paid />;
    }

    if (status === statuses.payment_error) {
      return <Awaiting />;
    }

    if (cost > 0 && status === statuses.created) {
      return <Awaiting />;
    }

    return null;
  };

  return <>{getStatus()}</>;
};
export default StatusComponents;
