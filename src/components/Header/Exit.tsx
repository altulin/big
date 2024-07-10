import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";
import IconExit from "@/images/header/exit.svg?react";
import useSignOut from "@/hooks/signOut";

const Exit: FC<{ className?: string }> = ({ className }) => {
  const { handleSignOut } = useSignOut();

  return (
    <button onClick={handleSignOut} className={clsx(style.exit, className)}>
      <IconExit />
    </button>
  );
};
export default Exit;
