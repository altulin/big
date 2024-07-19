import { FC, useState } from "react";
import Title from "./Title";
import clsx from "clsx";
import style from "./JuryMain.module.scss";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import ContentHead from "./ContentItem";
import Panel from "./Panel";
import { juryList } from "./jury";

const ContentDesk: FC = () => {
  const [numActive, setNumActive] = useState(0);
  const handleClick = (e: MouseEvent) => {
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
            {juryList.map((item, i) => (
              //   <li key={i} className={clsx(style.content__item)} {...item}></li>
              <ContentHead
                numActive={numActive}
                id={i}
                handleClick={handleClick}
                key={i}
                {...item}
              />
            ))}
          </ul>
        </ScrollBarComponent>
      </div>
      <div className={clsx(style.content__right)}>
        {/* <ScrollBarComponent> */}
        <ul className={clsx(style.panel)}>
          {juryList.map((item, i) => (
            <Panel visible={i === numActive} {...item} key={i} />
          ))}
        </ul>
        {/* </ScrollBarComponent> */}
      </div>
    </>
  );
};
export default ContentDesk;
