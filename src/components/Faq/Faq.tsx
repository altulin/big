import clsx from "clsx";
import style from "@/components/nominations/Nominations.module.scss";
import { FC, useEffect, useState } from "react";
import AccordionComonent from "@/components/nominations/Accordion";
import { useLazyGetFaqQuery } from "@/store/rtk/feedback/faq";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import styleFaq from "./Faq.module.scss";
import { paths } from "@/service/paths";
import { initGLGrid } from "@/service/twgl/grid";

const Faq: FC = () => {
  const isTablet = useIsTabletDevice();
  const [getFaq, results] = useLazyGetFaqQuery();

  useEffect(() => {
    getFaq({ offset: 0, limit: isTablet ? 5 : 100 }).unwrap();
  }, [getFaq, isTablet]);

  const handleAdd = () => {
    // console.log(results.data.results);
    // console.log(results.data.count);
    getNomination({ offset: 0, limit: 10 });
  };

  useEffect(() => {
    initGLGrid("canvas-faq");
  }, []);

  return (
    <section
      id={paths.faq}
      className={clsx(style.nominations, styleFaq.faq, "panel")}
    >
      <div className={clsx(style.nominations__inner)}>
        <div className={clsx(style.content, styleFaq.faq__content)}>
          <h2 className={clsx(style.nominations__title, styleFaq.title)}>
            <span>Вопросы</span>
            <span>и ответы</span>
          </h2>
          <div className={clsx(styleFaq.faq__figure)}>
            <canvas
              className={clsx(styleFaq.faq__canvas)}
              id="canvas-faq"
            ></canvas>
          </div>
        </div>

        <div className={clsx(style.accordion_wrap, "swiper-no-mousewheel")}>
          <ScrollBarComponent>
            {results.data && <AccordionComonent data={results.data?.results} />}
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

export default Faq;
