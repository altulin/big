/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import style from "@/components/Pass/Pass.module.scss";
import clsx from "clsx";

const EditContent: FC<{ children: any }> = ({ children }) => {
  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Редакирование работы" isBtn={false} />

      <div className={clsx(style.box__inner)}>
        <div className={clsx(style.sub)}>{children}</div>
      </div>
    </div>
  );
};
export default EditContent;
