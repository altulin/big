import { useAppDispatch } from "@/hooks/hook";
import useProfile from "@/hooks/profile";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useWidget = () => {
  const widget = new (window as any).cp.CloudPayments();
  const dispatch = useAppDispatch();
  const { isIndividual } = useProfile();

  const runWidget = (data: any) => {
    const amount = data.transaction.amount;
    const accountId = data.transaction.user.id;
    const email = data.transaction.user.email;
    const invoiceId = data.id;
    const idempotence_key = data.transaction.idempotence_key;

    widget.pay(
      "charge", // или 'charge'
      {
        //options
        publicId: import.meta.env.VITE_APP_API_PUBLIC_ID, //id из личного кабинета
        description: "Оплата заявки", //назначение
        amount, //сумма
        currency: "RUB", //валюта
        accountId, //идентификатор плательщика (необязательно)
        invoiceId, //номер заказа  (необязательно)
        email, //email плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        data: {
          idempotence_key,
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
            // window.location.replace(`/${paths.profile}`);
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
