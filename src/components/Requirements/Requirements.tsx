import clsx from "clsx";
import style from "./Requirements.module.scss";
import { FC, useEffect, useState } from "react";
import { requirements, requirementYang } from "./script";
import { paths } from "@/service/paths";
import { useAppSelector } from "@/hooks/hook";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Requirements: FC = () => {
  const isTablet = useIsTabletDevice();
  const [isBtn, setIsBtn] = useState<boolean>(true);
  const { isYang } = useAppSelector((state) => state.yang);

  const [listResults, setListResults] = useState<string[]>([]);

  useEffect(() => {
    const list = isYang ? requirementYang : requirements;

    if (isTablet) {
      setListResults(list.slice(0, 3));
    } else {
      setListResults(list);
    }
  }, [isTablet, isYang]);

  return (
    <section
      id={isYang ? paths.requirements_young : paths.requirements}
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
              setListResults(isYang ? requirementYang : requirements);
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
