import { FC, useEffect, useState } from "react";
import style from "./Steps.module.scss";
import clsx from "clsx";
import useControlDate from "./script";
import { useIntermediateStageQuery } from "@/store/rtk/stage/intermediateStage";
// import { zonedTimeToUtc } from "date-fns-tz";
import { toZonedTime } from "date-fns-tz";

const StepContentDesk: FC = () => {
  const [width, setWidth] = useState(0);
  const data = useIntermediateStageQuery(undefined);
  const content = useControlDate(data);

  useEffect(() => {
    if (!content) return;

    setTimeout(() => {
      setWidth(content.getLength(toZonedTime(new Date(), "Europe/Moscow")));
      // console.log(new Date());
      // const current = toZonedTime(new Date(), "Europe/Moscow");
      // console.log(current);
      // setWidth(content.getLength(new Date(2024, 9, 1, 22, 0, 1, 0)));
    }, 500);
  }, [content]);

  if (!content) return null;

  const { head, schedule } = content;

  return (
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
            <span className={clsx(style.schedule__title)}>{item.title}</span>
          </div>
        ))}
      </div>

      <div className={clsx(style.footer)}>
        {head.map((item, index) => (
          <div className={clsx(style[`head__${item.name}`])} key={index}></div>
        ))}
      </div>
    </div>
  );
};
export default StepContentDesk;
