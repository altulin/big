import clsx from "clsx";
import style from "./JuryMain.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import ContentDesk from "./Content";

const JuryMain: FC = () => {
  return (
    <section id={paths.jury_main} className={clsx(style.juryMain, "panel")}>
      <div className={clsx(style.juryMain__inner)}>
        <ContentDesk />
      </div>
    </section>
  );
};

export default JuryMain;
