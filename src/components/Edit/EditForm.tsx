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
import { getBase64 } from "../Pass/payLoadServise";

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

  const convertBase = async (values: any) => {
    const body: any = {};
    Object.keys(values.fields[0]).forEach(async (key) => {
      if (key === "project_image") {
        body[key] = await getBase64(values.fields[0].project_image);
        return;
      }
      body[key] = values.fields[0][key];
    });

    return body;
  };

  return (
    <Formik
      initialValues={{ fields: [getProperties(data)] }}
      validationSchema={createValidationSchema("edit")}
      onSubmit={async (values) => {
        convertBase(values).then((res) => {
          setTimeout(() => {
            changeWork({ id_work, body: res });
          }, 500);
        });

        // changeWork({ id_work, body });
      }}
      enableReinitialize
    >
      {(formik) => {
        console.log(formik.values);
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
