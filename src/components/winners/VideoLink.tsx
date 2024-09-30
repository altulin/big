import clsx from "clsx";
import { FC } from "react";
import style from "./Winners.module.scss";
import IconPlayLink from "@/images/jury_account/control_link.svg?react";
import { IWinnersMedia } from "./WinnersMedia";

const WinnersLink: FC<IWinnersMedia> = ({
  work_link: link,
  project_image_url: image_url,
}) => {
  return (
    <div className={clsx(style.link, !image_url && style["link--image"])}>
      {image_url ? (
        <div
          className={clsx(
            style.control_link,
            image_url && style["control_link--image"],
          )}
        ></div>
      ) : (
        <a
          href={link}
          className={clsx(
            style.control_link,
            image_url && style["control_link--image"],
          )}
          target="_blank"
        >
          <span className={clsx(style.control_link__icon)}>
            <IconPlayLink />
          </span>
          <span className={clsx(style.control_link__content)}>
            <span className={clsx(style.control_link__label)}>{link}</span>
          </span>
        </a>
      )}
    </div>
  );
};
export default WinnersLink;
