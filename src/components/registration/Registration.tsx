/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import FormRegistration from "./Form";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import useGoogleManager from "@/hooks/googleManager";

const Registration: FC = () => {
  const { addEvent } = useGoogleManager();

  useEffect(() => {
    addEvent({ event: "registration-start" });
  }, [addEvent]);

  return (
    <div className={clsx(style.registration)}>
      <div className={clsx(style.registration__inner)}>
        <ScrollBarComponent>
          <FormRegistration />
        </ScrollBarComponent>
      </div>
    </div>
  );
};
export default Registration;
