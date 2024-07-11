/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SubmissionBox from "./SubmissionBox";
import SubmissionContent from "./SubmissionContent";
import Add from "@/UI/add/Add";
import PassFormRadioPitch from "./PassFormRadioPitch";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { setWorksAmount } from "@/store/pass/passSlice";

const PassFormSubmission: FC<{ formik?: any }> = ({ formik }) => {
  const { category } = useAppSelector((state) => state.category);
  const { works_amount } = useAppSelector((state) => state.pass);
  const dispatch = useAppDispatch();
  const [array, setArray] = useState<any>([""]);

  useEffect(() => {
    setTimeout(() => {
      setArray(new Array(works_amount).fill(""));
    }, 300);
  }, [works_amount]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        {category === categories.brand_pitches && (
          <PassFormRadioPitch formik={formik} name="categoryPitch" />
        )}

        {array.map((item: any, i: any) => (
          <SubmissionBox key={i}>
            <SubmissionContent formik={formik} id={i} />
          </SubmissionBox>
        ))}

        <Add
          label="Добавить еще работу"
          className={clsx(style.box__add)}
          onClick={() => dispatch(setWorksAmount(works_amount + 1))}
        />
      </div>
    </div>
  );
};
export default PassFormSubmission;
