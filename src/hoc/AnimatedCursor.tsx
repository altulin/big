import { FC } from "react";
import AnimatedCursor from "react-animated-cursor";

const Cursor: FC = () => {
  return (
    <AnimatedCursor
      clickables={["a"]}
      color="20, 20, 20"
      outerSize={35}
      outerAlpha={0}
      outerScale={1.7}
      outerStyle={{
        border: "1px solid var(--basic-dark)",
      }}
    />
  );
};
export default Cursor;
