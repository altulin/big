/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Partners.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import PartnersBlock from "./PartnersBlock";
import { usePartnersQuery } from "@/store/rtk/partners/partners";
import { checkArr } from "@/service/checkArr";

const Partners: FC = () => {
  const { data } = usePartnersQuery(undefined);

  const filterResult = (type: string) => {
    return data?.results.filter((el: any) => el.type === type);
  };

  return (
    <section id={paths.partners} className={clsx(style.partners, "panel")}>
      <div className={clsx(style.partners__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Партнеры</span>
        </h2>

        {checkArr(data?.results) && (
          <>
            <PartnersBlock list={filterResult("general")} type="general" />
            <PartnersBlock
              list={filterResult("informational")}
              type="informational"
            />
            <PartnersBlock
              list={filterResult("industrial")}
              type="industrial"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Partners;
