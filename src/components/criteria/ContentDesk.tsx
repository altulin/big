import clsx from "clsx";
import { FC } from "react";
import { criteria } from "./script";
import style from "./Criteria.module.scss";

const ContentDesk: FC = () => {
  return (
    <>
      <div className={clsx(style.rules__head)}>
        {criteria.map((item, i) => (
          <h3 key={i} className={clsx(style.rules__title)}>
            {item.title}
          </h3>
        ))}
      </div>

      <div className={clsx(style.rules__content)}>
        {criteria.map((item, i) => (
          <ul key={i} className={clsx(style.rules__list)}>
            {item.rules.map((rule, i) => (
              <li key={i} className={clsx(style.rules__item)}>
                {rule}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
};
export default ContentDesk;
