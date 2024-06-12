import style from "./Logo.module.scss";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import ImgWithFallback from "../image/img_webp";

function Logo({ parent }) {
  return (
    <HashLink
      className={clsx(style.logo, style[`logo--${parent}`])}
      to={"/#top"}
      aria-label="logo"
      smooth
    >
      <ImgWithFallback />
    </HashLink>
  );
}

export default Logo;
