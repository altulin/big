import { FC } from "react";
import Title from "./Title";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import style from "./JuryMain.module.scss";
import { speakers } from "./script";
import clsx from "clsx";
import ContentHead from "./ContentItem";
import Panel from "./Panel";

const ContentMob: FC = () => {
  return (
    <>
      <Title />

      <Accordion className={clsx(style.content)}>
        {speakers.map((item, i) => (
          <AccordionItem
            className={clsx(style.accordion__item)}
            header={<ContentHead {...item} />}
            key={i}
          >
            <Panel {...item} />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
export default ContentMob;
