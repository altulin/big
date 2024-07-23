import clsx from "clsx";
import { FC } from "react";
import style from "./Nominations.module.scss";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import IconArr from "@/images/nominations/arr.svg?react";
import useIsYang from "@/hooks/isYang";

const Head: FC<{ label: string; isFaq?: boolean }> = ({ label, isFaq }) => {
  return (
    <div className={clsx(style.accordion__head)}>
      <p
        className={clsx(
          style.accordion__label,
          isFaq && style.accordion__label_faq,
        )}
      >
        {label}
      </p>
      <div className={clsx(style.accordion__icon)}>
        <IconArr />
      </div>
    </div>
  );
};

interface IAccordionItem {
  answer?: string;
  question?: string;
  title?: string;
  description?: string;
  category?: string;
  partner?: {
    id: number;
    logo: string;
    title: string;
    type: string;
    url: string;
  };
}

const AccordionComonent: FC<{
  data: IAccordionItem[];
  isFaq?: boolean;
}> = ({ data, isFaq }) => {
  const getAnswer = (answer: string) => {
    return answer.split("\r").map((el) => el.replace(/\n+/g, ""));
  };
  const { isYang } = useIsYang();

  if (!data) return null;

  return (
    <Accordion
      className={clsx(style.accordion)}
      transition
      transitionTimeout={500}
    >
      {data.map((data, i: number) => (
        <div
          key={i}
          className={clsx(
            style.accordion__block,
            !data?.partner && style["accordion__block--support"],
          )}
        >
          {data.partner && !isYang && (
            <a
              className={clsx(style.support, isYang && style["support--yang"])}
              target="_blank"
              href={data.partner.url}
            >
              <p className={clsx(style.support__text)}>При поддержке </p>
              <img
                className={clsx(style.support__logo)}
                src={data.partner.logo}
                alt="support"
                width={78}
                height={13}
              />
            </a>
          )}

          <AccordionItem
            header={
              <Head
                isFaq={isFaq}
                label={(data.question ?? data.title) as string}
              />
            }
          >
            <div className={clsx(style.accordion__inner)}>
              <p
                className={clsx(
                  style.accordion__answer,
                  isFaq && style.accordion__answer_faq,
                )}
              >
                {getAnswer((data.answer ?? data.description) as string).map(
                  (el, i) => (
                    <span key={i}>{el}</span>
                  ),
                )}
              </p>

              {data.category === "special_nomination" && (
                <span className={clsx(style.accordion__special)}>
                  Специальная награда
                </span>
              )}
            </div>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
};
export default AccordionComonent;
