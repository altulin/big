/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Winners.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import useIsYang from "@/hooks/isYang";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import WinnersRow from "./WinnersRow";
import { useGetWinnersQuery } from "@/store/rtk/jury/works_winners";

const Winners: FC = () => {
  const { isYang } = useIsYang();
  const { data, isSuccess } = useGetWinnersQuery({});

  return (
    <section
      id={isYang ? paths.winners_young : paths.winners}
      className={clsx(style.winners, "panel")}
    >
      <div className={clsx(style.winners__inner)}>
        <div className={clsx(style.winners__header)}>
          <h2 className={clsx(style.winners__title)}>Победители</h2>
        </div>

        <div className={clsx(style.content)}>
          <ScrollBarComponent>
            <ul className={clsx(style.content__list)}>
              {isSuccess &&
                data.results.map((item: any, i: number) => (
                  <WinnersRow key={i} item={item} />
                ))}
            </ul>
          </ScrollBarComponent>
        </div>
      </div>
    </section>
  );
};

export default Winners;
