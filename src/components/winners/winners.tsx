import clsx from "clsx";
import style from "./Winners.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import useIsYang from "@/hooks/isYang";

const Winners: FC = () => {
  const { isYang } = useIsYang();
  return (
    <section
      id={isYang ? paths.winners_young : paths.winners}
      className={clsx(style.winners, "panel")}
    >
      <div className={clsx(style.winners__inner)}>Winners Component</div>
    </section>
  );
};

export default Winners;
