import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import style from "./Pass.module.scss";
import IconDelete from "@/images/pass/basket.svg?react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import usePrice from "@/hooks/price";
import { setWorksAmount } from "@/store/pass/passSlice";

const SubmissionBox: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const { category } = useAppSelector((state) => state.category);
  const isTablet = useIsTabletDevice();
  const { works_amount } = useAppSelector((state) => state.pass);
  const { data } = usePrice();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(setWorksAmount(works_amount - 1));
    setVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={clsx(style.sub)}>
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

        <button onClick={handleDelete} className={clsx(style.delete)}>
          <IconDelete />
        </button>
      </div>

      {children}
    </div>
  );
};
export default SubmissionBox;
