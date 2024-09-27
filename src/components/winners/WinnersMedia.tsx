import { FC } from "react";
import style from "./Winners.module.scss";
import clsx from "clsx";
import WinnersLink from "./VideoLink";
import ReactPlayer from "react-player";
import WinnersPLayer from "./WinnersPlayer";

export interface IWinnersMedia {
  video: string | null;
  project_image_url: string | null;
  work_link: string;
}

const WinnersMedia: FC<IWinnersMedia> = ({ ...props }) => {
  const { project_image_url, video } = props;

  const style_bg = {
    backgroundImage: project_image_url ? `url(${project_image_url})` : "none",
  };

  return (
    <div className={clsx(style.media)}>
      <div
        className={clsx(
          style.media__inner,
          !project_image_url && style["media__inner--image"],
        )}
      >
        {video && ReactPlayer.canPlay(video) ? (
          <WinnersPLayer {...props} />
        ) : (
          <div
            className={clsx(
              style.media__bg,
              !project_image_url && style["media__bg--image"],
            )}
            style={style_bg}
          >
            <WinnersLink {...props} />
          </div>
        )}
      </div>
    </div>
  );
};
export default WinnersMedia;
