import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import JuryCardControl from "./JuryCardControl";
import JuryCardInfo from "./JuryCardInfo";
import { useLazyGetListQuery } from "@/store/rtk/orders/list";

const JuryCard: FC = () => {
  const [getListApp, { data, isSuccess }] = useLazyGetListQuery();

  useEffect(() => {
    getListApp({});
  }, [getListApp]);

  if (!isSuccess) return null;

  return (
    <div className={clsx(style.card)}>
      <JuryCardControl el_info={data.results[0].works[0]} />

      <JuryCardInfo el_info={data.results[0].works[0]} />
    </div>
  );
};

export default JuryCard;
