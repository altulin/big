/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Requirements from "@/components/requirements/Requirements";
import Criteria from "@/components/criteria/Criteria";
import Jury from "@/components/jury/Jury";
import clsx from "clsx";
import style from "./HomePage.module.scss";
import Program from "@/components/program/Program";
import SliderHome from "./SliderHome";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import Festival from "@/components/Festival/Festival";
import Contacts from "@/components/Contacts/Contacts";
import Faq from "@/components/Faq/Faq";
import Pitch from "@/components/Pitch/Pitch";
import JuryMain from "@/components/JuryMain/JuryMain";
import Partners from "@/components/Partners/Partners";

export const pages: any = [
  // <Promo />,
  // <Steps />,
  // <Nominations />,
  // <Pitch />,
  // <SubmissionOfWorks />,
  // <Price />,
  // <Requirements />,
  // <Criteria />,
  // <JuryMain />,
  // <Jury />,
  <Program />,
  // <Festival />,
  // <Partners />,
  // <Faq />,
  // <Contacts />,
];

const HomePage: FC = () => {
  const isTablet = useIsTabletDevice();

  return (
    <div className={clsx(style.home, "home")}>
      {isTablet &&
        pages.map((item: any, i: number) => <div key={i}>{item}</div>)}

      {!isTablet && <SliderHome pages={pages} />}
    </div>
  );
};
export default HomePage;
