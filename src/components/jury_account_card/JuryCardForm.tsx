import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import { radio_list } from "./service";
import Radio from "../registration/Radio";
import Button from "../modal/template/Button";

const JuryCardForm: FC = () => {
  return (
    <Formik
      initialValues={{
        work: radio_list[0].value,
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => {
        return (
          <Form className={clsx(style.form)}>
            <div className={clsx(style.form__radio)}>
              {radio_list.map((item, i) => (
                <Radio
                  key={i}
                  name="work"
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <Button
              className={clsx(style.form__submit)}
              type="submit"
              label="голосовать"
              modifier="green"
            />
          </Form>
        );
      }}
    </Formik>
  );
};
export default JuryCardForm;
