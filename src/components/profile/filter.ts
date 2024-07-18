/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetListQuery } from "@/store/rtk/orders/list";
import { useEffect } from "react";
import { statuses } from "./service";
import useProfile from "@/hooks/profile";

const useFilterList = () => {
  const [getListApp, { data, status }] = useLazyGetListQuery();
  const { isIndividual } = useProfile();

  useEffect(() => {
    getListApp({ limit: 100, offset: 0 });
  }, [getListApp]);

  const getPaymentError = (list: any) => {
    const payment_error = list.filter(
      (item: any) => item.status === statuses.payment_error,
    );
    return payment_error;
  };

  const getCost = (list: any) => {
    const cost = list.filter(
      (item: any) => item.cost !== 0 && item.status === statuses.created,
    );
    return cost;
  };

  const sortArr = (arr: any) => {
    return arr.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  };

  const getMyApplications = () => {
    if (status !== "fulfilled") return;
    const dataList = data?.results;
    // оплачен
    const paid = dataList.filter((item: any) => item.status === statuses.paid);
    // стоимость = 0
    const accepted = dataList.filter((item: any) => item.cost === 0);
    const myList = [...paid, ...accepted];
    // ошибка оплаты для юриков
    !isIndividual && myList.push(...getPaymentError(dataList));
    // создан и не бесплатный для юриков
    !isIndividual && myList.push(...getCost(dataList));
    const sortMyArr = sortArr(myList);
    return sortMyArr;
  };

  const getMyDrafts = () => {
    if (status !== "fulfilled") return;
    const dataList = data?.results;
    const myList = [];
    // ошибка оплаты для физиков
    isIndividual && myList.push(...getPaymentError(dataList));
    // создан и не бесплатный для физиков
    isIndividual && myList.push(...getCost(dataList));
    const sortMyArr = sortArr(myList);
    return sortMyArr;
  };

  return { my_applications: getMyApplications(), my_drafts: getMyDrafts() };
};

export default useFilterList;
