import { FC, useState } from "react";
import Title from "./Title";
import clsx from "clsx";
import style from "./JuryMain.module.scss";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { speakers } from "./script";
import ContentHead from "./ContentItem";
import Panel from "./Panel";

const ContentDesk: FC = () => {
  const [numActive, setNumActive] = useState(0);
  const handleClick = (e: MouseEvent) => {
    // console.log(e.target);

    setNumActive(
      Number((e.target as HTMLElement)?.getAttribute("data-button")),
    );
  };

  return (
    <>
      <div className={clsx(style.content__left)}>
        <Title />
        <ScrollBarComponent>
          <ul className={clsx(style.content__list, "swiper-no-mousewheel")}>
            {speakers.map((item, i) => (
              //   <li key={i} className={clsx(style.content__item)} {...item}></li>
              <ContentHead id={i} handleClick={handleClick} key={i} {...item} />
            ))}
          </ul>
        </ScrollBarComponent>
      </div>
      <div className={clsx(style.content__right)}>
        <ScrollBarComponent>
          <ul className={clsx(style.panel)}>
            {speakers.map((item, i) => (
              <Panel visible={i === numActive} {...item} key={i} />
            ))}
          </ul>
        </ScrollBarComponent>
      </div>
    </>
  );
};
export default ContentDesk;