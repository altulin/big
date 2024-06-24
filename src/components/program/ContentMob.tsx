import { FC } from "react";
import style from "./Program.module.scss";
import { program } from "./script";
import clsx from "clsx";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import ContentItem from "./ContentItem";
import ProgramBtn from "./ProgramBtn";

const ContentMob: FC = () => {
  return (
    <Accordion className={clsx(style.content)}>
      {program.map((item, i) => (
        <AccordionItem
          className={clsx(style.accordion__item)}
          header={<ProgramBtn date={item.date} title={item.title} i={i} />}
          key={i}
        >
          <ContentItem item={item} i={i} />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default ContentMob;
