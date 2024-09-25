/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Winners.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import useIsYang from "@/hooks/isYang";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import WinnersRow from "./WinnersRow";
import { useGetWinnersQuery } from "@/store/rtk/jury/works_winners";
import { categories } from "../Pass/script";
import { checkArr } from "@/service/checkArr";

const Winners: FC = () => {
  const { isYang } = useIsYang();
  const { data, isSuccess } = useGetWinnersQuery({});

  const getWinnersList = () => {
    const category = isYang
      ? categories.young_talent
      : categories.main_category;

    return data.results.filter((el: any) => el.category === category);
  };

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
              {isSuccess && (
                <>
                  {checkArr(getWinnersList()) ? (
                    getWinnersList().map((item: any, i: number) => (
                      <WinnersRow key={i} item={item} />
                    ))
                  ) : (
                    <h3 className={clsx(style.empty)}>
                      В этой категории пока нет победителей
                    </h3>
                  )}
                </>
              )}
            </ul>
          </ScrollBarComponent>
        </div>
      </div>
    </section>
  );
};

export default Winners;
