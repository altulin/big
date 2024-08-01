/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const elements = data?.results.filter((el: any) => el.type === type);

    if (type === "general") {
      const orgList = data?.results
        .filter((el: any) => el.type === "organizer")
        .map((item: any) => {
          return {
            ...item,
            sub_title: "организатор",
          };
        });

      return [...orgList, ...elements];
    }
    return elements;
  };

  const types = ["general", "informational", "industrial"];

  return (
    <section id={paths.partners} className={clsx(style.partners, "panel")}>
      <div className={clsx(style.partners__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Партнеры и организаторы</span>
        </h2>

        <div className={clsx(style.partners__content)}>
          {checkArr(data?.results) &&
            types.map((item: any, i: number) => (
              <PartnersBlock key={i} list={filterResult(item)} type={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
