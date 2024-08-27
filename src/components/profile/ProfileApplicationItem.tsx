/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Profile.module.scss";

import IconEdit from "@/images/profile/edit.svg?react";
import { checkArr } from "@/service/checkArr";
import { getCategory, getNominationValue } from "./service";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import useDeadline from "@/hooks/deadline";
import { categories } from "../Pass/script";
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
  // isDraft,
  num,
  ...props
}) => {
  const [getNomination, { data: results }] = useLazyNominationsQuery(undefined);
  const {
    category,
    work_link,
    nomination,
    credits,
    about_project,
    idea,
    id,
    title,
  } = props;
  const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);

  useEffect(() => {
    getNomination({ offset: 0, limit: 100 }).unwrap();
  }, []); // eslint-disable-line

  return (
    <div className={clsx(style.item)}>
      <div className={clsx(style.header)}>
        <p className={clsx(style.header__text)}>
          <span>Работа </span>
          <span>{`№${num + 1}`}</span>
        </p>

        {isDeadline && <EditBtn id={id} />}

        {!isDeadline && categories.brand_pitches === category && (
          <EditBtn id={id} />
        )}

        {/* {isDraft && (
          <button
            onClick={handleDelete}
            type="button"
            className={clsx(style.edit)}
          >
            <IconBasket />
          </button>
        )} */}
      </div>

      <div className={clsx(style.item__inner)}>
        <h3 className={clsx(style.name)}>{title}</h3>

        <div className={clsx(style.content)}>
          {work_link && (
            <p
              className={clsx(
                style.href,
                style.item__block,
                style["item__block--link"],
              )}
            >
              <span className={clsx(style.item__subtitle)}>Ссылка:</span>
              <span className={clsx(style.item__value)}>{work_link}</span>
            </p>
          )}

          <div className={clsx(style.category, style.item__block)}>
            <span className={clsx(style.item__subtitle)}>Категория:</span>
            <span className={clsx(style.category__box, style.item__value)}>
              {getCategory(category)}
              {props.img_category && <props.img_category />}
            </span>
          </div>

          {nomination && (
            <div className={clsx(style.nomination, style.item__block)}>
              <span className={clsx(style.item__subtitle)}>Номинация:</span>
              <span className={clsx(style.item__value)}>
                {results?.results &&
                  getNominationValue(nomination, results?.results)}
              </span>
            </div>
          )}

          {credits && (
            <div className={clsx(style.credits, style.item__block)}>
              <span
                className={clsx(style.credits__title, style.item__subtitle)}
              >
                Кредитсы:
              </span>

              <div className={clsx(style.credits__box, style.item__value)}>
                {checkArr(credits) ? (
                  credits?.map((item, i) => (
                    <span key={i} className={clsx(style.credits__item)}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span className={clsx(style.credits__item)}>{credits}</span>
                )}
              </div>
            </div>
          )}

          {about_project && (
            <div className={clsx(style.about, style.item__block)}>
              <span className={clsx(style.about__title, style.item__subtitle)}>
                О проекте:
              </span>
              <span className={clsx(style.about__text, style.item__value)}>
                {about_project}
              </span>
            </div>
          )}

          {idea && (
            <div className={clsx(style.insight, style.item__block)}>
              <span
                className={clsx(style.insight__title, style.item__subtitle)}
              >
                Инсайт:
              </span>
              <span className={clsx(style.insight__text, style.item__value)}>
                {idea}
              </span>
            </div>
          )}

          {false && (
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
                {`${10000} ₽`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileApplicationItem;
