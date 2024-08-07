import { FC } from "react";
import style from "./Ticket.module.scss";
import clsx from "clsx";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { Formik } from "formik";
import PassFormBuy from "../Pass/PassFormBuy";
import PassFormTotal from "../Pass/PassFormTotal";

const Ticket: FC = () => {
  return (
    <div className={clsx(style.ticket)}>
      <ScrollBarComponent>
        <div className={clsx(style.ticket__inner)}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {(formik) => (
              <>
                <PassFormBuy />
                <PassFormTotal formik={formik} />
              </>
            )}
          </Formik>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Ticket;
