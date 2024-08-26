/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import JuryCardBack from "./JuryCardBack";
import IconPlayLink from "@/images/jury_account/control_link.svg?react";
import JuryCardForm from "./JuryCardForm";
import JuryCardNav from "./JuryCardNav";
import JuryCardHead from "./uryCardHead";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useCheckDeadline } from "../jury_account_list/service";

const JuryCardControl: FC<{ el_info: any }> = ({ el_info }) => {
  const isTablet = useIsTabletDevice();
  const { isShort } = useCheckDeadline();

  return (
    <div className={clsx(style.control, isShort && style["control--short"])}>
      <JuryCardBack />

      <a
        href={el_info.work_link}
        className={clsx(
          style.control_link,
          isShort && style["control_link--short"],
        )}
        target="_blank"
      >
        <span className={clsx(style.control_link__icon)}>
          <IconPlayLink />
        </span>
        <span className={clsx(style.control_link__content)}>
          <span className={clsx(style.control_link__label)}>
            {el_info.work_link}
          </span>
        </span>
      </a>

      {!isShort && (
        <JuryCardForm id_work={el_info.id} is_reviewed={el_info.is_reviewed} />
      )}

      {!isTablet && <JuryCardNav />}

      {isTablet && <JuryCardHead title={el_info.title} />}
    </div>
  );
};
export default JuryCardControl;
