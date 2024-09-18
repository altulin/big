import clsx from "clsx";
import style from "./Shortlist.module.scss";
import { FC } from "react";
import useIsYang from "@/hooks/isYang";
import { paths } from "@/service/paths";
import ShortSelect from "./select/ShortSelect";

const Shortlist: FC = () => {
  const { isYang } = useIsYang();
  return (
    <section
      id={isYang ? paths.shortlist_young : paths.shortlist}
      className={clsx(style.shortlist, "panel")}
    >
      <div className={clsx(style.shortlist__inner)}>
        <div className={clsx(style.shortlist__header)}>
          <h2 className={clsx(style.shortlist__title)}>шорт-лист</h2>
          <ShortSelect />
        </div>
      </div>
    </section>
  );
};

export default Shortlist;
