/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Pass.module.scss";
import { radioListPitch } from "./script";
import Radio from "../registration/Radio";
import { useAppDispatch } from "@/hooks/hook";
import { setCategoryPitch } from "@/store/category/categorySlice";

const PassFormRadioPitch: FC<{ formik: any; name?: string }> = ({
  formik,
  name,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCategoryPitch(formik.values.categoryPitch));
  }, [formik.values.categoryPitch, dispatch]);

  return (
    <div className={clsx(style.radio, style["radio--pitch"])}>
      {radioListPitch.map((item, i) => (
        <Radio
          key={i}
          label={item.label}
          value={item.value}
          formik={formik}
          name={name}
          icon={<item.icon />}
        />
      ))}
    </div>
  );
};
export default PassFormRadioPitch;
