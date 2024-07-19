import { FC, useState } from "react";
import Title from "./Title";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import style from "./JuryMain.module.scss";
import clsx from "clsx";
import ContentHead from "./ContentItem";
import Panel from "./Panel";
import { juryList } from "./jury";

const ContentMob: FC = () => {
  const [numActive, setNumActive] = useState(0);

  const handleClick = (e: MouseEvent) => {
    setNumActive(
      Number((e.target as HTMLElement)?.getAttribute("data-button")),
    );
  };
  return (
    <>
      <Title />

      <Accordion className={clsx(style.content)}>
        {juryList.map((item, i) => (
          <AccordionItem
            className={clsx(style.accordion__item)}
            header={
              <ContentHead
                handleClick={handleClick}
                numActive={numActive}
                {...item}
              />
            }
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
