import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Shortlist.module.scss";
import Select from "react-select";
import { useNominationsShortQuery } from "@/store/rtk/nominations/nominations_short";

const ShortSelect: FC = () => {
  const { data } = useNominationsShortQuery({ limit: 100, offset: 0 });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={clsx(style.select)}>
      <p className={clsx(style.label)}>Номинации</p>
      <Select options={data}></Select>
    </div>
  );
};
export default ShortSelect;
