/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Criteria from "@/components/criteria/Criteria";
import Jury from "@/components/jury/Jury";
import clsx from "clsx";
import style from "../home/HomePage.module.scss";
import Program from "@/components/program/Program";
import SliderHome from "../home/SliderHome";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import Festival from "@/components/Festival/Festival";
import Contacts from "@/components/Contacts/Contacts";
import Faq from "@/components/Faq/Faq";
import Pitch from "@/components/Pitch/Pitch";
import JuryMain from "@/components/JuryMain/JuryMain";
import Partners from "@/components/Partners/Partners";
import Cool from "@/components/Cool/Cool";
import { useAppDispatch } from "@/hooks/hook";
import { setYang } from "@/store/yang/yangSlice";
import { setPath } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";
import Requirements from "@/components/Requirements/Requirements";

export const pages: any = [
  // <Promo />,
  // <Steps />,

  // <Pitch />,
  <SubmissionOfWorks />,
  <Cool />,
  <Nominations />,

  <Criteria />,
  <Price />,
  <Requirements />,

  // <JuryMain />,
  // <Jury />,
  // <Program />,
  // <Festival />,
  // <Partners />,
  // <Faq />,
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
