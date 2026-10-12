/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, FormEvent, useEffect } from "react";
import style from "./Ticket.module.scss";
import clsx from "clsx";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import PassFormBuy from "../Pass/PassFormBuy";
import PassFormTotal from "../Pass/PassFormTotal";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tickets_amount <= 0) return;
    sendWork({ category, tickets_amount });
  };

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

    // return () => {
    // dispatch(setCategory(categories.main_category));
    // };
  }, [dispatch]);

  return (
    <div className={clsx(style.ticket)}>
      <ScrollBarComponent>
        <div className={clsx(style.ticket__inner)}>
          <form onSubmit={handleSubmit}>
            <PassFormBuy />
            {/* works_amount = 1, как и раньше: для покупки билетов сервер его не учитывает */}
            <PassFormTotal canSubmit={tickets_amount > 0} worksAmount={1} />
          </form>
        </div>
      </ScrollBarComponent>
    </div>
  );
};
export default Ticket;
