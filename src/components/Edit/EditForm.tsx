/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import SubmissionContent from "../Pass/SubmissionContent";
import { useInitialValues } from "../Pass/formService";
import Button from "../modal/template/Button";
import style from "./Edit.module.scss";
import clsx from "clsx";
import { useChangeWorkMutation } from "@/store/rtk/orders/change_work";
import { useParams } from "react-router-dom";
import { setSuccessModal } from "@/store/modal/modalSlice";
import { useAppDispatch } from "@/hooks/hook";

const EditForm: FC<{ data?: any }> = ({ data }) => {
  const { createValidationSchema, getProperties } = useInitialValues();
  const [changeWork, { status }] = useChangeWorkMutation();
  const { id_work } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(
        setSuccessModal({
          text: "Данные успешно обновлены",
          profile: true,
          title: "Редактирование работы",
        }),
      );
    }
  }, [dispatch, status]);

  return (
    <Formik
      initialValues={{ fields: [getProperties(data)] }}
      validationSchema={createValidationSchema("edit")}
      onSubmit={(values) => {
        const formData = new FormData();
        Object.keys(values.fields[0]).forEach((key) => {
          if (key === "project_image") {
            if (values.fields[0][key] instanceof File) {
              formData.append(key, values.fields[0][key]);
            } else {
              return;
            }
          }
          formData.append(key, values.fields[0][key]);
        });
        changeWork({ id_work, body: formData });
      }}
    >
      {(formik) => {
        return (
          <Form>
            <SubmissionContent formik={formik} id={0} />
            <Button
              type="submit"
              className={clsx(style.button)}
              label="сохранить"
              modifier="green"
              disabled={!formik.isValid}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
export default EditForm;
