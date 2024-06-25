import clsx from "clsx";
import { FC } from "react";
import style from "./Nominations.module.scss";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import IconArr from "@/images/nominations/arr.svg?react";
import img from "@/images/nominations/konda.png";

const Head: FC<{ label: string }> = ({ label }) => {
  return (
    <>
      <p className={clsx(style.accordion__label)}>{label}</p>
      <div className={clsx(style.accordion__icon)}>
        {" "}
        <IconArr />
      </div>
    </>
  );
};

const AccordionComonent: FC<{
  data: { answer: string; question: string }[];
}> = ({ data }) => {
  const getAnswer = (answer: string) => {
    return answer.split("\r").map((el) => el.replace(/\n+/g, ""));
  };

  if (!data) return null;

  return (
    <Accordion
      className={clsx(style.accordion)}
      transition
      transitionTimeout={500}
    >
      {data.map(
        (
          { question, answer }: { answer: string; question: string },
          i: number,
        ) => (
          <div key={i} className={clsx(style.accordion__block)}>
            <div className={clsx(style.support)}>
              <p className={clsx(style.support__text)}>При поддержке </p>
              <img src={img} alt="support" width={78} height={13} />
            </div>
            <AccordionItem
              className={clsx(style.accordion__item)}
              header={<Head label={question} />}
            >
              <p className={clsx(style.accordion__answer)}>
                {getAnswer(answer).map((el, i) => (
                  <span key={i}>{el}</span>
                ))}
              </p>
            </AccordionItem>
          </div>
        ),
      )}
    </Accordion>
  );
};
export default AccordionComonent;
