import clsx from "clsx";
import style from "./Criteria.module.scss";
import { FC } from "react";
import ContentDesk from "./ContentDesk";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ContentMob from "./ContentMob";
import { paths } from "@/service/paths";

const Criteria: FC = () => {
  const isTablet = useIsTabletDevice();
  return (
    <section id={paths.criteria} className={clsx(style.criteria, "panel")}>
      <div className={clsx(style.criteria__inner)}>
        <div className={clsx(style.present)}>
          <h2 className={clsx(style.title)}>
            <span>критерии</span>
            <span>оценки</span>
            <span>работ</span>
          </h2>
        </div>

        <div className={clsx(style.content)}>
          <div className={clsx(style.rules)}>
            {isTablet ? <ContentMob /> : <ContentDesk />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Criteria;
