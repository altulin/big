import clsx from "clsx";
import style from "./Nominations.module.scss";
import { FC, useEffect, useState } from "react";
import AccordionComonent from "./Accordion";
import { useLazyGetFaqQuery } from "@/store/rtk/feedback/faq";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Nominations: FC = () => {
  const [getNominations, result] = useLazyGetFaqQuery();
  const isTablet = useIsTabletDevice();

  const [listResults, setListResults] = useState<[] | null>(null);
  const [isBtn, setIsBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!isTablet) return;
    if (!result.isSuccess) return;

    setListResults(result.data.results.slice(0, 5));
    setIsBtn(true);
  }, [isTablet, result]);

  useEffect(() => {
    getNominations(undefined, true).unwrap();
  }, [getNominations]);

  return (
    <section className={clsx(style.nominations)}>
      <div className={clsx(style.nominations__inner)}>
        <div className={clsx(style.content)}>
          <h2 className={clsx(style.nominations__title)}>Номинации</h2>
          <div className={clsx(style.torus)}></div>
        </div>

        <div className={clsx(style.accordion_wrap)}>
          {isTablet ? (
            <>
              {listResults && <AccordionComonent data={listResults} />}
              {isBtn && (
                <button
                  onClick={() => {
                    setListResults(result.data?.results);
                    setIsBtn(false);
                  }}
                  className={clsx(style.button_add)}
                >
                  Показать еще
                </button>
              )}
            </>
          ) : (
            <ScrollBarComponent>
              <AccordionComonent data={result.data?.results} />
            </ScrollBarComponent>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nominations;
