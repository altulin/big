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
import { setAddForm } from "@/store/forms/formsSlice";
import { FieldArray } from "formik";
import { useInitialValues } from "./formService";

const PassFormSubmission: FC<{ formik?: any }> = ({ formik }) => {
  const { category } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const { getProperties } = useInitialValues();

  const { values } = formik;

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        {category === categories.brand_pitches && (
          <PassFormRadioPitch formik={formik} name="categoryPitch" />
        )}

        <FieldArray name="fields">
          {({ push, remove }) => {
            return (
              <>
                {values.fields.length > 0 &&
                  values.fields.map((item: any, i: any) => {
                    return (
                      <SubmissionBox key={i} id={i} remove={remove}>
                        <SubmissionContent formik={formik} id={i} />
                      </SubmissionBox>
                    );
                  })}

                <Add
                  label="Добавить еще работу"
                  className={clsx(style.box__add)}
                  onClick={() => {
                    dispatch(setAddForm());
                    push(getProperties());
                  }}
                />
              </>
            );
          }}
        </FieldArray>
      </div>
    </div>
  );
};
export default PassFormSubmission;
