import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import JuryCardControl from "./JuryCardControl";

const JuryCard: FC = () => {
  return (
    <div className={clsx(style.card)}>
      <JuryCardControl />
    </div>
  );
};
export default JuryCard;
