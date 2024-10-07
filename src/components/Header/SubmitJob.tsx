import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { setMenuControl } from "@/store/menu/menuSlice";
import { useAppDispatch } from "@/hooks/hook";
import useIsYang from "@/hooks/isYang";

const SubmitJob: FC<{ className?: string }> = ({ className }) => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const { isYang } = useIsYang();

  const handleClick = () => {
    if (isTablet) {
      dispatch(setMenuControl(false));
    }
  };

  return (
    <a
      className={clsx(style.event, className, isYang && style["event--dark"])}
      onClick={handleClick}
      href="https://nuum.ru/streams/3562975-tseremoniia-nagrazhdeniia-big-picture-festival-by-grape-2024"
      target="_blank"
    >
      Смотреть церемонию
    </a>
  );
};
export default SubmitJob;
