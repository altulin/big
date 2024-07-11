/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SubmissionBox from "./SubmissionBox";
import SubmissionContent from "./SubmissionContent";
import Add from "@/UI/add/Add";
import PassFormRadioPitch from "./PassFormRadioPitch";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { checkArr } from "@/service/checkArr";
import { setAddForm } from "@/store/forms/formsSlice";

const PassFormSubmission: FC<{ formik?: any }> = ({ formik }) => {
  const { category } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const { forms } = useAppSelector((state) => state.form);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        {category === categories.brand_pitches && (
          <PassFormRadioPitch formik={formik} name="categoryPitch" />
        )}

        {checkArr(forms) &&
          forms &&
          forms.map((item: any, i: any) => {
            return (
              <SubmissionBox key={i} id={item.id}>
                <SubmissionContent formik={formik} id={i} />
              </SubmissionBox>
            );
          })}

        <Add
          label="Добавить еще работу"
          className={clsx(style.box__add)}
          onClick={() => {
            dispatch(setAddForm());
          }}
        />
      </div>
    </div>
  );
};
export default PassFormSubmission;
