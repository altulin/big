import clsx from "clsx";
import style from "./Nominations.module.scss";
import { FC, useEffect } from "react";
import AccordionComonent from "./Accordion";
import { useLazyGetFaqQuery } from "@/store/rtk/feedback/faq";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Nominations: FC = () => {
  const [getNominations, result] = useLazyGetFaqQuery();
  const isTablet = useIsTabletDevice();

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
            <AccordionComonent data={result.data?.results} />
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
