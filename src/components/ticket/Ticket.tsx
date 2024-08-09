/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useProfile from "@/hooks/profile";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import useWidget from "../Pass/widget";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";
import useSignOut from "@/hooks/signOut";

const Ticket: FC = () => {
  const { tickets_amount } = useAppSelector((state) => state.pass);
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);
  const [sendWork, { status, error, data }] = useSendWorkMutation();
  const { isIndividual } = useProfile();
  const navigate = useNavigate();
  const { runWidget } = useWidget();
  const { handleSignOut } = useSignOut();

  const formik = useFormik({
    initialValues: {
      ticket: tickets_amount,
    },
    validationSchema: getValidationSchema(["ticket"]),
    onSubmit: (values) => {
      sendWork({ category, tickets_amount });
      console.log(values);
    },
  });

  useEffect(() => {
    if (status === "fulfilled") {
      navigate(`/${paths.profile}`);
      if (status === "fulfilled") {
        if (isIndividual) {
          if (data.transaction !== null) {
            runWidget(data);
          } else {
            // dispatch(
            //   setSuccessModal({
            //     text: "Ваша работа принята на рассмотрение!",
            //     title: "Подача работы",
            //     profile: true,
            //   }),
            // );
          }
        } else {
          dispatch(
            setSuccessModal({
              text: "На вашу почту будет отправлен счет-оферта для оплаты!",
              title: "Покупка билета",
              profile: true,
            }),
          );
        }
      }
    }

    if (status === "rejected") {
      if ((error as any)?.status === 401) {
        dispatch(setErrorModal("Произошла ошибка. Необходимо авторизоваться"));
        handleSignOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
