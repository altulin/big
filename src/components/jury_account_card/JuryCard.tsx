import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import JuryCardControl from "./JuryCardControl";
import JuryCardInfo from "./JuryCardInfo";
import IconMain from "@/images/header/logo.svg?react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useLocation } from "react-router-dom";
import { useLazyGetWorkJuryQuery } from "@/store/rtk/jury/work";
import JuryCardNav from "./JuryCardNav";

const JuryCard: FC = () => {
  // const [getListApp, { data, isSuccess }] = useLazyGetListQuery();
  const isTablet = useIsTabletDevice();
  const location = useLocation();
  const [getWork, { data, isSuccess }] = useLazyGetWorkJuryQuery();

  useEffect(() => {
    if (!isSuccess) return;
    console.log(data);
  }, [data, isSuccess]);

  useEffect(() => {
    getWork({ id: location.state.id });
  }, [getWork, location.state.id]);

  if (!isSuccess) return null;

  return (
    <div className={clsx(style.card)}>
      {isTablet && <JuryCardNav />}

      <JuryCardControl el_info={data} />
      <JuryCardInfo el_info={data} />
      {isTablet && (
        <figure className={clsx(style.card__icon)}>
          <IconMain />
        </figure>
      )}
    </div>
  );
};

export default JuryCard;
