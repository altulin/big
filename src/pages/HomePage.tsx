import { FC } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";

const HomePage: FC = () => {
  return (
    <>
      <Promo />
      <Steps />
      <Nominations />
    </>
  );
};
export default HomePage;
