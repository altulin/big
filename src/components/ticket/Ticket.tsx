import { FC, useEffect } from "react";
import style from "./Ticket.module.scss";
import clsx from "clsx";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { useFormik } from "formik";
import PassFormBuy from "../Pass/PassFormBuy";
import PassFormTotal from "../Pass/PassFormTotal";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { getValidationSchema } from "@/service/form/validation";
import { setCategory } from "@/store/category/categorySlice";
import { categories } from "../Pass/script";
import { useSendWorkMutation } from "@/store/rtk/orders/send_work";

const Ticket: FC = () => {
  const { tickets_amount } = useAppSelector((state) => state.pass);
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);
  const [sendWork, { status, error, data }] = useSendWorkMutation();

  const formik = useFormik({
    initialValues: {
      ticket: tickets_amount,
    },
    validationSchema: getValidationSchema(["ticket"]),
    onSubmit: (values) => {
      sendWork({ category });
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(setCategory(categories.only_tickets));

    return () => {
      dispatch(setCategory(categories.main_category));
    };
  }, [dispatch]);

  useEffect(() => {
    formik.setFieldValue("ticket", tickets_amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets_amount]);

  return (
    <div className={clsx(style.ticket)}>
      <ScrollBarComponent>
        <div className={clsx(style.ticket__inner)}>
          <form onSubmit={formik.handleSubmit}>
            <PassFormBuy formik={formik} />
            <PassFormTotal formik={formik} />
            <input type="hidden" name="ticket" />
          </form>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Ticket;
