/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useCallback, useEffect } from "react";
import style from "./Profile.module.scss";

import IconEdit from "@/images/profile/edit.svg?react";
// import { checkArr } from "@/service/checkArr";
// import { getCategory, getNominationValue } from "./service";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { categories } from "../Pass/script";
import { getArray } from "../jury_account_card/service";
import { ban_list } from "./script";
import useDeadlineClose from "@/hooks/closeDeadline";
// import IconBasket from "@/images/pass/basket.svg?react";
// import { useLazyDeleteWorkQuery } from "@/store/rtk/orders/delete_work";

export interface IProfileApplicationItem {
  status: string;
  brand: string;
  category: string;
  img_category?: any;
  work_link?: string;
  nomination?: string;
  credits?: string[];
  idea?: string;
  file?: string;
  about_project?: string;
  num: number;
  id: number;
  title?: string;
  isDraft?: boolean;
  work_cost?: number;
  cost?: number;
}

const EditBtn: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/${paths.edit}/${id}`);
  };
  return (
    <button
      type="button"
      className={clsx(style.edit, style["edit--left"])}
      onClick={handleEdit}
    >
      <IconEdit />
    </button>
  );
};

const ProfileApplicationItem: FC<IProfileApplicationItem> = ({
  isDraft,
  num,
  ...props
}) => {
  const [getNomination, { data: results }] = useLazyNominationsQuery(undefined);
  const { category, nomination, id, title, cost } = props;
  const { isCloseMain, isCloseYoung, isCloseBrand } = useDeadlineClose();

  useEffect(() => {
    if (!nomination) return;
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, []); // eslint-disable-line

  const checkEdit = useCallback(() => {
    if (category === categories.main_category && !isCloseMain) {
      return true;
    }

    if (category === categories.young_talent && !isCloseYoung) {
      return true;
    }

    if (category === categories.brand_pitches && !isCloseBrand) {
      return true;
    }

    return false;
  }, [category, isCloseBrand, isCloseMain, isCloseYoung]);

  const EditText = (text: string) => {
    return text.split("\n");
  };

  return (
    <div className={clsx(style.item)}>
      <div className={clsx(style.header)}>
        <p className={clsx(style.header__text)}>
          <span>Работа </span>
          <span>{`№${num + 1}`}</span>
        </p>

        {checkEdit() && <EditBtn id={id} />}
      </div>

      <div className={clsx(style.item__inner)}>
        <h3 className={clsx(style.name)}>{title}</h3>

        <div className={clsx(style.content)}>
          {getArray(props, ban_list, results?.results).map(
            (el: any, i: number) => (
              <li key={i} className={clsx(style.item__block)}>
                <span className={clsx(style.item__subtitle)}>{el.key}</span>
                <span className={clsx(style.item__value)}>
                  {EditText(el.value).map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </span>
              </li>
            ),
          )}

          {isDraft && false && (
            <div
              className={clsx(
                style.insight,
                style.item__block,
                style["item__block--sum"],
              )}
            >
              <span
                className={clsx(
                  style.insight__title,
                  style.item__subtitle,
                  style["item__subtitle--sum"],
                )}
              >
                Сумма:
              </span>
              <span
                className={clsx(
                  style.insight__text,
                  style.item__value,
                  style["item__value--sum"],
                )}
              >
                {`${cost} ₽`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileApplicationItem;
