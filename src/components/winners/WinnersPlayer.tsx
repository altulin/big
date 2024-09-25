import clsx from "clsx";
import { FC } from "react";
import style from "./Winners.module.scss";
import ReactPlayer from "react-player";

const Light: FC = () => {
  return <div className={clsx(style.light)}></div>;
};

const Icon = () => {
  return (
    <div className={clsx(style.icon)}>
      <span className={clsx(style.icon__inner)}></span>
    </div>
  );
};

const WinnersPLayer: FC<{ video: string }> = ({ video }) => {
  const player_style = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div className={clsx(style.player)}>
      <div className={clsx(style.player__inner)}>
        <ReactPlayer
          controls={true}
          light={<Light />}
          url={video}
          style={player_style}
          width={"100%"}
          height={"100%"}
          playIcon={<Icon />}
          volume={0.5}
        />
      </div>
    </div>
  );
};
export default WinnersPLayer;
