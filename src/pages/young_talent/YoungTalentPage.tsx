/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect } from "react";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Criteria from "@/components/criteria/Criteria";
import clsx from "clsx";
import style from "../home/HomePage.module.scss";
import SliderHome from "../home/SliderHome";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import Contacts from "@/components/Contacts/Contacts";
import Cool from "@/components/Cool/Cool";
import { useAppDispatch } from "@/hooks/hook";
import { setYang } from "@/store/yang/yangSlice";
import { setPath } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";
import Requirements from "@/components/Requirements/Requirements";
import Shortlist from "@/components/short_list/Shortlist";
import { useCheckDeadline } from "@/components/jury_account_list/service";
import Nominations from "@/components/nominations/Nominations";

const pages: any = [
  <SubmissionOfWorks />,
  <Cool />,
  <Criteria />,
  <Price />,
  <Requirements />,
  <Contacts />,
];

const YoungTalentPage: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const { isShort } = useCheckDeadline();

  useEffect(() => {
    dispatch(setYang(true));
    dispatch(setPath(paths.young_talent));

    return () => {
      dispatch(setYang(false));
    };
  });

  const getPages = useCallback(() => {
    const arr = [...pages];
    arr.splice(2, 0, isShort ? <Shortlist /> : <Nominations />);

    // console.log(arr);
    return arr;
  }, [isShort]);

  return (
    <div className={clsx(style.home, "home")}>
      {isTablet &&
        getPages().map((item: any, i: number) => <div key={i}>{item}</div>)}

      {!isTablet && <SliderHome pages={getPages()} />}
    </div>
  );
};
export default YoungTalentPage;
