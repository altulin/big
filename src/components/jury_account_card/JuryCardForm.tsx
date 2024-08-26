import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./JuryCard.module.scss";
import { radio_list } from "./service";
import Radio from "../registration/Radio";
import Button from "../modal/template/Button";
import { useVoteWorkMutation } from "@/store/rtk/jury/vote";

const JuryCardForm: FC<{ id_work?: number; is_reviewed?: boolean }> = ({
  id_work,
  is_reviewed,
}) => {
  const [voteWork] = useVoteWorkMutation();

  return (
    <Formik
      initialValues={{
        vote: radio_list[0].value,
      }}
      onSubmit={(values) => {
        voteWork({ id_work, body: values });
      }}
    >
      {() => {
        return (
          <Form className={clsx(style.form)}>
            <div className={clsx(style.form__radio)}>
              {radio_list.map((item, i) => (
                <Radio
                  key={i}
                  name="vote"
                  label={item.label}
                  value={item.value}
                  disabled={is_reviewed}
                />
              ))}
            </div>

            <Button
              className={clsx(style.form__submit)}
              type="submit"
              label="голосовать"
              modifier="green"
              disabled={is_reviewed}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
export default JuryCardForm;
