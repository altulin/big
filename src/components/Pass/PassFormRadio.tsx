import { FC, useCallback, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import { categories, radioList } from "./script";
import RadioButton from "../form/RadioButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setCategory } from "@/store/category/categorySlice";
import useDeadlineClose from "@/hooks/closeDeadline";

const PassFormRadio: FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);
  const { isCloseMain, isCloseBrand, isCloseYoung } = useDeadlineClose();

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

  // выбранная заранее категория (например, со страницы питчей) сохраняется,
  // если она доступна; иначе выбирается первая доступная
  useEffect(() => {
    const list = getList();
    if (!list.length) return;
    if (list.some((item) => item.value === category)) return;

    dispatch(setCategory(list[0].value));
  }, [category, dispatch, getList]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Категория" isBtn={false} />

      <div className={clsx(style.box__inner, style.radio)}>
        {getList().map((item) => (
          <RadioButton
            key={item.value}
            label={item.label}
            value={item.value}
            name="category"
            checked={category === item.value}
            onSelect={(value) => dispatch(setCategory(value))}
          />
        ))}
      </div>
    </div>
  );
};
export default PassFormRadio;
