import clsx from "clsx";
import style from "./Speakers.module.scss";
import { FC } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { speakers } from "./script";
import Head from "./Head";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import SpeakersItem from "./SpeakersItem";

const Speakers: FC = () => {
  const isTablet = useIsTabletDevice();

  return (
    <section className={clsx(style.speakers, "speakers")}>
      <div className={clsx(style.speakers__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Спикеры</span>
        </h2>

        <div className={clsx(style.content)}>
          <Accordion
            className={clsx(style.accordion)}
            onStateChange={({ key }) => {
              console.log(key);
            }}
          >
            {speakers.map((item, i) => (
              <AccordionItem
                className={clsx(style.accordion__item)}
                header={<Head title={item.name} />}
                key={i}
              >
                {isTablet && <SpeakersItem {...item} />}
              </AccordionItem>
            ))}
          </Accordion>

          {!isTablet && (
            <div className={clsx(style.content__list)}>
              {speakers.map((item, i) => (
                <SpeakersItem {...item} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
