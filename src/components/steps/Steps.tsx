import clsx from "clsx";
import style from "./Steps.module.scss";
import { FC, useEffect, useState } from "react";
import { schedule, head, getLength } from "./script";
// import { formatInTimeZone } from "date-fns-tz";
//

const Steps: FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // getLength(new Date());

    setTimeout(() => {
      setWidth(getLength(new Date()));
      // setWidth(getLength(new Date(2024, 8, 19, 22, 0, 1, 0)));
    }, 500);
  }, []);

  return (
    <section className={clsx(style.steps)}>
      <div className={clsx(style.steps__inner)}>
        <h2 className={clsx(style.title)}>
          <span className={clsx(style.title__text)}>
            Этапы конкурса и подачи работ
          </span>
        </h2>

        <div className={clsx(style.steps__content)}>
          <div className={clsx(style.head)}>
            <div
              className={clsx(style.head__bar)}
              style={{ width: `${width}%` }}
            ></div>

            {head.map((item, index) => (
              <div
                className={clsx(style[`head__${item.name}`], style.head__text)}
                key={index}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className={clsx(style.schedule)}>
            {schedule.map((item, index) => (
              <div className={clsx(style.schedule__item)} key={index}>
                <span className={clsx(style.schedule__date)}>{item.date}</span>
                <span className={clsx(style.schedule__title)}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className={clsx(style.footer)}>
            {head.map((item, index) => (
              <div
                className={clsx(style[`head__${item.name}`])}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
