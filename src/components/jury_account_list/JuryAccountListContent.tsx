/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { FC, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import JuryAccountListRow from "./JuryAccountListRow";
import { paths } from "@/service/paths";
import clsx from "clsx";
import style from "./JuryAccount.module.scss";
import { categories, categoriesLabel } from "../Pass/script";
import { checkArr } from "@/service/checkArr";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import JuryAccountListRowStatus from "./JuryAccountListRowStatus";
import { useCheckShort } from "./service";

const JuryAccountListContent: FC<{ values: any; tabIndex?: number }> = ({
  values,
  tabIndex,
}) => {
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);
  const { isShort } = useCheckShort();

  const getCategory = (index: number) => {
    switch (index) {
      case 0:
        return categories.main_category;
      case 1:
        return categories.young_talent;
    }
  };

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  useEffect(() => {
    if (isShort) {
      // console.log(values);

      values.category = getCategory(tabIndex!);
      getWorks({ ...values, is_short_list: true });
      return;
    }

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

  return (
    <>
      {dataWorks.isSuccess &&
        checkArr(dataWorks.data.results) &&
        checkArr(data?.results) &&
        dataWorks.data.results.map((el: any, i: number) => (
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
              list: dataWorks.data.results.map((n: any) => n.id),
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
