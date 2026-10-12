/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetPriceQuery } from "@/store/rtk/orders/price";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { setErrorModal } from "@/store/modal/modalSlice";
import useSignOut from "./signOut";

// worksAmount — количество работ в форме (values.fields.length в Formik)
const usePrice = (worksAmount: number) => {
  const { category } = useAppSelector((state) => state.category);
  const { tickets_amount } = useAppSelector((state) => state.pass);
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
    getPrice({ category, tickets_amount, works_amount: worksAmount });
  }, [category, worksAmount, getPrice, tickets_amount]);

  return { data };
};

export default usePrice;
