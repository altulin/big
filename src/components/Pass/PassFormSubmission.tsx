/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SubmissionBox from "./SubmissionBox";
import SubmissionContent from "./SubmissionContent";
import Add from "@/UI/add/Add";
import PassFormRadioPitch from "./PassFormRadioPitch";
import { useAppSelector } from "@/hooks/hook";
import { categories } from "./script";
import { FieldArray, useFormikContext } from "formik";
import { useInitialValues } from "./formService";

const PassFormSubmission: FC = () => {
  const { category } = useAppSelector((state) => state.category);
  const { getProperties } = useInitialValues();

  const { values } = useFormikContext<{ fields: unknown[] }>();

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Подача работы " isBtn={false} />

      <div className={clsx(style.box__inner)}>
        {category === categories.brand_pitches && <PassFormRadioPitch />}

        <FieldArray name="fields">
          {({ push, remove }) => {
            return (
              <>
                {values.fields.length > 0 &&
                  values.fields.map((_, i) => {
                    return (
                      <SubmissionBox key={i} id={i} remove={remove}>
                        <SubmissionContent id={i} />
                      </SubmissionBox>
                    );
                  })}

                <Add
                  label="Добавить еще работу"
                  className={clsx(style.box__add)}
                  onClick={() => {
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
