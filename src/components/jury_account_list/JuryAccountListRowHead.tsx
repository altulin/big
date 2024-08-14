/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import JuryAccountListRow from "./JuryAccountListRow";
import JuryAccountListRowSelect from "./JuryAccountListRowSelect";
import { optionsCategory, optionsReviewed } from "./service";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";

const JuryAccountListRowHead: FC = () => {
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [getNomination]);

  const options = data?.results.map((item: any) => {
    return { value: item.id, label: item.title };
  });

  return (
    <JuryAccountListRow
      items={{
        number: "№",
        title: "Название работы",
        category: (
          <JuryAccountListRowSelect
            name="category"
            options={optionsCategory()}
          />
        ),
        nomination: (
          <JuryAccountListRowSelect name="nomination" options={options} />
        ),
        status: (
          <JuryAccountListRowSelect
            name="is_reviewed"
            options={optionsReviewed}
          />
        ),
      }}
      is_head={true}
    />
  );
};
export default JuryAccountListRowHead;
