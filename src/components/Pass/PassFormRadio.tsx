/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import { categories, categoriesPitshes, radioList } from "./script";
import Radio from "../registration/Radio";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setCategory, setCategoryPitch } from "@/store/category/categorySlice";
import { setClearForm } from "@/store/forms/formsSlice";
import useDeadlineClose from "@/hooks/closeDeadline";

const PassFormRadio: FC<{ formik: any; name?: string }> = ({
  formik,
  name = "category",
}) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const { isCloseMain, isCloseBrand, isCloseYoung } = useDeadlineClose();

  useEffect(() => {
    if (formik.values.category === categories.brand_pitches) {
      dispatch(setCategoryPitch(categoriesPitshes.nuum));
      formik.setFieldValue("categoryPitch", categoriesPitshes.nuum);
    } else {
      dispatch(setCategoryPitch(null));
    }

    dispatch(setCategory(formik.values.category));
  }, [formik.values.category, dispatch]);

  useEffect(() => {
    dispatch(setClearForm());
  }, [category, dispatch]);

  const getList = useCallback(() => {
    const radioArr = [];
    const main = radioList.filter(
      (i) => i.value === categories.main_category,
    )[0];
    const young = radioList.filter(
      (i) => i.value === categories.young_talent,
    )[0];
    const brand = radioList.filter(
      (i) => i.value === categories.brand_pitches,
    )[0];

    if (!isCloseMain) radioArr.push(main);
    if (!isCloseYoung) radioArr.push(young);
    if (!isCloseBrand) radioArr.push(brand);

    return radioArr;
  }, [isCloseBrand, isCloseMain, isCloseYoung]);

  useEffect(() => {
    dispatch(setCategory(getList()[0].value));
  }, [dispatch, getList]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Категория" isBtn={false} />

      <div className={clsx(style.box__inner, style.radio)}>
        {getList().map((item, i) => (
          <Radio
            key={i}
            label={item.label}
            value={item.value}
            name={name}
            // icon={item.icon && <item.icon />}
          />
        ))}
      </div>
    </div>
  );
};
export default PassFormRadio;
