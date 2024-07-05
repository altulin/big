import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import style from "./Pass.module.scss";
import IconDelete from "@/images/pass/basket.svg?react";
import { useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const SubmissionBox: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const { category } = useAppSelector((state) => state.category);
  const isTablet = useIsTabletDevice();

  if (!isVisible) return null;

  const handleDelete = () => {
    setVisible(false);
  };

  return (
    <div className={clsx(style.sub)}>
      <div className={clsx(style.sub__inner)}>
        {category !== categories.brand_pitches && (
          <div className={clsx(style.discount)}>
            <span className={clsx(style.discount__label)}>
              Стоимость {!isTablet && <span>подачи</span>}:
            </span>

            {!isTablet && (
              <span
                className={clsx(style.discount__value, style.discount__content)}
              >
                <span>11 000</span>
                <span> </span>
                <span>₽</span>
              </span>
            )}

            <span
              className={clsx(style.discount__price, style.discount__content)}
            >
              <span>10 000</span>
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
