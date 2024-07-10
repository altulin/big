/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import IconAwaiting from "@/images/profile/awaiting.svg?react";
import IconPaid from "@/images/profile/paid.svg?react";
import IconEdit from "@/images/profile/edit.svg?react";
import { checkArr } from "@/service/checkArr";

interface IProfileApplicationItem {
  status: string;
  name: string;
  category: string;
  img_category?: any;
  href?: string;
  nomination?: string;
  credits?: string[];
  insight?: string;
  file?: string;
  about?: string;
}

const Awaiting: FC = () => {
  return (
    <>
      <IconAwaiting />
      <span>ожидает оплаты</span>
    </>
  );
};

const Paid: FC = () => {
  return (
    <>
      <IconPaid />
      <span>оплачено</span>
    </>
  );
};

const ProfileApplicationItem: FC<IProfileApplicationItem> = ({ ...props }) => {
  const { category, name, status, href, nomination, credits, about, insight } =
    props;

  const [isVisible, setIsVisible] = useState(false);
  const checkCategory = (name: string) => {
    switch (name) {
      case "awaiting":
        return <Awaiting />;

      case "paid":
        return <Paid />;

      default:
        return style["item__awaiting"];
    }
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={clsx(style.item)}>
      <div className={clsx(style.status, style[`status--${status}`])}>
        {checkCategory(status)}
      </div>

      <h3 className={clsx(style.name)}>{name}</h3>

      {isVisible && (
        <div className={clsx(style.content)}>
          {href && (
            <p className={clsx(style.href, style.item__block)}>
              <span className={clsx(style.item__subtitle)}>Ссылка:</span>
              <span className={clsx(style.item__value)}>{href}</span>
            </p>
          )}

          <div className={clsx(style.category, style.item__block)}>
            <span className={clsx(style.item__subtitle)}>Категория:</span>
            <span className={clsx(style.category__box, style.item__value)}>
              {category}
              {props.img_category && <props.img_category />}
            </span>
          </div>

          {nomination && (
            <div className={clsx(style.nomination, style.item__block)}>
              <span className={clsx(style.item__subtitle)}>Номинация:</span>
              <span className={clsx(style.item__value)}>{nomination}</span>
            </div>
          )}

          {checkArr(credits) && (
            <div className={clsx(style.credits, style.item__block)}>
              <span
                className={clsx(style.credits__title, style.item__subtitle)}
              >
                Кредитсы:
              </span>

              <div className={clsx(style.credits__box, style.item__value)}>
                {credits?.map((item, i) => (
                  <span key={i} className={clsx(style.credits__item)}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {about && (
            <div className={clsx(style.about, style.item__block)}>
              <span className={clsx(style.about__title, style.item__subtitle)}>
                О проекте:
              </span>
              <span className={clsx(style.about__text, style.item__value)}>
                {about}
              </span>
            </div>
          )}

          {insight && (
            <div className={clsx(style.insight, style.item__block)}>
              <span
                className={clsx(style.insight__title, style.item__subtitle)}
              >
                Инсайт:
              </span>
              <span className={clsx(style.insight__text, style.item__value)}>
                {insight}
              </span>
            </div>
          )}
        </div>
      )}

      <button onClick={toggleVisible} className={clsx(style.visible)}>
        {isVisible ? "Свернуть" : "Показать больше"}
      </button>

      {isVisible && (
        <button className={clsx(style.edit)}>
          <IconEdit />
        </button>
      )}
    </div>
  );
};
export default ProfileApplicationItem;
