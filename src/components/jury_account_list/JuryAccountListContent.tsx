/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { FC, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import JuryAccountListRow from "./JuryAccountListRow";
import { paths } from "@/service/paths";
import clsx from "clsx";
import style from "./JuryAccount.module.scss";
import { categoriesLabel } from "../Pass/script";
import { checkArr } from "@/service/checkArr";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import JuryAccountListRowStatus from "./JuryAccountListRowStatus";

const JuryAccountListContent: FC<{ values: any }> = ({ values }) => {
  const [getWorks, dataWorks] = useLazyGetWorksQuery();
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  useEffect(() => {
    getWorks(values);
  }, [getWorks, values]);

  const getNominationTitle = (id: string) => {
    return data?.results.find((el: any) => el.id === id).title;
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
            state={{ page: paths.jury_account_list, id: el.id, number: i + 1 }}
          >
            <JuryAccountListRow
              items={{
                number: i + 1,
                title: el.title,
                category:
                  categoriesLabel[el.category as keyof typeof categoriesLabel],
                nomination: getNominationTitle(el.nomination),
                status: <JuryAccountListRowStatus status={el.is_reviewed} />,
              }}
            />
          </HashLink>
        ))}
    </>
  );
};
export default JuryAccountListContent;
