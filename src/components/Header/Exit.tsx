import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconExit from "@/images/header/exit.svg?react";
import useExit from "@/hooks/exit";

const Exit: FC = () => {
  const handleExit = useExit();

  return (
    <button onClick={handleExit} className={clsx(style.exit)}>
      <IconExit />
    </button>
  );
};
export default Exit;
