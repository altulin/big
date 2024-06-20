import { FC } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Requirements from "@/components/requirements/Requirements";
import Criteria from "@/components/criteria/Criteria";
import Jury from "@/components/jury/Jury";
import Program from "@/components/program/Program";

const HomePage: FC = () => {
  return (
    <>
      <Promo />
      <Steps />
      <Nominations />
      <SubmissionOfWorks />
      <Price />
      <Requirements />
      <Criteria />
      <Jury />
      <Program />
    </>
  );
};
export default HomePage;
