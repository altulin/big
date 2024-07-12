/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, ReactNode, useRef } from "react";
import style from "./Pass.module.scss";
import IconDelete from "@/images/pass/basket.svg?react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import usePrice from "@/hooks/price";
import { setRemoveForm } from "@/store/forms/formsSlice";

const SubmissionBox: FC<{
  children?: ReactNode;
  id?: number;
  remove?: any;
}> = ({ children, id, remove }) => {
  const { category } = useAppSelector((state) => state.category);
  const isTablet = useIsTabletDevice();
  const { data } = usePrice();
  const refBox = useRef<any>(null);
  const { forms } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(setRemoveForm());
    remove(id);
  };

  return (
    <div ref={refBox} className={clsx(style.sub)} data-id={id}>
      <div className={clsx(style.sub__inner)}>
        {category !== categories.brand_pitches && (
          <div className={clsx(style.discount)}>
            <span className={clsx(style.discount__label)}>
              Стоимость {!isTablet && <span>подачи</span>}:
            </span>

            {data?.discounted_work_price !== data?.work_price && (
              <span
                className={clsx(style.discount__value, style.discount__content)}
              >
                <span>{data?.discounted_work_price}</span>
                <span> </span>
                <span>₽</span>
              </span>
            )}

            <span
              className={clsx(style.discount__price, style.discount__content)}
            >
              <span>{data?.work_price}</span>
              <span> </span>
              <span>₽</span>
            </span>
          </div>
        )}

        {forms.length > 1 && (
          <button
            type="button"
            onClick={handleDelete}
            className={clsx(style.delete)}
          >
            <IconDelete />
          </button>
        )}
      </div>

      {children}
    </div>
  );
};
export default SubmissionBox;
