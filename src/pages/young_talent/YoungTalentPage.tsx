/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import Nominations from "@/components/nominations/Nominations";
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
import Shortlist from "@/components/shortlist/Shortlist";

export const pages: any = [
  <Shortlist />,
  <SubmissionOfWorks />,
  <Cool />,
  <Nominations />,
  <Criteria />,
  <Price />,
  <Requirements />,
  <Contacts />,
];

const YoungTalentPage: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setYang(true));
    dispatch(setPath(paths.young_talent));

    return () => {
      dispatch(setYang(false));
    };
  });

  return (
    <div className={clsx(style.home, "home")}>
      {isTablet &&
        pages.map((item: any, i: number) => <div key={i}>{item}</div>)}

      {!isTablet && <SliderHome pages={pages} />}
    </div>
  );
};
export default YoungTalentPage;
