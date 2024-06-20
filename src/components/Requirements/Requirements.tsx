import clsx from "clsx";
import style from "./Requirements.module.scss";
import { FC, useEffect, useState } from "react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Requirements: FC = () => {
  const isTablet = useIsTabletDevice();
  const [isBtn, setIsBtn] = useState<boolean>(false);
  // const [listResults, setListResults] = useState<[] | null>(null);

  useEffect(() => {
    if (!isTablet) return;

    // setListResults(result.data.results.slice(0, 5));
    setIsBtn(true);
  }, [isTablet]);

  return (
    <section className={clsx(style.requirements)}>
      <div className={clsx(style.requirements__inner)}>
        <h2 className={clsx(style.title)}>
          <span className={clsx(style.title__text)}>Технические</span>
          <span className={clsx(style.title__text)}>требования</span>
        </h2>

        <div className={clsx(style.content)}></div>
        {isTablet && isBtn && (
          <button
            onClick={() => {
              // setListResults(result.data?.results);
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
