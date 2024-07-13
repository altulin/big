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
// import useWidget from "./widget";
import makeArrayPayLoad from "./payLoadServise";
import { categories, categoriesPitshes } from "./script";
import useProfile from "@/hooks/profile";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";
import { useDispatch } from "react-redux";
import useSignOut from "@/hooks/signOut";

const PassForm: FC = () => {
  const { createValidationSchema, getProperties } = useInitialValues();
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const [sendWork, { status, error }] = useSendWorkMutation();
  const { isIndividual } = useProfile();
  const dispatch = useDispatch();
  const { handleSignOut } = useSignOut();
  // const { runWidget } = useWidget();

  const makePayLoad = (values: any) => {
    const { category, fields } = values;
    const { works } = makeArrayPayLoad(category, categoryPitch, fields);
    const body: any = { category, works };

    if (categoryPitch === categoriesPitshes.mega) {
      body.pitch_brand = "mega_market";
    }

    if (categoryPitch === categoriesPitshes.nuum) {
      body.pitch_brand = "nuum";
    }

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
        // runWidget();
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
        fields: [getProperties()],
      }}
      validationSchema={createValidationSchema()}
      onSubmit={async (values, { resetForm }) => {
        sendWork(makePayLoad(values))
          .unwrap()
          .then(() => {
            // resetForm();
          })
          .catch((e) => {
            console.log(2);
          });
      }}
      enableReinitialize
    >
      {(formik) => {
        // console.log(formik.values.fields[0]);
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
