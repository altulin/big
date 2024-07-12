import { useAppDispatch } from "@/hooks/hook";
import useProfile from "@/hooks/profile";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useWidget = () => {
  const widget = new (window as any).cp.CloudPayments();
  const dispatch = useAppDispatch();
  const { isIndividual } = useProfile();

  const runWidget = () => {
    widget.pay(
      "charge", // или 'charge'
      {
        //options
        publicId: "pk_a3f1f232462173983749ca15b31f4", //id из личного кабинета
        description: "Оплата заявки", //назначение
        amount: 17000, //сумма
        currency: "RUB", //валюта
        accountId: 11, //идентификатор плательщика (необязательно)
        invoiceId: 19, //номер заказа  (необязательно)
        email: "kastiel427.nexus@gmail.com", //email плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        data: {
          idempotence_key: "e7379fd1-2a23-4146-b61e-3f6d7efde1fe",
        },
      },
      {
        onSuccess: function () {
          if (isIndividual) {
            dispatch(
              setSuccessModal({
                text: "Ваша работа оплачена и принята! Список поданных работ можно просмотреть в профиле.",
                comein: true,
              }),
            );
          }
          // success
          //действие при успешной оплате
        },
        onFail: function () {
          if (isIndividual) {
            dispatch(
              setErrorModal(
                "Оплата не прошла! Анкета вашей работы сохранена в черновиках. Попробуйте, пожалуйста, оплатить еще раз!",
              ),
            );
          }
          // fail
          //действие при неуспешной оплате
        },
        // onComplete: function (paymentResult, options) {
        //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        //например вызов вашей аналитики Facebook Pixel
        // },
      },
    );
  };

  return { runWidget };
};

export default useWidget;
