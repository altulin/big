import clsx from "clsx";
import style from "./Steps.module.scss";
import { FC } from "react";
import StepContentDesk from "./StepContentDesk";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import StepContentMob from "./StepContentMob";
import { paths } from "@/service/paths";
//

const Steps: FC = () => {
  const isTablet = useIsTabletDevice();

  return (
    <section id={paths.steps} className={clsx(style.steps, "panel")}>
      <div className={clsx(style.steps__inner)}>
        <h2 className={clsx(style.title)}>
          <span className={clsx(style.title__text)}>
            Этапы конкурса и&nbsp;подачи работ
          </span>
        </h2>
        {!isTablet ? <StepContentDesk /> : <StepContentMob />}
      </div>
    </section>
  );
};

export default Steps;
