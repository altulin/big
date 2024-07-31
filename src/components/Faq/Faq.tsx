import clsx from "clsx";
import style from "@/components/nominations/Nominations.module.scss";
import { FC, useEffect } from "react";
import AccordionComonent from "@/components/nominations/Accordion";
import { useLazyGetFaqQuery } from "@/store/rtk/feedback/faq";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import styleFaq from "./Faq.module.scss";
import { paths } from "@/service/paths";
import { initGLGrid } from "@/service/twgl/gridLine";
import useIsYang from "@/hooks/isYang";

const Faq: FC = () => {
  const isTablet = useIsTabletDevice();
  const [getFaq, results] = useLazyGetFaqQuery();
  const isYang = useIsYang();

  useEffect(() => {
    getFaq({ offset: 0, limit: isTablet ? 5 : 100 }).unwrap();
  }, [getFaq, isTablet]);

  const handleAdd = () => {
    const count = results.data.count;
    const length = results.data.results.length;

    if (count > length) {
      getFaq({ offset: 0, limit: length + 5 });
    }
  };

  useEffect(() => {
    if (isTablet) return;
    initGLGrid("canvas-faq", false);
  }, [isTablet, isYang]);

  return (
    <section
      id={paths.faq}
      className={clsx(style.nominations, styleFaq.faq, "panel")}
    >
      <div className={clsx(style.nominations__inner, styleFaq.faq__inner)}>
        <div className={clsx(style.content, styleFaq.faq__content)}>
          <h2 className={clsx(style.nominations__title, styleFaq.title)}>
            <span>Вопросы</span>
            <span>и ответы</span>
          </h2>
          <div className={clsx(styleFaq.faq__figure)}>
            {!isTablet && (
              <canvas
                className={clsx(styleFaq.faq__canvas)}
                id="canvas-faq"
              ></canvas>
            )}
          </div>
        </div>

        <div className={clsx(style.accordion_wrap, "swiper-no-mousewheel")}>
          <ScrollBarComponent>
            {results.data && (
              <AccordionComonent isFaq={true} data={results.data?.results} />
            )}
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

export default Faq;
