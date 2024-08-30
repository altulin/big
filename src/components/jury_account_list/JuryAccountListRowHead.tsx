/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import JuryAccountListRow from "./JuryAccountListRow";
import JuryAccountListRowSelect from "./JuryAccountListRowSelect";
import { optionsCategory, optionsReviewed, useCheckDeadline } from "./service";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";

const JuryAccountListRowHead: FC = () => {
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);
  const { isShort } = useCheckDeadline();
  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  const options = data?.results.map((item: any) => {
    return { value: item.id, label: item.title };
  });

  const itemsShort = {
    number: "№",
    title: "Название работы",
    category: null,
    nomination: (
      <JuryAccountListRowSelect name="nomination" options={options} />
    ),
    status: null,
  };

  const itemsSimple = {
    category: (
      <JuryAccountListRowSelect name="category" options={optionsCategory()} />
    ),
    status: (
      <JuryAccountListRowSelect name="is_reviewed" options={optionsReviewed} />
    ),
  };

  return (
    <JuryAccountListRow
      items={isShort ? itemsShort : { ...itemsShort, ...itemsSimple }}
      is_head={true}
    />
  );
};
export default JuryAccountListRowHead;
