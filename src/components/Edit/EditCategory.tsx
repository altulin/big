import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import style from "@/components/Pass/Pass.module.scss";
import clsx from "clsx";
import { getCategory } from "../profile/service";
import styleEdit from "./Edit.module.scss";

const EditCategory: FC<{ category: string }> = ({ category }) => {
  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Категория" isBtn={false} />

      <div className={clsx(style.box__inner)}>
        <p className={clsx(styleEdit.text)}>{getCategory(category)}</p>
      </div>
    </div>
  );
};
export default EditCategory;
