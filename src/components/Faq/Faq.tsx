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
    // getNominations(undefined, true).unwrap();
  }, [getNominations]);

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

export default Faq;
