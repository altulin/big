import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import JuryCardControl from "./JuryCardControl";
import JuryCardInfo from "./JuryCardInfo";
import { useLazyGetListQuery } from "@/store/rtk/orders/list";
import IconMain from "@/images/header/logo.svg?react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const JuryCard: FC = () => {
  const [getListApp, { data, isSuccess }] = useLazyGetListQuery();
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    getListApp({});
  }, [getListApp]);

  if (!isSuccess) return null;

  return (
    <div className={clsx(style.card)}>
      <JuryCardControl el_info={data.results[0].works[0]} />

      <JuryCardInfo el_info={data.results[0].works[0]} />

      {isTablet && (
        <figure className={clsx(style.card__icon)}>
          <IconMain />
        </figure>
      )}
    </div>
  );
};

export default JuryCard;
