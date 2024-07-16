/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyGetListQuery } from "@/store/rtk/orders/list";
import { useEffect } from "react";
import { statuses } from "./service";

const useFilterList = () => {
  const [getListApp, { data }] = useLazyGetListQuery();

  useEffect(() => {
    getListApp({ limit: 100, offset: 0 });
  }, [getListApp]);

  const defaultList = data?.results;
  let draftList = [];
  let paidList = [];

  if (defaultList) {
    draftList = defaultList.filter(
      (el: any) =>
        el.status === statuses.created || el.status === statuses.payment_error,
    );

    paidList = defaultList.filter((el: any) => el.status === statuses.paid);
  }

  return { defaultList, paidList, draftList };
};

export default useFilterList;
