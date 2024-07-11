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
  onClick,
  type,
  btnDisabled,
}) => {
  const getType = (str: string) => {
    switch (str) {
      case "edit":
        return "button";
      case "save":
        return "submit";
      default:
        return "button";
    }
  };

  return (
    <div className={clsx(style.head)}>
      <h3 className={clsx(style.head__title)}>{title}</h3>

      {isBtn && type && (
        <button
          onClick={onClick}
          type={getType(type)}
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
