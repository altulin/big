import { FC } from "react";
import style from "./Ticket.module.scss";
import clsx from "clsx";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { Form, Formik } from "formik";
import PassFormBuy from "../Pass/PassFormBuy";
import PassFormTotal from "../Pass/PassFormTotal";
import { useAppSelector } from "@/hooks/hook";
import { getValidationSchema } from "@/service/form/validation";

const Ticket: FC = () => {
  const { tickets_amount } = useAppSelector((state) => state.pass);

  return (
    <div className={clsx(style.ticket)}>
      <ScrollBarComponent>
        <div className={clsx(style.ticket__inner)}>
          <Formik
            initialValues={{ ticket: 0 }}
            validationSchema={getValidationSchema(["ticket"])}
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <PassFormBuy formik={formik} />
                <PassFormTotal formik={formik} />
                <input type="hidden" name="ticket" value={tickets_amount} />
              </Form>
            )}
          </Formik>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Ticket;
