import clsx from "clsx";
import { FC } from "react";
import style from "./JuryCard.module.scss";
// import { useLocation } from "react-router-dom";
import JuryCardBack from "./JuryCardBack";
import IconPlayLink from "@/images/jury_account/control_link.svg?react";
import JuryCardForm from "./JuryCardForm";
import JuryCardNav from "./JuryCardNav";
// import { useLazyGetWorkQuery } from "@/store/rtk/orders/get_work";

const JuryCardControl: FC = () => {
  // const location = useLocation();
  // const [getWork, { data }] = useLazyGetWorkQuery();

  // useEffect(() => {
  // getWork({ id_work: location.state.id });
  // getWork({ id_work: location.state.id });
  // }, [getWork, location]);

  return (
    <div className={clsx(style.control)}>
      <JuryCardBack />

      <a href="#" className={clsx(style.control_link)}>
        <span className={clsx(style.control_link__icon)}>
          <IconPlayLink />
        </span>
        <span className={clsx(style.control_link__content)}>
          <span className={clsx(style.control_link__label)}>
            https://www.youtube.com/?app=desktop&hl=RU
          </span>
        </span>
      </a>

      <JuryCardForm />

      <JuryCardNav />
    </div>
  );
};
export default JuryCardControl;
