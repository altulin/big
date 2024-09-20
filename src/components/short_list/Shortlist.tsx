import clsx from "clsx";
import style from "./Shortlist.module.scss";
import { FC } from "react";
import useIsYang from "@/hooks/isYang";
import { paths } from "@/service/paths";
import ShortSelect from "./select/ShortSelect";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import ShortRow from "./ShortRow";
import { content_head } from "./data";
import { useGetWorksShortListQuery } from "@/store/rtk/jury/works_short_list";
import { useAppSelector } from "@/hooks/hook";
import { useNominationsShortQuery } from "@/store/rtk/nominations/nominations_short";
import { categories } from "../Pass/script";

type TResponse = {
  id: number | undefined;
  title: string;
  category: string;
  nomination: string | number;
  author: null | string;
  company: string;
};

const Shortlist: FC = () => {
  const { isYang } = useIsYang();
  const { nomination } = useAppSelector((state) => state.short);
  const { data, isSuccess } = useGetWorksShortListQuery({
    category: isYang ? categories.young_talent : categories.main_category,
    nomination,
  });

  const { data: dataNominations, isSuccess: isSuccessNominations } =
    useNominationsShortQuery({
      limit: 100,
      offset: 0,
    });

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
                data.results.map((el: TResponse, i: number) => (
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
