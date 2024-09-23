/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { FC, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import JuryAccountListRow from "./JuryAccountListRow";
import { paths } from "@/service/paths";
import clsx from "clsx";
import style from "./JuryAccount.module.scss";
import { categoriesLabel } from "../Pass/script";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import JuryAccountListRowStatus from "./JuryAccountListRowStatus";
import { getCategory, useCheckDeadline } from "./service";
import { useGetWorksShortListQuery } from "@/store/rtk/jury/works_short_list";

const JuryAccountListContent: FC<{ values: any; tabIndex?: number }> = ({
  values,
  tabIndex,
}) => {
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);
  const { isShort } = useCheckDeadline();
  const short_data = useGetWorksShortListQuery({
    category: getCategory(tabIndex!),
    nomination: values.nomination,
  });

  // useEffect(() => {
  //   console.log(values.nomination);
  // }, [values]);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  useEffect(() => {
    if (isShort === undefined) return;
    if (isShort) return;

    getWorks(values);
  }, [getWorks, isShort, values, tabIndex]);

  const getNominationTitle = (id: string) => {
    return data?.results.find((el: any) => el.id === id).title;
  };

  const itemsShort = (el: any, i: number) => {
    return {
      number: i + 1,
      title: el.title,
      category: null,
      nomination: getNominationTitle(el.nomination),
      status: null,
    };
  };

  const itemsSimple = (el: any) => {
    return {
      status: <JuryAccountListRowStatus status={el.is_reviewed} />,
      category: categoriesLabel[el.category as keyof typeof categoriesLabel],
    };
  };

  const getList = () => {
    if (isShort) {
      if (!short_data.isSuccess) return [];
      return short_data.data?.results;
    } else {
      if (!dataWorks.isSuccess) return [];
      return dataWorks.data?.results;
    }
  };

  return (
    <>
      {getList().map((el: any, i: number) => (
        <HashLink
          key={i}
          to={`/${paths.jury_account_card}/${el.id}`}
          className={clsx(style.list__link)}
          state={{
            page: isShort
              ? paths.jury_account_list_short
              : paths.jury_account_list,
            id: el.id,
            number: i,
            list: getList().map((n: any) => n.id),
            values,
          }}
        >
          <JuryAccountListRow
            items={
              isShort
                ? itemsShort(el, i)
                : { ...itemsShort(el, i), ...itemsSimple(el) }
            }
          />
        </HashLink>
      ))}
    </>
  );
};
export default JuryAccountListContent;
