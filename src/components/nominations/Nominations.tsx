import clsx from "clsx";
import style from "./Nominations.module.scss";
import { FC, useEffect } from "react";
import AccordionComonent from "./Accordion";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { paths } from "@/service/paths";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import { initGLTor } from "@/service/twgl/tor";

const Nominations: FC = () => {
  const [getNomination, results] = useLazyNominationsQuery(undefined);

  const isTablet = useIsTabletDevice();

  useEffect(() => {
    initGLTor("gl-tor");
  }, []);

  useEffect(() => {
    getNomination({ offset: 0, limit: isTablet ? 5 : 100 }).unwrap();
  }, [getNomination, isTablet]);

  const handleAdd = () => {
    getNomination({ offset: 0, limit: 10 });
  };

  return (
    <section
      id={paths.nominations}
      className={clsx(style.nominations, "panel")}
    >
      <div className={clsx(style.nominations__inner)}>
        <div className={clsx(style.content)}>
          <div className={clsx(style.content__head)}>
            <h2 className={clsx(style.nominations__title)}>Номинации</h2>
            <p className={clsx(style.content__text)}>
              Если ты опытный продакшен/специалист — оставайся тут! Если ты
              молод, свеж или твоему продакшену до 2 лет — тебе в
              <a className={clsx(style.content__link)} href="#">
                Young Talent
              </a>
            </p>
          </div>

          <div className={clsx(style.torus)}>
            <div className={clsx(style.torus__inner)}>
              <canvas className={clsx(style.canvas)} id="gl-tor"></canvas>
            </div>
          </div>
        </div>

        <div className={clsx(style.accordion_wrap, "swiper-no-mousewheel")}>
          <ScrollBarComponent>
            <AccordionComonent data={results.data?.results} />
          </ScrollBarComponent>

          {isTablet && (
            <button onClick={handleAdd} className={clsx(style.button_add)}>
              Показать еще
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nominations;
