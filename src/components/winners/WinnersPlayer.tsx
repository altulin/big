import clsx from "clsx";
import { FC } from "react";
import style from "./Winners.module.scss";
import ReactPlayer from "react-player";
import { IWinnersMedia } from "./WinnersMedia";

const Light: FC<Pick<IWinnersMedia, "project_image_url">> = ({ ...props }) => {
  const { project_image_url } = props;

  const style_bg = {
    backgroundImage: project_image_url ? `url(${project_image_url})` : "none",
  };

  return <div className={clsx(style.light)} style={style_bg}></div>;
};

const Icon = () => {
  return (
    <div className={clsx(style.icon)}>
      <span className={clsx(style.icon__inner)}></span>
    </div>
  );
};

const WinnersPLayer: FC<IWinnersMedia> = ({ ...props }) => {
  const player_style = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div className={clsx(style.player)}>
      <ReactPlayer
        controls={true}
        light={<Light project_image_url={props.project_image_url} />}
        url={props.video ?? ""}
        style={player_style}
        width={"100%"}
        height={"100%"}
        playIcon={<Icon />}
        volume={0.5}
      />
    </div>
  );
};
export default WinnersPLayer;
