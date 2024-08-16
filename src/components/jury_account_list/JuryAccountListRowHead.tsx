/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import JuryAccountListRow from "./JuryAccountListRow";
import JuryAccountListRowSelect from "./JuryAccountListRowSelect";
import { optionsCategory, optionsReviewed, useCheckShort } from "./service";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";

const JuryAccountListRowHead: FC = () => {
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);
  const { isShort } = useCheckShort();
  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  const options = data?.results.map((item: any) => {
    return { value: item.id, label: item.title };
  });

  const itemsShort = {
    number: "№",
    title: "Название работы",
    category: (
      <JuryAccountListRowSelect name="category" options={optionsCategory()} />
    ),
    nomination: null,
    status: null,
  };

  const itemsSimple = {
    nomination: (
      <JuryAccountListRowSelect name="nomination" options={options} />
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
