import { FC } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import FormRegistration from "./Form";
import { useAppSelector } from "@/hooks/hook";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";

const ServicePage: FC = () => {
  const { status } = useAppSelector((state) => state.reg);

  return (
    <div className={clsx(style.registration)}>
      <div className={clsx(style.registration__inner)}>
        {status === "individual" ? (
          <FormRegistration />
        ) : (
          <ScrollBarComponent>
            <FormRegistration />
          </ScrollBarComponent>
        )}
      </div>
    </div>
  );
};
export default ServicePage;
