/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Program.module.scss";
import clsx from "clsx";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import ContentItem from "./ContentItem";
import ProgramBtn from "./ProgramBtn";
import { useProgramsQuery } from "@/store/rtk/main/programs";
import { checkArr } from "@/service/checkArr";

const ContentMob: FC = () => {
  const { data } = useProgramsQuery({});

  if (!data) return null;

  console.log(data.results);

  return (
    <Accordion className={clsx(style.content)}>
      {checkArr(data.results) &&
        data.results.map((item: any, i: number) => (
          <AccordionItem
            className={clsx(style.accordion__item)}
            header={
              <ProgramBtn
                is_mega={typeof item.sponsor_photo === "string"}
                is_description={item.is_active}
                date={item.date_at}
                title={item.collapsed_title.split("/")}
                i={i}
                // logo={item.logo}
              />
            }
            key={i}
          >
            <ContentItem item={item} i={i} />
          </AccordionItem>
        ))}
    </Accordion>
  );
};
export default ContentMob;
