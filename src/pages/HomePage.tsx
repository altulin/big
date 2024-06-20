import { FC } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Requirements from "@/components/Requirements/Requirements";

const HomePage: FC = () => {
  return (
    <>
      <Promo />
      <Steps />
      <Nominations />
      <SubmissionOfWorks />
      <Price />
      <Requirements />
    </>
  );
};
export default HomePage;
