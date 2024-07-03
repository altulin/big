/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";
import IconEdit from "@/images/profile/edit.svg?react";
import IconSave from "@/images/profile/save.svg?react";

const EditBtnLabel: FC = () => {
  return (
    <>
      <IconEdit /> <span>Редактировать</span>
    </>
  );
};

const SaveBtnLabel: FC = () => {
  return (
    <>
      <IconSave /> <span>Сохранить</span>
    </>
  );
};

interface IProfileBoxHead {
  title: string;
  isBtn: boolean;
  btnType?: "button" | "submit";
  btnDisabled?: boolean;
  onClick?: any;
  type?: "edit" | "save";
}

const ProfileBoxHead: FC<IProfileBoxHead> = ({
  title,
  isBtn = false,
  btnType = "submit",
  onClick,
  type,
  btnDisabled,
}) => {
  return (
    <div className={clsx(style.head)}>
      <h3 className={clsx(style.head__title)}>{title}</h3>

      {isBtn && (
        <button
          onClick={onClick}
          type={btnType}
          className={clsx(style.head__button)}
          disabled={btnDisabled}
        >
          {type === "edit" && <EditBtnLabel />}
          {type === "save" && <SaveBtnLabel />}
        </button>
      )}
    </div>
  );
};
export default ProfileBoxHead;
