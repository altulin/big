import { FC } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import FormRegistration from "./Form";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";

const ServicePage: FC = () => {
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
export default ServicePage;
