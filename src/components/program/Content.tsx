import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import styleProgram from "./Program.module.scss";
import { program, setBtnWidth } from "./script";
import ContentItem from "./ContentItem";
import { useAppSelector } from "@/hooks/hook";

const Content: FC = () => {
  const refContent = useRef<HTMLDivElement | null>(null);
  const { current } = useAppSelector((state) => state.program);

  useEffect(() => {
    if (!refContent.current) return;
    setBtnWidth(refContent.current);
  }, []);

  useEffect(() => {
    if (!refContent.current) return;
    if (!current) return;

    const listPanels = Array.from(
      refContent.current.querySelectorAll(`.${styleProgram.item}`),
    );

    listPanels.forEach((item) => {
      (item as HTMLElement).style.flexGrow = "0";
    });

    (listPanels[current] as HTMLElement).style.flexGrow = "1";
  }, [current]);

  return (
    <div
      ref={refContent}
      className={clsx(
        styleProgram.content,
        current && styleProgram.content_active,
      )}
    >
      {program.map((item, i) => (
        <ContentItem item={item} i={i} key={i} />
      ))}
    </div>
  );
};
export default Content;
