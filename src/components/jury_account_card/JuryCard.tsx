import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./JuryCard.module.scss";
import JuryCardControl from "./JuryCardControl";
import JuryCardInfo from "./JuryCardInfo";
import IconMain from "@/images/header/logo.svg?react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useLocation, useParams } from "react-router-dom";
import { useLazyGetWorkJuryQuery } from "@/store/rtk/jury/work";
import JuryCardNav from "./JuryCardNav";

const JuryCard: FC = () => {
  // const [getListApp, { data, isSuccess }] = useLazyGetListQuery();
  const isTablet = useIsTabletDevice();
  const location = useLocation();
  const { id_card } = useParams();
  const id = location.state?.id ?? id_card;
  const [getWork, { data, isSuccess }] = useLazyGetWorkJuryQuery();

  useEffect(() => {
    if (!id) return;
    getWork({ id });
  }, [getWork, id]);

  if (!isSuccess) return null;

  return (
    <div className={clsx(style.card)}>
      {isTablet && <JuryCardNav is_reviewed={data.is_reviewed} />}

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
