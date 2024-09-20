import clsx from "clsx";
import style from "./Shortlist.module.scss";
import { FC, useEffect } from "react";
import useIsYang from "@/hooks/isYang";
import { paths } from "@/service/paths";
import ShortSelect from "./select/ShortSelect";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import ShortRow from "./ShortRow";
import { content_head } from "./data";
import { useLazyGetWorksShortListQuery } from "@/store/rtk/jury/works_short_list";
import { useAppSelector } from "@/hooks/hook";
import { useNominationsShortQuery } from "@/store/rtk/nominations/nominations_short";
// import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Shortlist: FC = () => {
  const { isYang } = useIsYang();
  const [getWorksShortList, { data, isSuccess }] =
    useLazyGetWorksShortListQuery();
  // const [getWorks, { status, data, isSuccess }] = useGetWorksMutation();
  const { nomination } = useAppSelector((state) => state.short);
  const { data: dataNominations, isSuccess: isSuccessNominations } =
    useNominationsShortQuery({
      limit: 100,
      offset: 0,
    });

  useEffect(() => {
    getWorksShortList({ category: "", nomination });
  }, [getWorksShortList, nomination]);

  return (
    <section
      id={isYang ? paths.shortlist_young : paths.shortlist}
      className={clsx(style.shortlist, "panel")}
    >
      <div className={clsx(style.shortlist__inner)}>
        <div className={clsx(style.shortlist__header)}>
          <h2 className={clsx(style.shortlist__title)}>шорт-лист</h2>
          <ShortSelect />
        </div>

        <div className={clsx(style.content)}>
          <ScrollBarComponent>
            <ul className={clsx(style.content__list)}>
              <ShortRow {...content_head} isHead={true} />
              {isSuccess &&
                isSuccessNominations &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.results.map((el: any, i: number) => (
                  <ShortRow
                    key={i}
                    nomination={
                      dataNominations.filter(
                        (m) => m.value === el.nomination,
                      )[0].label
                    }
                    name_work={el.title}
                    author={el.author || el.company}
                    id={el.id}
                  />
                ))}
            </ul>
          </ScrollBarComponent>
        </div>
      </div>
    </section>
  );
};

export default Shortlist;
