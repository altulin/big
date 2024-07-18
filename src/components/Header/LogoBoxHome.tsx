import { useAppSelector } from "@/hooks/hook";
import { paths } from "@/service/paths";
import { FC } from "react";
import LogoAnime from "./LogoAnime";
import Logo from "./Logo";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const LogoBoxHome: FC = () => {
  const isTablet = useIsTabletDevice();
  const { path } = useAppSelector((state) => state.menu);

  if (isTablet) return <Logo parent={"header"} />;

  return (
    <>
      {path === paths.promo || path === null ? (
        <Logo parent={"header"} />
      ) : (
        <LogoAnime />
      )}
    </>
  );
};
export default LogoBoxHome;
