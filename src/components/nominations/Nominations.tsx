import clsx from "clsx";
import style from "./Nominations.module.scss";
import { FC, useEffect } from "react";
import AccordionComonent from "./Accordion";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { paths } from "@/service/paths";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import { initGLTor } from "@/service/twgl/tor";
import useIsYang from "@/hooks/isYang";
import { HashLink } from "react-router-hash-link";
import IconNominations from "@/images/nominations/tor.svg?react";

const Nominations: FC = () => {
  const [getNomination, results] = useLazyNominationsQuery(undefined);
  const { isYang } = useIsYang();
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    if (isTablet) return;
    initGLTor("gl-tor", isYang ? [0.3, 0.2, 0.9, 1.0] : [0.0, 1.0, 0.0, 1.0]);
  }, [isTablet, isYang]);

  useEffect(() => {
    getNomination({ offset: 0, limit: isTablet ? 5 : 100 }).unwrap();
  }, [getNomination, isTablet]);

  const handleAdd = () => {
    const count = results.data.count;
    const length = results.data.results.length;

    if (count > length) {
      getNomination({ offset: 0, limit: length + 5 });
    }
  };

  return (
    <section
      id={isYang ? paths.nominations_young : paths.nominations}
      className={clsx(style.nominations, "panel")}
    >
      <div className={clsx(style.nominations__inner)}>
        <div className={clsx(style.content)}>
          <div className={clsx(style.content__head)}>
            <h2 className={clsx(style.nominations__title)}>Номинации</h2>

            <p className={clsx(style.content__text)}>
              <span>Если ты опытный продакшн/специалист — оставайся тут!</span>

              <span>
                Если ты молод, свеж или твоему продакшну до двух лет — тебе
                <br /> в
                <HashLink
                  to={`/${paths.young_talent}`}
                  className={clsx(style.content__link)}
                >
                  <span>Young </span>
                  <span>Talent</span>
                  <span> by NUUM</span>
                </HashLink>
              </span>
            </p>
          </div>

          <div className={clsx(style.torus)}>
            <div className={clsx(style.torus__inner)}>
              {!isTablet && (
                <canvas className={clsx(style.canvas)} id="gl-tor"></canvas>
              )}

              {isTablet && <IconNominations />}
            </div>
          </div>
        </div>

        <div className={clsx(style.accordion_wrap, "swiper-no-mousewheel")}>
          <ScrollBarComponent>
            <AccordionComonent data={results.data?.results} />
          </ScrollBarComponent>

          {isTablet && results?.data?.count > results?.data?.results.length && (
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
