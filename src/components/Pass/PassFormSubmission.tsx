/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SubmissionBox from "./SubmissionBox";

const PassFormSubmission: FC<{ formik?: any }> = () => {
  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        <SubmissionBox />
      </div>
    </div>
  );
};
export default PassFormSubmission;
