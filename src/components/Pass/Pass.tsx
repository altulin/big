import clsx from "clsx";
import style from "./Pass.module.scss";
import { FC } from "react";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import PassForm from "./PassForm";

const Pass: FC = () => {
  return (
    <section className={clsx(style.pass)}>
      <ScrollBarComponent>
        <div className={clsx(style.pass__inner)}>
          <PassForm />
        </div>
      </ScrollBarComponent>
    </section>
  );
};

export default Pass;
