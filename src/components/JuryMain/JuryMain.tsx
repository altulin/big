import clsx from "clsx";
import style from "./JuryMain.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import ContentDesk from "./Content";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ContentMob from "./ContentMob";

const JuryMain: FC = () => {
  const isTablet = useIsTabletDevice();
  return (
    <section
      id={paths.jury_main}
      className={clsx(style.juryMain, "panel", "jury_main")}
    >
      <div className={clsx(style.juryMain__inner)}>
        {isTablet ? <ContentMob /> : <ContentDesk />}
      </div>
    </section>
  );
};

export default JuryMain;
