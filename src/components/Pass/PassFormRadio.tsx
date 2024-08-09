/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import { categories, categoriesPitshes, radioList } from "./script";
import Radio from "../registration/Radio";
import { useAppDispatch } from "@/hooks/hook";
import { setCategory, setCategoryPitch } from "@/store/category/categorySlice";

const PassFormRadio: FC<{ formik: any; name?: string }> = ({
  formik,
  name = "category",
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formik.values.category === categories.brand_pitches) {
      dispatch(setCategoryPitch(categoriesPitshes.nuum));
      formik.setFieldValue("categoryPitch", categoriesPitshes.nuum);
    } else {
      dispatch(setCategoryPitch(null));
    }

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
            name={name}
            // icon={item.icon && <item.icon />}
          />
        ))}
      </div>
    </div>
  );
};
export default PassFormRadio;
