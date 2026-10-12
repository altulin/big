import clsx from "clsx";
import { FC } from "react";
import style from "./Pass.module.scss";
import { radioListPitch } from "./script";
import RadioButton from "../form/RadioButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setCategoryPitch } from "@/store/category/categorySlice";

const PassFormRadioPitch: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryPitch } = useAppSelector((state) => state.category);

  return (
    <div className={clsx(style.radio, style["radio--pitch"])}>
      {radioListPitch.map((item) => (
        <RadioButton
          key={item.value}
          label={item.label}
          value={item.value}
          name="categoryPitch"
          checked={categoryPitch === item.value}
          onSelect={(value) => dispatch(setCategoryPitch(value))}
          icon={<item.icon />}
        />
      ))}
    </div>
  );
};
export default PassFormRadioPitch;
