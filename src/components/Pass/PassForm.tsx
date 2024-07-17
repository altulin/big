/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";
import PassFormBuy from "./PassFormBuy";
import PassFormTotal from "./PassFormTotal";
import { useInitialValues } from "./formService";
import { useSendWorkMutation } from "@/store/rtk/orders/send_work";
import useWidget from "./widget";
import makeArrayPayLoad, { getBase64 } from "./payLoadServise";
import { categories } from "./script";
import useProfile from "@/hooks/profile";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";
import { useDispatch } from "react-redux";
import useSignOut from "@/hooks/signOut";

const PassForm: FC = () => {
  const { createValidationSchema, getProperties } = useInitialValues();
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const [sendWork, { status, error, data }] = useSendWorkMutation();
  const { isIndividual } = useProfile();
  const dispatch = useDispatch();
  const { handleSignOut } = useSignOut();
  const { runWidget } = useWidget();
  const { tickets_amount } = useAppSelector((state) => state.pass);

  const makePayLoad = async (values: any) => {
    const { category, fields } = values;
    const { works } = await makeArrayPayLoad(category, categoryPitch, fields);
    const body: any = { tickets_amount, category, works };
    if (categoryPitch) {
      body.pitch_brand = categoryPitch;
    }
    return body;
  };

  const convertBase = async (body: any) => {
    body.works.forEach(async (item: any) => {
      if (item.project_image) {
        item.project_image = await getBase64(item.project_image);
      }

      if (item.file) {
        item.script = await getBase64(item.file);
      }
    });

    return body;
  };

  useEffect(() => {
    if (status === "fulfilled") {
      if (category === categories.brand_pitches) {
        dispatch(
          setSuccessModal({
            text: "Ваша работа принята на рассмотрение!",
            title: "Подача работы",
            profile: true,
          }),
        );

        return;
      }
      if (isIndividual) {
        const amount = data.transaction.amount;
        const accountId = data.transaction.user.id;
        const email = data.transaction.user.email;
        const invoiceId = data.id;
        const idempotence_key = data.transaction.idempotence_key;
        runWidget({ amount, accountId, invoiceId, email, idempotence_key });
      } else {
        dispatch(
          setSuccessModal({
            text: "Ваша работа принята, на вашу почту будет отправлен счет-оферта для оплаты!",
            title: "Подача работы",
            profile: true,
          }),
        );
      }
    }
  }, [status]);

  useEffect(() => {
    if (status === "rejected") {
      if ((error as any)?.status === 401) {
        dispatch(setErrorModal("Произошла ошибка. Необходимо авторизоваться"));
        handleSignOut();
      }
    }
  }, [dispatch, error, status]); // eslint-disable-line

  return (
    <Formik
      initialValues={{
        category: category || "",
        categoryPitch: categoryPitch || "",
        tickets_amount: "",

        fields: [getProperties()],
      }}
      validationSchema={createValidationSchema("pass")}
      onSubmit={async (values, { resetForm }) => {
        const body = await makePayLoad(values);
        await convertBase(body).then((res) =>
          setTimeout(() => {
            sendWork(res)
              .unwrap()
              .then(() => resetForm());
          }, 500),
        );
      }}
      enableReinitialize
    >
      {(formik) => {
        // console.log(formik.values.fields);
        return (
          <>
            <Form className={clsx(style.form)}>
              <PassFormRadio formik={formik} />
              <PassFormSubmission formik={formik} />
              <PassFormBuy formik={formik} />
              <PassFormTotal formik={formik} />
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
export default PassForm;
