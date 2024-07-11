/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetPriceQuery } from "@/store/rtk/orders/price";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { setErrorModal } from "@/store/modal/modalSlice";
import useSignOut from "./signOut";

const usePrice = () => {
  const { category } = useAppSelector((state) => state.category);
  const { tickets_amount } = useAppSelector((state) => state.pass);
  const { forms } = useAppSelector((state) => state.form);
  const [getPrice, { data, status, error }] = useLazyGetPriceQuery();
  const dispatch = useAppDispatch();
  const { handleSignOut } = useSignOut();

  useEffect(() => {
    if (status === "rejected") {
      if ((error as any)?.status === 401) {
        dispatch(setErrorModal("Произошла ошибка. Необходимо авторизоваться"));
        handleSignOut();
      }
      return;
    }

    if (status === "fulfilled") {
      return;
    }
  }, [data, status]); // eslint-disable-line

  useEffect(() => {
    getPrice({ category, tickets_amount, works_amount: forms.length });
  }, [category, forms.length, getPrice, tickets_amount]);

  return { data };
};

export default usePrice;
