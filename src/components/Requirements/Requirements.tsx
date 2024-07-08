import clsx from "clsx";
import style from "./Requirements.module.scss";
import { FC, useEffect, useState } from "react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { requirements } from "./script";
import { paths } from "@/service/paths";

const Requirements: FC = () => {
  const isTablet = useIsTabletDevice();
  const [isBtn, setIsBtn] = useState<boolean>(false);
  const [listResults, setListResults] = useState<string[]>(requirements);

  useEffect(() => {
    if (!isTablet) return;

    setListResults(requirements.slice(0, 5));
    setIsBtn(true);
  }, [isTablet]);

  return (
    <section
      id={paths.requirements}
      className={clsx(style.requirements, "panel")}
    >
      <div className={clsx(style.requirements__inner)}>
        <div className={clsx(style.presents)}>
          <h2 className={clsx(style.title)}>
            <span className={clsx(style.title__text)}>требования</span>
            <span className={clsx(style.title__text)}>к подаче</span>
            <span className={clsx(style.title__text)}>работ </span>
          </h2>
        </div>

        <div className={clsx(style.content)}>
          <ul className={clsx(style.list, "scroll")}>
            {listResults.map((item, index) => (
              <li key={index} className={clsx(style.list__item)}>
                <span className={clsx(style.list__num)}>{index + 1}</span>
                <p className={clsx(style.list__text)}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        {isTablet && isBtn && (
          <button
            onClick={() => {
              setListResults(requirements);
              setIsBtn(false);
            }}
            className={clsx(style.button_add)}
          >
            Показать еще
          </button>
        )}
      </div>
    </section>
  );
};

export default Requirements;
