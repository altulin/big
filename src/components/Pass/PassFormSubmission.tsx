/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SubmissionBox from "./SubmissionBox";
import SubmissionContent from "./SubmissionContent";
import Add from "@/UI/add/Add";
import PassFormRadioPitch from "./PassFormRadioPitch";
import { useAppSelector } from "@/hooks/hook";
import { categories } from "./script";

const PassFormSubmission: FC<{ formik?: any }> = ({ formik }) => {
  const [listCount, setListCount] = useState(1);
  const { category } = useAppSelector((state) => state.category);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        {category === categories.brand_pitches && (
          <PassFormRadioPitch formik={formik} name="categoryPitch" />
        )}

        {[...Array(listCount)].map((_, i) => (
          <SubmissionBox key={i}>
            <SubmissionContent formik={formik} />
          </SubmissionBox>
        ))}

        <Add
          label="Добавить еще работу"
          className={clsx(style.box__add)}
          onClick={() => setListCount(listCount + 1)}
        />
      </div>
    </div>
  );
};
export default PassFormSubmission;
