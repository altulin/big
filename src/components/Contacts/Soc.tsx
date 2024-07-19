import { FC } from "react";
import style from "./Contacts.module.scss";
import clsx from "clsx";
import { soc } from "./data";

const Soc: FC<{ className?: string }> = ({ className }) => {
  return (
    <ul className={clsx(style.soc, className)}>
      {soc.map((item, i) => (
        <a
          className={clsx(style.soc__link)}
          href={item.href}
          aria-label="Соц. сети"
          key={i}
          target="_blank"
        >
          {<item.icon />}
        </a>
      ))}
    </ul>
  );
};
export default Soc;
