/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import { radioList } from "./script";
import Radio from "../registration/Radio";
import { useAppDispatch } from "@/hooks/hook";
import { setCategory } from "@/store/category/categorySlice";

const PassFormRadio: FC<{ formik: any }> = ({ formik }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCategory(formik.values.category));
  }, [formik.values.category, dispatch]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Категория" isBtn={false} />

      <div className={clsx(style.box__inner, style.radio)}>
        {radioList.map((item, i) => (
          <Radio
            key={i}
            label={item.label}
            value={item.value}
            formik={formik}
            name="category"
          />
        ))}
      </div>
    </div>
  );
};
export default PassFormRadio;
