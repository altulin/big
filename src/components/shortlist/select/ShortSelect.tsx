/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "../Shortlist.module.scss";
import Select from "react-select";
import { useNominationsShortQuery } from "@/store/rtk/nominations/nominations_short";
import { class_names } from "./data";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setShortNomination } from "@/store/short/shortSlice";

const ShortSelect: FC = () => {
  const { data, isSuccess } = useNominationsShortQuery({
    limit: 100,
    offset: 0,
  });
  const { nomination } = useAppSelector((state) => state.short);
  const dispatch = useAppDispatch();

  const all_value = { label: "Все", value: "" };

  if (!isSuccess) return null;

  return (
    <div className={clsx(style.short_select, "swiper-no-mousewheel")}>
      <p className={clsx(style.short_select__label)}>Номинации</p>
      <Select
        name="short_select"
        id="short_select"
        options={[all_value, ...data]}
        className={clsx(style.select)}
        value={[all_value, ...data].find(
          (el: any) => el.value.toString() === nomination,
        )}
        classNames={{
          control: () => clsx(style.select__control),
          ...class_names,
        }}
        onChange={(val) => val && dispatch(setShortNomination(val.value))}
      ></Select>
    </div>
  );
};
export default ShortSelect;
